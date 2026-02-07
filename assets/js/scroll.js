document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".hero-carousel__track");
  const slides = Array.from(document.querySelectorAll(".hero-card"));
  const prevBtn = document.querySelector(".carousel-nav--prev");
  const nextBtn = document.querySelector(".carousel-nav--next");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let isAnimating = false;
  let autoPlayInterval;
  const intervalMs = 2500; // 2.5 seconds;

  function getSlidesPerView() {
    const width = window.innerWidth;
    if (width <= 767) return 1;
    if (width <= 1023) return 2;
    return 3;
  }

  function updateActiveCards() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  function goToSlide(index, animate = true) {
    if (isAnimating) return;

    const slidesPerView = getSlidesPerView();
    const maxIndex = Math.max(0, slides.length - slidesPerView);

    // Clamp index
    if (index < 0) {
      index = maxIndex;
    } else if (index > maxIndex) {
      index = 0;
    }

    currentIndex = index;

    // Calculate exact pixel offset
    const cardWidth = track.children[0].offsetWidth;
    const trackStyle = window.getComputedStyle(track);
    const gap = parseInt(trackStyle.gap) || 20;
    const offset = -currentIndex * (cardWidth + gap);

    if (animate) {
      isAnimating = true;
      track.style.transform = `translateX(${offset}px)`;

      setTimeout(() => {
        isAnimating = false;
      }, 700);
    } else {
      track.style.transform = `translateX(${offset}px)`;
    }

    updateActiveCards();
  }

  function nextSlide() {
    const slidesPerView = getSlidesPerView();
    const maxIndex = Math.max(0, slides.length - slidesPerView);

    if (currentIndex >= maxIndex) {
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    const slidesPerView = getSlidesPerView();
    const maxIndex = Math.max(0, slides.length - slidesPerView);

    if (currentIndex <= 0) {
      goToSlide(maxIndex);
    } else {
      goToSlide(currentIndex - 1);
    }
  }

  // Initialize
  function init() {
    updateActiveCards();
    goToSlide(0, false);

    // Start autoplay
    autoPlayInterval = setInterval(nextSlide, intervalMs);
  }

  // Event Listeners
  prevBtn.addEventListener("click", () => {
    clearInterval(autoPlayInterval);
    prevSlide();
    autoPlayInterval = setInterval(nextSlide, intervalMs);
  });

  nextBtn.addEventListener("click", () => {
    clearInterval(autoPlayInterval);
    nextSlide();
    autoPlayInterval = setInterval(nextSlide, intervalMs);
  });

  // Pause autoplay on hover
  track.addEventListener("mouseenter", () => {
    clearInterval(autoPlayInterval);
  });

  track.addEventListener("mouseleave", () => {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, intervalMs);
  });

  // Handle resize
  window.addEventListener("resize", () => {
    clearInterval(autoPlayInterval);
    goToSlide(Math.min(currentIndex, Math.max(0, slides.length - getSlidesPerView())), false);
    autoPlayInterval = setInterval(nextSlide, intervalMs);
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoPlayInterval);
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const threshold = 50;

    if (touchStartX - touchEndX > threshold) {
      // Swipe left = next
      nextSlide();
    } else if (touchEndX - touchStartX > threshold) {
      // Swipe right = previous
      prevSlide();
    }

    autoPlayInterval = setInterval(nextSlide, intervalMs);
  });

  // Initialize everything
  init();
});