GRADE 10 B — OUR LAST SCHOOL DAY

HOW TO OPEN IN VS CODE
1. Extract the ZIP file.
2. Open the folder "grade10b_last_school_day" in VS Code.
3. Install the Live Server extension.
4. Right-click index.html.
5. Choose "Open with Live Server".
6. Click "START THE MOVIE".

FILES
- index.html
- style.css
- script.js
- assets/photos/
- assets/audio/background_music.mp3

EDIT TEXT
Open index.html and search for:
- OUR LAST SCHOOL DAY
- Grade 10 B
- End of the 2026 School Year
- ACHIRATH

CHANGE THE FINAL CLASS PHOTO
Open script.js and find:
finalPhoto.src = photos[0];

Change photos[0] to another number, for example:
finalPhoto.src = photos[5];

Note: JavaScript numbers start at 0.

MUSIC SYNC EFFECT
- The slideshow analyzes the bass from background_music.mp3.
- Strong beats create a flash and camera punch.
- Stronger beats change to the next photo.
- Quiet sections automatically change photos every few seconds.
- To make photos change faster or slower, open script.js and edit:
  1150 = minimum time between beat-synced photo changes
  4300 = automatic change during quiet music


VERSION 3 UPDATE
- Added photo_30.png and photo_31.png.
- photo_30.png is used as the final class photo.
- Ending caption and final memory lines are now in English.
- Music-synchronized white flash transition remains enabled.


VERSION 4 UPDATE
- Added smooth motion blur transition effect.
- Added camera shake on strong music beats.
- Added lightweight bass punch animation.
- Reduced effect intensity and frequency on mobile devices.
- Pauses beat effects when the browser tab is hidden.
- Added reduced-motion support.
- Press the B key while the website is open to test the beat effect.


VERSION 5 UPDATE
- Removed Motion Blur.
- Removed Camera Shake.
- Added automatic slideshow.
- Added 44 named cinematic transitions.
- Added automatic photo animations.
- Added touch-to-zoom on mobile.
- Added pinch zoom, double-tap zoom, and drag.
- Added mouse wheel zoom and drag on PC.
- Added the two latest photos to the "With Our Teacher" section.
- Added a floating animation to the featured teacher group photo on mobile.


VERSION 6 UPDATE
- Added photo_34.png, photo_35.png, and photo_36.png.
- Placed all three photos at the beginning of Chapter 1.
- Added Fade + Zoom to the first photo.
- Added Slide Left + Floating to the second photo.
- Added Floating + Slow Zoom to the third photo.
- Included all three photos in the automatic slideshow and touch-to-zoom viewer.
