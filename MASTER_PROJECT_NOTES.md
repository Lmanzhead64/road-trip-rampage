# Road Trip Rampage Master Project Notes

Date: 2026-06-05

## Working Thesis

Road Trip Rampage is evolving from a small canvas shooter into a mobile-first armored-defense RPG. The product direction combines three loops:

1. A short action loop: move, auto-aim, survive waves, use bombs and missiles.
2. A meta-progression loop: spend credits on weapons, chassis ranks, armor, and missile systems.
3. A base-defense loop: protect and upgrade a village that persists across levels.

This structure mirrors common patterns in successful mobile games while staying achievable for a solo class project.

## Research-Informed Design Choices

- Sensor Tower reported that January 2026 top-grossing mobile games included Honor of Kings, Last War: Survival Game, MONOPOLY GO!, Royal Match, and Whiteout Survival. The useful pattern is not one genre, but repeatable live-ops, seasonal progression, base-building, cosmetics, and clear long-term goals.
- Sensor Tower's live-ops research highlights recurring events, daily missions, win streaks, and milestone progression systems. Road Trip Rampage now translates that into operation contracts and five-level milestone caches.
- War Robots emphasizes collectible combat units, customization, modules, weapons, and progression. Road Trip Rampage now uses chassis unlocks and ranks as a simpler version of that pattern.
- World of Tanks Blitz emphasizes short vehicle battles, historical vehicle fantasy, upgrades, clans, events, and fast tactical sessions. Road Trip Rampage now borrows the fast vehicle-combat rhythm, heavier vehicle feedback, and clearer explosive weapons while staying top-down.
- Clash of Clans uses village building, defense, resource collection, and upgrades. Road Trip Rampage now has village walls, turrets, supply depots, workshop upgrades, and base health during combat.
- Last War: Survival combines a reflex/action layer with shelter/base development and team/unit progression. Road Trip Rampage now combines wave combat with garage and village development.
- Whiteout Survival demonstrates server-progress, city growth, gear progression, and phase-based reward improvement. Road Trip Rampage now has campaign phases and upgrades that unlock at level milestones.

## Historical Reference Boundary

The real 2004 Granby armored bulldozer incident involved a heavily modified bulldozer with steel and concrete armor. The game borrows only the visual engineering language: steel plates, concrete armor blocks, cameras, treads, blade, and enclosed cabin. In-game naming stays fictional: Armored Dozer, Concrete Dozer, Siege Tank, Bastion Crawler, and Aegis Fortress.

## Current Implemented Systems

- Five campaign phases from levels 1 to 100.
- Five chassis classes with unlock levels, credit costs, ranks, and stat bonuses.
- Effective stats calculated from base player upgrades plus active chassis rank.
- Village base with health, walls, turret support, supply rewards, workshop upgrades, and aid station healing.
- Three garage tabs: Combat, Chassis, Village.
- Operation contracts that reward clear per-level goals: defend the village, reach a kill streak, and destroy heavy armor.
- Milestone caches every five levels to create a predictable long-term reward cadence without random loot pressure.
- Missile special weapon via keyboard and touchscreen.
- Launched demolition charge system replacing the old self-centered bomb shockwave.
- Generated Web Audio feedback for gunfire, hits, missiles, charges, explosions, damage, kills, and upgrades.
- Asset-based realism path: transparent photoreal armored dozer and enemy vehicle sprites now replace the fake-looking canvas vehicle drawings.
- Realistic top-down military road background plate now replaces the procedural road as the primary environment.
- Local progress persistence including weapons, chassis, vehicle ranks, village upgrades, score, credits, and player stats.
- High scores store player name, score, level, phase, and vehicle context locally.

## AI Class Explanation Angle

The current prototype can be presented as a foundation for AI-assisted game balancing:

- Adaptive difficulty could adjust enemy composition based on player death rate, base damage, and upgrade choices.
- A recommendation system could suggest the best next garage upgrade from player behavior.
- A dynamic mission director could vary wave composition by phase, player power, and village health.
- Cloud leaderboard data could be used to compare builds and identify overpowered or underused upgrades.
- Analytics could measure retention loops ethically: level completion, upgrade choices, session length, and failure points.
- Computer vision or lightweight behavior modeling could classify common failure moments, such as village collapse, underpowered weapons, or poor chassis choice, then recommend upgrades without forcing pay-to-win monetization.

## App Store Readiness Gaps

- Replace localStorage-only saves with account-backed cloud saves.
- Add an online leaderboard and anti-cheat validation.
- Add real mobile packaging through Capacitor, React Native, Unity, or another app shell.
- Add privacy policy, app metadata, age rating review, and App Store screenshots.
- Improve art assets beyond procedural canvas shapes if the goal is commercial release.
- Replace prototype generated art with licensed or original production art before commercial App Store release.
- Use a real 3D engine, such as Unity, Godot, Three.js, or Babylon.js, only if the production goal later becomes a true FPS city-driving game.
- Add sound, settings, pause, accessibility options, tutorial onboarding, and content balancing.

## Sources

- Sensor Tower: Top 10 Worldwide Mobile Games By Revenue and Downloads in January 2026.
- Apple App Store: War Robots Multiplayer Battles.
- Apple App Store: World of Tanks Blitz.
- Apple App Store: Clash of Clans.
- Apple App Store: Last War: Survival.
- Apple App Store: Whiteout Survival.
- Firehouse / The Denver Channel archive: 2004 Granby armored bulldozer incident details.
