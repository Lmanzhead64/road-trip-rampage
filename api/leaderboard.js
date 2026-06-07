const LEADERBOARD_KEY = process.env.LEADERBOARD_REDIS_KEY || "road-trip-rampage:leaderboard";
const STATS_KEY = process.env.LEADERBOARD_STATS_KEY || "road-trip-rampage:stats";
const RATE_LIMIT_PREFIX = process.env.LEADERBOARD_RATE_LIMIT_PREFIX || "road-trip-rampage:rate";
const MAX_ROWS = 500;

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (!redisUrl() || !redisToken()) {
    res.status(503).json({
      ok: false,
      error: "Leaderboard storage is not configured.",
      setup: "Set KV_REST_API_URL and KV_REST_API_TOKEN, or the Upstash Redis REST variables from Vercel Marketplace."
    });
    return;
  }

  try {
    if (req.method === "GET") {
      const limit = clampInt(req.query?.limit, 1, 50, 25);
      res.status(200).json({ ok: true, entries: await readTopScores(limit) });
      return;
    }

    if (req.method === "POST") {
      await rateLimit(req);
      const entry = normalizeEntry(parseBody(req.body));
      const member = JSON.stringify(entry);
      await redis(["ZADD", LEADERBOARD_KEY, entry.score, member]);
      await redis(["LPUSH", STATS_KEY, member]);
      await redis(["LTRIM", STATS_KEY, 0, 999]);
      const count = Number(await redis(["ZCARD", LEADERBOARD_KEY]) || 0);
      if (count > MAX_ROWS) {
        await redis(["ZREMRANGEBYRANK", LEADERBOARD_KEY, 0, count - MAX_ROWS - 1]);
      }
      res.status(201).json({ ok: true, entry, entries: await readTopScores(25) });
      return;
    }

    res.setHeader("Allow", "GET,POST,OPTIONS");
    res.status(405).json({ ok: false, error: "Method not allowed." });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ ok: false, error: error.message || "Leaderboard error." });
  }
};

function redisUrl() {
  return envFirst(
    "KV_REST_API_URL",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_KV_REST_API_URL",
    "UPSTASH_REDIS_REST_REDIS_REST_URL"
  );
}

function redisToken() {
  return envFirst(
    "KV_REST_API_TOKEN",
    "UPSTASH_REDIS_REST_TOKEN",
    "UPSTASH_REDIS_REST_KV_REST_API_TOKEN",
    "UPSTASH_REDIS_REST_REDIS_REST_TOKEN"
  );
}

function envFirst(...keys) {
  for (const key of keys) {
    if (process.env[key]) return process.env[key];
  }
  return "";
}

async function redis(command) {
  const response = await fetch(redisUrl(), {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${redisToken()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) {
    const error = new Error(data.error || `Redis command failed with ${response.status}`);
    error.statusCode = response.ok ? 500 : response.status;
    throw error;
  }
  return data.result;
}

async function readTopScores(limit) {
  const raw = await redis(["ZREVRANGE", LEADERBOARD_KEY, 0, limit - 1, "WITHSCORES"]);
  const rows = [];
  for (let index = 0; index < raw.length; index += 2) {
    const member = raw[index];
    const score = Number(raw[index + 1] || 0);
    try {
      rows.push({ ...JSON.parse(member), score });
    } catch {
      rows.push({ name: "Commander", score, level: 1, mode: "regular", tankTier: 1 });
    }
  }
  return rows;
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      const error = new Error("Invalid JSON body.");
      error.statusCode = 400;
      throw error;
    }
  }
  return body;
}

async function rateLimit(req) {
  const ip = getClientIp(req);
  const bucket = Math.floor(Date.now() / 60000);
  const key = `${RATE_LIMIT_PREFIX}:${ip}:${bucket}`;
  const count = Number(await redis(["INCR", key]) || 0);
  if (count === 1) await redis(["EXPIRE", key, 70]);
  if (count > 20) {
    const error = new Error("Too many leaderboard submissions. Try again in a minute.");
    error.statusCode = 429;
    throw error;
  }
}

function normalizeEntry(body) {
  const score = clampInt(body.score, 0, 50000000, 0);
  if (score <= 0) {
    const error = new Error("Score must be greater than zero.");
    error.statusCode = 400;
    throw error;
  }
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: sanitizeName(body.name),
    score,
    level: clampInt(body.level, 1, 300, 1),
    mode: body.mode === "hardcore" ? "hardcore" : "regular",
    result: sanitizeText(body.result || "run", 32),
    winStreak: clampInt(body.winStreak, 0, 100, 0),
    tankTier: clampInt(body.tankTier, 1, 10, 1),
    combatRating: clampInt(body.combatRating, 0, 10000, 0),
    skin: sanitizeText(body.skin || "Raw Steel", 36),
    gameVersion: sanitizeText(body.gameVersion || "unknown", 40),
    createdAt: new Date().toISOString()
  };
}

function clampInt(value, min, max, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function sanitizeName(value) {
  const name = sanitizeText(value || "Commander", 20);
  return name || "Commander";
}

function sanitizeText(value, limit) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[<>`{}[\]\\]/g, "")
    .slice(0, limit);
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function setCors(req, res) {
  const origin = req.headers.origin || "";
  const allowed = isAllowedOrigin(origin) ? origin : "https://lmanzhead64.github.io";
  res.setHeader("Access-Control-Allow-Origin", allowed || "*");
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept");
  res.setHeader("Cache-Control", "no-store");
}

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (origin === "https://lmanzhead64.github.io") return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return true;
  const extra = String(process.env.LEADERBOARD_ALLOWED_ORIGINS || "")
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
  return extra.includes(origin);
}
