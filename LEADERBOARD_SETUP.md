# Road Trip Rampage Public Leaderboard Setup

The game now has the frontend leaderboard UI and the backend API file. GitHub Pages can still host the game, but a shared leaderboard needs a writable backend.

## Recommended Production Setup

1. Import this repository into Vercel as a project.
2. In Vercel, add a Redis database from Marketplace, preferably Upstash Redis.
3. Connect the Redis database to the Road Trip Rampage project.
4. Confirm these environment variables exist in the Vercel project:
   - `KV_REST_API_URL` and `KV_REST_API_TOKEN`
   - or `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
5. Deploy.
6. Test:
   - `https://YOUR-PROJECT.vercel.app/api/leaderboard`
   - The response should be JSON with `ok: true` and `entries`.

## If The Game Stays On GitHub Pages

Deploy the API on Vercel, then point GitHub Pages to that API from the browser console once for testing:

```js
localStorage.setItem("roadTripRampage3DLeaderboardApiV1", "https://YOUR-PROJECT.vercel.app/api/leaderboard")
```

For production, hard-code the final Vercel API URL into `getLeaderboardEndpoint()` in `index.html`.

## Data Saved

The leaderboard saves only optional display name and gameplay stats. It does not require account signup, email, location, contacts, camera, microphone, or advertising IDs.
