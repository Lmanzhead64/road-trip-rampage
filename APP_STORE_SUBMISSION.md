# Road Trip Rampage App Store Submission Plan

Date: 2026-06-05

## Reality Check

The game can be prepared for App Store submission today, but App Store release cannot be guaranteed today. Apple requires a signed native app build uploaded to App Store Connect and submitted to App Review. Apple controls review timing.

Official Apple references:

- Upload builds: https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/
- Submit apps: https://developer.apple.com/app-store/submitting/
- Submit for review: https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-for-review
- Review guidelines: https://developer.apple.com/appstore/resources/approval/guidelines.html

## Fastest Path Today

1. Push the latest Git commit to GitHub.
2. Confirm Vercel deploys the web build.
3. Create a native iOS wrapper with Xcode or Capacitor that bundles the local game files.
4. Sign with the Apple Developer account.
5. Archive in Xcode.
6. Upload the archive to App Store Connect.
7. Add required listing metadata, screenshots, support URL, privacy URL, age rating, and app category.
8. Submit for App Review.

## Suggested App Store Metadata

- App name: Road Trip Rampage
- Subtitle: Armored defense RPG
- Category: Games
- Subcategory: Action or Role Playing
- Age rating: likely 12+ depending on final violence presentation
- Support URL: `https://<your-domain>/support.html`
- Privacy URL: `https://<your-domain>/privacy.html`

## Current Privacy Answers

- Collects personal data: No
- Uses third-party advertising: No
- Uses tracking: No
- Uses location: No
- Uses contacts/camera/microphone: No
- Saves local gameplay progress: Yes, on device only

## App Review Risk Items To Fix Before Submission

- Confirm all art assets are owned/licensed for commercial use.
- Avoid real-world attack glorification. Keep the game fictional and framed around armored vehicle defense.
- Add pause/settings controls before public release.
- Add sound mute control, which currently exists as `N`.
- Add a clear support contact.
- Test on real iPhone hardware.
