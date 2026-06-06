# Road Trip Rampage Market Launch Plan

Date: 2026-06-06

## Product Position

Road Trip Rampage is currently a browser-playable 3D armored vehicle RPG with local save, upgrades, levels 1-100, regular/hardcore modes, garage progression, home-base defense, and mobile controls. The next marketable version should focus on three promises:

1. Short-session combat: 2-5 minute levels, visible rewards, quick restart.
2. Long-term progression: tank tiers, garage builds, cosmetics, home-base defense, city chapters, and harder bosses every 10 levels.
3. Social proof: public leaderboard, shareable scores, and optional player names.

## Public Leaderboard Architecture

The game can stay static on GitHub Pages, but global scores require a backend. GitHub Pages cannot safely store shared scores by itself.

Recommended path:

1. Deploy the same project to Vercel.
2. Add a Vercel/Upstash Redis database through Vercel Marketplace.
3. Set these environment variables on the Vercel project:
   - `KV_REST_API_URL` and `KV_REST_API_TOKEN`
   - or `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
4. Use `api/leaderboard.js` for:
   - `GET /api/leaderboard` to show public scores.
   - `POST /api/leaderboard` to submit optional player name and run stats.
5. Keep account creation out of v1. A nickname plus score is enough and avoids account-deletion complexity.

Stats saved per entry:

- Display name
- Score/credits
- Level reached
- Regular or hardcore mode
- Win streak
- Tank tier
- Combat rating
- Equipped skin name
- Game version
- Submission timestamp

Anti-cheat note: this first backend validates bounds and rate-limits spam, but browser games can still be tampered with. For a serious App Store launch, move scoring to signed run summaries or server-authoritative run validation.

## Privacy And Compliance

Once online leaderboard is enabled, the privacy policy must disclose that optional display names and gameplay stats are transmitted to the leaderboard service and may be publicly visible.

Avoid collecting:

- Email
- Exact location
- Contacts
- Advertising IDs
- Device identifiers
- Account passwords

This keeps the privacy story simple for App Store Connect and Google Play.

Official references reviewed:

- Apple Developer Program enrollment: https://developer.apple.com/programs/enroll/
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple App Privacy Details: https://developer.apple.com/app-store/app-privacy-details/
- Apple In-App Purchase overview: https://developer.apple.com/in-app-purchase/
- Google Play Data Safety: https://support.google.com/googleplay/android-developer/answer/10787469
- Google Play User Data policy help: https://support.google.com/googleplay/android-developer/answer/10144311
- Vercel Redis storage docs: https://vercel.com/docs/redis

## App Store Path

Fastest realistic iPhone path:

1. Stabilize the web game and leaderboard.
2. Wrap it with Capacitor as a native iOS app.
3. Test on a real iPhone in portrait and landscape.
4. Add native app icon, splash screen, mute/settings, support URL, privacy URL, screenshots, and age rating.
5. Enroll in Apple Developer Program if not already enrolled.
6. Upload through Xcode/App Store Connect.
7. Use TestFlight first, then submit for App Review.

Apple review is not guaranteed same-day. The goal for today should be a TestFlight-ready or review-ready build, not a guaranteed public App Store release.

## Monetization Roadmap

Do not add real payments until the core game loop retains players. First build the economy as if it were paid, but keep it free:

1. Soft currency: credits earned per level, streak, contracts, and bosses.
2. Hard currency placeholder: premium tokens shown in UI but not purchasable yet.
3. Cosmetic shop: special skins, camo packs, tank decals, tracer colors, garage themes.
4. Convenience offers: repair boosts, bonus contracts, resupply bundles.
5. Season/event structure: weekly city campaign, recurring leaderboard reset, boss events.

When payments are ready, use StoreKit/In-App Purchase on iOS. Apple supports consumables, non-consumables, subscriptions, and non-renewing subscriptions through App Store Connect and StoreKit.

## Retention Features To Build Next

Highest value next features:

1. Daily mission board with three rotating objectives.
2. Recurring weekly leaderboard so new players can compete.
3. Post-level reward reveal with crate animation and upgrade suggestions.
4. Boss collection screen showing defeated commanders and abilities.
5. Garage build presets: heavy armor, missile striker, speed scout, base defender.
6. First-time player tutorial for controls, radar, auto aim, and supplies.
7. Analytics events for start, level clear, death, upgrade purchase, garage open, save exit, leaderboard submit.

## War Thunder Mobile-Inspired Direction

Research takeaway: War Thunder Mobile markets itself around realistic vehicles, fast mobile-friendly controls, famous military machines, strong vehicle progression, impressive explosions, and physical damage feedback. Road Trip Rampage should not copy its assets, UI, names, or vehicle data, but it can learn from the design principles.

Applied design principles:

1. Vehicle systems matter: tracks, engine, turret, optics, and armor can be damaged separately.
2. Hits need clear feedback: impact labels such as TRACK HIT, TURRET RING, ENGINE DECK, FRONT PLATE, and AMMO BAY tell the player what happened.
3. Repairs should feel tactical: field supplies and home base support repair both hull and modules.
4. Progression should unlock better survivability: armor, repair bay, support network, optics, and fire-control upgrades now have more meaning.
5. The mobile UI must stay readable: module damage is shown as a compact systems panel, not a giant simulation screen.

## Launch Checklist

- Public web URL works on iPhone landscape and desktop.
- Online leaderboard is connected and tested.
- Privacy policy updated for leaderboard stats.
- Support page has a real contact method.
- No copyrighted or unlicensed art, audio, brand names, or real military marks.
- All references to real-world events are fictionalized and not glorifying harm.
- TestFlight build passes real-device testing.
- App Store screenshots and preview video are captured from the actual game.
- Monetization is delayed until retention and review risk are under control.
