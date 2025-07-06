const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-arrow.left');
const nextButton = document.querySelector('.carousel-arrow.right');

let currentIndex = 0;
let slideWidth = 0;

// จำนวน slide จริง (ไม่นับ clone)
const realSlidesCount = slides.length - 1;

function updateSlideWidth() {
  slideWidth = slides[0].getBoundingClientRect().width;
  setPositionByIndex(currentIndex);
}

function setPositionByIndex(index) {
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

window.addEventListener('resize', updateSlideWidth);
window.addEventListener('load', updateSlideWidth);

// สไลด์ขวา
nextButton.addEventListener('click', () => {
  let nextIndex = currentIndex + 1;

  if (currentIndex === realSlidesCount) {
    // ถ้าอยู่ที่ clone -> teleport ไป slide 0 แบบไม่มี animation
    track.style.transition = 'none';
    currentIndex = 0;
    setPositionByIndex(0);

    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  } else if (nextIndex > realSlidesCount) {
    // ถ้าเกิน slide จริง -> ไป clone
    moveToSlide(realSlidesCount);
  } else {
    moveToSlide(nextIndex);
  }
});

// สไลด์ซ้าย
prevButton.addEventListener('click', () => {
  let prevIndex = currentIndex - 1;

  if (currentIndex === 0) {
    // ถ้าอยู่ที่ slide แรก -> teleport ไป clone (realSlidesCount)
    track.style.transition = 'none';
    currentIndex = realSlidesCount;
    setPositionByIndex(realSlidesCount);

    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  } else if (prevIndex < 0) {
    moveToSlide(realSlidesCount);
  } else {
    moveToSlide(prevIndex);
  }
});

// ฟังก์ชันเคลื่อนย้าย
function moveToSlide(index) {
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  currentIndex = index;
}

    function playSound() {
      const audio = document.getElementById("myAudio");
      audio.play();
<<<<<<< HEAD
    }

// เพิ่มตัวแปรเก็บตำแหน่ง touch
let touchStartX = 0;
let touchEndX = 0;

// ระยะทางขั้นต่ำในการปัด (pixel)
const swipeThreshold = 50;

// ฟังก์ชันตรวจจับ touchstart
track.addEventListener('touchstart', function (event) {
  touchStartX = event.touches[0].clientX;
}, { passive: true });

// ฟังก์ชันตรวจจับ touchmove
track.addEventListener('touchmove', function (event) {
  touchEndX = event.touches[0].clientX;
}, { passive: true });

// ฟังก์ชันตรวจจับ touchend
track.addEventListener('touchend', function () {
  const deltaX = touchEndX - touchStartX;

  if (Math.abs(deltaX) > swipeThreshold) {
    if (deltaX > 0) {
      // ปัดขวา -> ย้อน slide
      prevButton.click();
    } else {
      // ปัดซ้าย -> เปลี่ยน slide
      nextButton.click();
    }
  }
});
=======
    }
>>>>>>> ff02a77f57b643a436732e91c264bc987ace250c
