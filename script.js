
const photos = ["assets/photos/photo_01.png", "assets/photos/photo_02.png", "assets/photos/photo_03.png", "assets/photos/photo_04.png", "assets/photos/photo_05.png", "assets/photos/photo_06.png", "assets/photos/photo_07.png", "assets/photos/photo_08.png", "assets/photos/photo_09.png", "assets/photos/photo_10.png", "assets/photos/photo_11.png", "assets/photos/photo_12.png", "assets/photos/photo_13.png", "assets/photos/photo_14.png", "assets/photos/photo_15.png", "assets/photos/photo_16.png", "assets/photos/photo_17.png", "assets/photos/photo_18.png", "assets/photos/photo_19.png", "assets/photos/photo_20.png", "assets/photos/photo_21.png", "assets/photos/photo_22.png", "assets/photos/photo_23.png", "assets/photos/photo_24.png", "assets/photos/photo_25.png", "assets/photos/photo_26.png", "assets/photos/photo_27.png", "assets/photos/photo_28.png", "assets/photos/photo_29.png", "assets/photos/photo_30.png", "assets/photos/photo_31.png", "assets/photos/photo_32.png", "assets/photos/photo_33.png", "assets/photos/photo_34.png", "assets/photos/photo_35.png", "assets/photos/photo_36.png"];

const startScreen = document.getElementById("startScreen");
const intro = document.getElementById("intro");
const movie = document.getElementById("movie");
const startBtn = document.getElementById("startBtn");
const skipBtn = document.getElementById("skipBtn");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const volumeSlider = document.getElementById("volumeSlider");
const topBtn = document.getElementById("topBtn");

let introTimers = [];
let audioContext;

function createBassHit() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  audioContext ||= new AudioCtx();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(32, audioContext.currentTime + 1.15);

  filter.type = "lowpass";
  filter.frequency.value = 170;

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.85, audioContext.currentTime + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.25);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1.3);
}

function later(callback, delay) {
  const id = setTimeout(callback, delay);
  introTimers.push(id);
}

function clearIntroTimers() {
  introTimers.forEach(clearTimeout);
  introTimers = [];
}

function showMovie() {
  clearIntroTimers();
  intro.classList.add("hidden");
  movie.classList.remove("hidden");
  document.body.classList.remove("no-scroll");
  window.scrollTo({ top: 0, behavior: "instant" });
  observeReveals();
}

function runIntro() {
  document.body.classList.add("no-scroll");
  startScreen.classList.add("hidden");
  intro.classList.remove("hidden");

  const studio = document.getElementById("studioText");
  const presents = document.getElementById("presentsText");
  const title = document.getElementById("mainTitle");

  later(() => {
    studio.classList.add("show-intro");
    createBassHit();
  }, 500);

  later(() => {
    studio.classList.remove("show-intro");
    presents.classList.add("show-intro");
  }, 2600);

  later(() => {
    presents.classList.remove("show-intro");
    title.classList.add("show-title");
    createBassHit();
  }, 4700);

  later(showMovie, 8000);
}

function fillGalleries() {
  const teacher = document.getElementById("teacherGallery");
  const funny = document.getElementById("funnyGallery");
  const friends = document.getElementById("friendsGallery");

  const teacherPhotos = [
    "assets/photos/photo_34.png",
    "assets/photos/photo_35.png",
    "assets/photos/photo_36.png",
    "assets/photos/photo_33.png",
    "assets/photos/photo_32.png",
    ...photos.slice(0, 4)
  ];

  teacherPhotos.forEach((src, index) => {
    const card = document.createElement("article");
    const chapterEffects = ["chapter-fade-zoom", "chapter-slide-left", "chapter-floating"];
    const effectClass = chapterEffects[index] || "";
    card.className = `cinema-card reveal ${index === 0 ? "teacher-feature" : ""} ${effectClass}`;
    card.innerHTML = `<img loading="lazy" src="${src}" alt="Grade 10 B classroom memory" />`;
    teacher.appendChild(card);
  });

  photos.slice(9, 19).forEach((src, index) => {
    const card = document.createElement("article");
    const tilt = (index % 2 === 0 ? -1 : 1) * (2 + (index % 4));
    card.className = "polaroid reveal";
    card.style.setProperty("--tilt", `${tilt}deg`);
    card.innerHTML = `<img loading="lazy" src="${src}" alt="Funny classroom memory" />`;
    funny.appendChild(card);
  });

  photos.slice(19).forEach((src) => {
    const card = document.createElement("article");
    card.className = "friend-card reveal";
    card.innerHTML = `<img loading="lazy" src="${src}" alt="Selfie with friends" />`;
    friends.appendChild(card);
  });

  const finalPhoto = document.getElementById("finalClassPhoto");
  finalPhoto.src = photos[29]; // photo_30.png — final class selfie

  document.querySelectorAll(".cinema-gallery img, .polaroid-wall img, .friends-strip img, .final-photo-section img")
    .forEach((image) => image.classList.add("zoomable-photo"));
}

function observeReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function setupParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    particles = Array.from({ length: Math.min(90, Math.floor(innerWidth / 14)) }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.8 + .4,
      vy: Math.random() * .35 + .08,
      alpha: Math.random() * .6 + .15
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach(p => {
      p.y -= p.vy;
      if (p.y < -10) {
        p.y = innerHeight + 10;
        p.x = Math.random() * innerWidth;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(245,214,123,${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  addEventListener("resize", resize);
  resize();
  draw();
}

startBtn.addEventListener("click", async () => {
  music.volume = Number(volumeSlider.value);
  try {
    await music.play();
    musicBtn.textContent = "⏸";
  } catch (error) {
    musicBtn.textContent = "▶";
  }
  runIntro();
});

skipBtn.addEventListener("click", showMovie);

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    await music.play();
    musicBtn.textContent = "⏸";
  } else {
    music.pause();
    musicBtn.textContent = "▶";
  }
});

volumeSlider.addEventListener("input", () => {
  music.volume = Number(volumeSlider.value);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

fillGalleries();
setupParticles();

// ---------------- MUSIC SYNC SLIDESHOW ----------------
const slideA = document.getElementById("slideA");
const slideB = document.getElementById("slideB");
const beatFlash = document.getElementById("beatFlash");
const meterBars = [...document.querySelectorAll(".beat-meter i")];

let activeSlide = slideA;
let hiddenSlide = slideB;
let syncPhotoIndex = 0;
let analyser;
let frequencyData;
let mediaSource;
let lastDetectedBeat = 0;
let lastSlideChange = 0;
let averageBass = 0;
let syncStarted = false;

function initializeSyncSlides() {
  if (!photos.length) return;
  slideA.src = photos[0];
  slideB.src = photos[1] || photos[0];
}

function changeSyncSlide(force = false) {
  const now = performance.now();
  if (!force && now - lastSlideChange < 1150) return;
  lastSlideChange = now;

  syncPhotoIndex = (syncPhotoIndex + 1) % photos.length;
  hiddenSlide.src = photos[syncPhotoIndex];

  hiddenSlide.classList.remove("active");
  void hiddenSlide.offsetWidth;
  hiddenSlide.classList.add("active");
  activeSlide.classList.remove("active");

  [activeSlide, hiddenSlide] = [hiddenSlide, activeSlide];
}

function triggerBeatEffect(strength = 1) {
  document.body.classList.remove("beat-hit");
  beatFlash.classList.remove("hit");
  void beatFlash.offsetWidth;
  document.body.classList.add("beat-hit");
  beatFlash.classList.add("hit");

  setTimeout(() => document.body.classList.remove("beat-hit"), 260);

  // Strong beats change the image; lighter beats only animate the screen.
  if (strength > 1.18) changeSyncSlide();
}

function startMusicAnalysis() {
  if (syncStarted) return;
  syncStarted = true;

  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    setInterval(() => changeSyncSlide(), 3400);
    return;
  }

  audioContext ||= new AudioCtx();
  if (audioContext.state === "suspended") audioContext.resume();

  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.72;
  frequencyData = new Uint8Array(analyser.frequencyBinCount);

  try {
    mediaSource ||= audioContext.createMediaElementSource(music);
    mediaSource.connect(analyser);
    analyser.connect(audioContext.destination);
  } catch (error) {
    console.warn("Music analyser could not be started:", error);
    setInterval(() => changeSyncSlide(), 3400);
    return;
  }

  analyzeMusic();
}

function analyzeMusic(time = 0) {
  if (!analyser) return;
  analyser.getByteFrequencyData(frequencyData);

  // Bass energy is concentrated in the first frequency bins.
  let bassTotal = 0;
  const bassBins = 12;
  for (let i = 0; i < bassBins; i++) bassTotal += frequencyData[i];
  const bass = bassTotal / bassBins;

  averageBass = averageBass ? averageBass * 0.94 + bass * 0.06 : bass;
  const beatStrength = averageBass > 0 ? bass / averageBass : 0;

  meterBars.forEach((bar, index) => {
    const bin = Math.min(frequencyData.length - 1, 2 + index * 3);
    const height = 8 + (frequencyData[bin] / 255) * 42;
    bar.style.height = `${height}px`;
  });

  const now = performance.now();
  if (bass > 72 && beatStrength > 1.12 && now - lastDetectedBeat > 430) {
    lastDetectedBeat = now;
    triggerBeatEffect(beatStrength);
  }

  // Ensures photos still progress during quiet sections.
  if (now - lastSlideChange > 4300) changeSyncSlide(true);

  requestAnimationFrame(analyzeMusic);
}

initializeSyncSlides();

// Start the analyser only after the user's click, because browsers block audio before interaction.
startBtn.addEventListener("click", () => {
  setTimeout(startMusicAnalysis, 80);
});




/* =========================================================
   VERSION 5 — AUTOMATIC SLIDESHOW + 44 TRANSITIONS + ZOOM
   ========================================================= */

const transitionPresets = [
  ["t-fade", "Fade"],
  ["t-crossfade", "Cross Fade"],
  ["t-slide-left", "Slide Left"],
  ["t-slide-right", "Slide Right"],
  ["t-slide-up", "Slide Up"],
  ["t-slide-down", "Slide Down"],
  ["t-zoom-in", "Zoom In"],
  ["t-zoom-out", "Zoom Out"],
  ["t-rotate-cw", "Rotate Clockwise"],
  ["t-rotate-ccw", "Rotate Counterclockwise"],
  ["t-flip-x", "3D Flip X"],
  ["t-flip-y", "3D Flip Y"],
  ["t-cube-left", "Cube Left"],
  ["t-cube-right", "Cube Right"],
  ["t-door-left", "Door Left"],
  ["t-door-right", "Door Right"],
  ["t-circle-open", "Circle Open"],
  ["t-circle-close", "Circle Reveal"],
  ["t-diamond", "Diamond Reveal"],
  ["t-hexagon", "Hexagon Reveal"],
  ["t-wipe-left", "Wipe Left"],
  ["t-wipe-right", "Wipe Right"],
  ["t-wipe-up", "Wipe Up"],
  ["t-wipe-down", "Wipe Down"],
  ["t-curtain-x", "Curtain Horizontal"],
  ["t-curtain-y", "Curtain Vertical"],
  ["t-diagonal-a", "Diagonal Left"],
  ["t-diagonal-b", "Diagonal Right"],
  ["t-corner-tl", "Top Left Reveal"],
  ["t-corner-tr", "Top Right Reveal"],
  ["t-corner-bl", "Bottom Left Reveal"],
  ["t-corner-br", "Bottom Right Reveal"],
  ["t-squeeze-x", "Squeeze Horizontal"],
  ["t-squeeze-y", "Squeeze Vertical"],
  ["t-stretch-x", "Stretch Horizontal"],
  ["t-stretch-y", "Stretch Vertical"],
  ["t-perspective-left", "Perspective Left"],
  ["t-perspective-right", "Perspective Right"],
  ["t-swing", "Swing"],
  ["t-bounce", "Bounce"],
  ["t-elastic", "Elastic"],
  ["t-spin", "Spin"],
  ["t-heart", "Heart Reveal"],
  ["t-cinematic", "Cinematic Bars"]
];

const autoStage = document.getElementById("autoStage");
const autoSlideA = document.getElementById("autoSlideA");
const autoSlideB = document.getElementById("autoSlideB");
const autoCounter = document.getElementById("autoCounter");
const transitionName = document.getElementById("transitionName");
const autoPrev = document.getElementById("autoPrev");
const autoNext = document.getElementById("autoNext");
const autoDots = document.getElementById("autoDots");

let autoActive = autoSlideA;
let autoHidden = autoSlideB;
let autoIndex = 0;
let transitionIndex = 0;
let autoTimer = null;
let isAutoTransitioning = false;

const allTransitionClasses = transitionPresets.map(item => item[0]);
const allPhotoAnimationClasses = Array.from({ length: 8 }, (_, i) => `photo-anim-${i + 1}`);

function updateAutoDots() {
  if (!autoDots) return;
  [...autoDots.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === autoIndex);
  });
}

function setAutoCaption(name) {
  autoCounter.textContent = `${autoIndex + 1} / ${photos.length}`;
  transitionName.textContent = name;
  updateAutoDots();
}

function clearAutoClasses(image) {
  image.classList.remove(...allTransitionClasses, ...allPhotoAnimationClasses);
}

function showAutomaticSlide(nextIndex, direction = 1) {
  if (isAutoTransitioning || !photos.length) return;
  isAutoTransitioning = true;

  autoIndex = (nextIndex + photos.length) % photos.length;
  const [transitionClass, label] = transitionPresets[transitionIndex % transitionPresets.length];
  transitionIndex += direction >= 0 ? 1 : transitionPresets.length - 1;

  clearAutoClasses(autoHidden);
  autoHidden.src = photos[autoIndex];
  autoHidden.classList.add(
    "active",
    transitionClass,
    `photo-anim-${(autoIndex % 8) + 1}`
  );

  autoActive.classList.remove("active");
  setAutoCaption(label);

  const previous = autoActive;
  autoActive = autoHidden;
  autoHidden = previous;

  window.setTimeout(() => {
    clearAutoClasses(autoHidden);
    isAutoTransitioning = false;
  }, 1200);
}

function restartAutomaticTimer() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    if (!document.hidden && !document.body.classList.contains("zoom-open")) {
      showAutomaticSlide(autoIndex + 1, 1);
    }
  }, 5200);
}

function initializeAutomaticSlideshow() {
  if (!autoStage || !photos.length) return;

  autoSlideA.src = photos[0];
  autoSlideA.classList.add("photo-anim-1");
  autoSlideB.src = photos[1] || photos[0];

  autoDots.innerHTML = "";
  photos.forEach(() => {
    const dot = document.createElement("i");
    autoDots.appendChild(dot);
  });

  setAutoCaption("Cinematic Fade");
  restartAutomaticTimer();
}

autoNext?.addEventListener("click", (event) => {
  event.stopPropagation();
  showAutomaticSlide(autoIndex + 1, 1);
  restartAutomaticTimer();
});

autoPrev?.addEventListener("click", (event) => {
  event.stopPropagation();
  showAutomaticSlide(autoIndex - 1, -1);
  restartAutomaticTimer();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) restartAutomaticTimer();
});

/* Touch and mouse zoom */
const photoZoomModal = document.getElementById("photoZoomModal");
const zoomViewport = document.getElementById("zoomViewport");
const zoomImage = document.getElementById("zoomImage");
const zoomClose = document.getElementById("zoomClose");

let zoomScale = 1;
let zoomX = 0;
let zoomY = 0;
let dragStartX = 0;
let dragStartY = 0;
let startZoomX = 0;
let startZoomY = 0;
let dragging = false;
let pinchStartDistance = 0;
let pinchStartScale = 1;
let lastTapTime = 0;

function clampZoomPosition() {
  const maxX = Math.max(0, (zoomImage.clientWidth * zoomScale - innerWidth) / 2 + 80);
  const maxY = Math.max(0, (zoomImage.clientHeight * zoomScale - innerHeight) / 2 + 80);
  zoomX = Math.max(-maxX, Math.min(maxX, zoomX));
  zoomY = Math.max(-maxY, Math.min(maxY, zoomY));
}

function applyZoomTransform() {
  clampZoomPosition();
  zoomImage.style.transform = `translate3d(${zoomX}px, ${zoomY}px, 0) scale(${zoomScale})`;
}

function resetZoom() {
  zoomScale = 1;
  zoomX = 0;
  zoomY = 0;
  applyZoomTransform();
}

function openPhotoZoom(src, alt = "School memory") {
  zoomImage.src = src;
  zoomImage.alt = alt;
  resetZoom();
  photoZoomModal.classList.add("open");
  photoZoomModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("zoom-open");
}

function closePhotoZoom() {
  photoZoomModal.classList.remove("open");
  photoZoomModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("zoom-open");
  resetZoom();
}

document.addEventListener("click", (event) => {
  const image = event.target.closest(".zoomable-photo");
  if (image) openPhotoZoom(image.currentSrc || image.src, image.alt);
});

autoStage?.addEventListener("click", (event) => {
  if (event.target.closest(".slide-nav")) return;
  openPhotoZoom(autoActive.currentSrc || autoActive.src, autoActive.alt);
});

zoomClose?.addEventListener("click", closePhotoZoom);
photoZoomModal?.addEventListener("click", (event) => {
  if (event.target === photoZoomModal) closePhotoZoom();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && photoZoomModal.classList.contains("open")) {
    closePhotoZoom();
  }
});

zoomViewport?.addEventListener("wheel", (event) => {
  event.preventDefault();
  zoomScale = Math.max(1, Math.min(5, zoomScale + (event.deltaY < 0 ? .18 : -.18)));
  if (zoomScale === 1) {
    zoomX = 0;
    zoomY = 0;
  }
  applyZoomTransform();
}, { passive: false });

zoomViewport?.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") return;
  dragging = true;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  startZoomX = zoomX;
  startZoomY = zoomY;
  zoomViewport.classList.add("dragging");
  zoomViewport.setPointerCapture(event.pointerId);
});

zoomViewport?.addEventListener("pointermove", (event) => {
  if (!dragging || event.pointerType === "touch") return;
  zoomX = startZoomX + event.clientX - dragStartX;
  zoomY = startZoomY + event.clientY - dragStartY;
  applyZoomTransform();
});

zoomViewport?.addEventListener("pointerup", (event) => {
  dragging = false;
  zoomViewport.classList.remove("dragging");
  try { zoomViewport.releasePointerCapture(event.pointerId); } catch (_) {}
});

zoomViewport?.addEventListener("touchstart", (event) => {
  if (event.touches.length === 2) {
    pinchStartDistance = Math.hypot(
      event.touches[0].clientX - event.touches[1].clientX,
      event.touches[0].clientY - event.touches[1].clientY
    );
    pinchStartScale = zoomScale;
  } else if (event.touches.length === 1) {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      zoomScale = zoomScale > 1 ? 1 : 2.5;
      if (zoomScale === 1) {
        zoomX = 0;
        zoomY = 0;
      }
      applyZoomTransform();
    }
    lastTapTime = now;
    dragStartX = event.touches[0].clientX;
    dragStartY = event.touches[0].clientY;
    startZoomX = zoomX;
    startZoomY = zoomY;
  }
}, { passive: false });

zoomViewport?.addEventListener("touchmove", (event) => {
  event.preventDefault();

  if (event.touches.length === 2 && pinchStartDistance) {
    const distance = Math.hypot(
      event.touches[0].clientX - event.touches[1].clientX,
      event.touches[0].clientY - event.touches[1].clientY
    );
    zoomScale = Math.max(1, Math.min(5, pinchStartScale * distance / pinchStartDistance));
    if (zoomScale === 1) {
      zoomX = 0;
      zoomY = 0;
    }
  } else if (event.touches.length === 1 && zoomScale > 1) {
    zoomX = startZoomX + event.touches[0].clientX - dragStartX;
    zoomY = startZoomY + event.touches[0].clientY - dragStartY;
  }

  applyZoomTransform();
}, { passive: false });

zoomViewport?.addEventListener("touchend", () => {
  pinchStartDistance = 0;
});

initializeAutomaticSlideshow();
