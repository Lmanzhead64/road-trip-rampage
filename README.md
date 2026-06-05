# Road Trip Rampage

Road Trip Rampage is now a vanilla HTML5 Canvas armored-defense RPG prototype for ENGR5513-21.

The current build is a fictional armored dozer/tank game inspired by the engineering silhouette of an armored bulldozer, not a celebration of the real 2004 Granby attack. The game focuses on defending a village, surviving combat waves, upgrading a vehicle fleet, and progressing through a 100-level campaign.

## How To Play

- Open `index.html` in a browser.
- Move with WASD or arrow keys.
- The main cannon auto-aims and auto-fires.
- Press `Q` to launch a demolition charge toward enemies.
- Press `SPACE` or `M` for missiles after unlocking a missile pod or missile-capable chassis.
- Press `N` to toggle generated sound effects.
- On iPhone/touchscreen, drag the left side to move and tap the on-screen DEMO or MISSILE buttons.

## Current RPG Systems

- 100-level campaign split into five phases.
- Combat garage for weapons, bombs, missiles, armor, repair, range, and fire-rate upgrades.
- Chassis garage with five armored vehicles that unlock at key levels and can be ranked up.
- Village garage with walls, watch turrets, supply depot, machine shop, and aid station upgrades.
- Village defense during combat, including base health and turret support.
- Operation contracts each level for bonus rewards: protect the village, build streaks, and destroy armored enemies.
- Milestone caches every five cleared levels for predictable long-term goals.
- Asset-based realism pass with a photoreal armored dozer sprite, armored enemy vehicle sprite, and realistic military road background plate, plus the darker tactical HUD, smoke, dust, grime, and heavier shadows.
- Launched demolition charges now travel outward and detonate on enemies instead of exploding around the player.
- Generated Web Audio sound effects for gunfire, hits, missiles, demolition charges, explosions, damage, kills, and upgrades.
- Boss fights, kill streaks, supply bonuses, local progress saving, and high-score name entry.
- PWA metadata, app icons, offline cache, support page, and privacy page for deployment/App Store preparation.

## Deployment Files

- `manifest.webmanifest` supports installable web-app metadata.
- `service-worker.js` caches the game shell and production assets.
- `privacy.html` and `support.html` provide URLs needed for an App Store listing.
- `APP_STORE_SUBMISSION.md` tracks the remaining native iOS submission steps.

## Future App Store Track

The next production step is not more canvas code. It is turning this prototype into a mobile app build with account-backed progress, cloud leaderboard storage, privacy-safe analytics, licensed final art/audio, and a monetization model that avoids pay-to-win pressure.
