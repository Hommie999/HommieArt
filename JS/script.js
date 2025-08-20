// navbar
fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;
    });

// เลื่อนสไลด์------------------------------------
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-arrow.left');
const nextButton = document.querySelector('.carousel-arrow.right');

let currentIndex = 0;
let slideWidth = 0;

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

// เคลื่อนไป slide ที่ index
function moveToSlide(index) {
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  currentIndex = index;
}

// 👉 ปุ่มลูกศร
nextButton.addEventListener('click', () => {
  goNext();
});
prevButton.addEventListener('click', () => {
  goPrev();
});

function goNext() {
  let nextIndex = currentIndex + 1;
  if (currentIndex === realSlidesCount) {
    track.style.transition = 'none';
    currentIndex = 0;
    setPositionByIndex(0);
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  } else {
    moveToSlide(nextIndex);
  }
}

function goPrev() {
  let prevIndex = currentIndex - 1;
  if (currentIndex === 0) {
    track.style.transition = 'none';
    currentIndex = realSlidesCount;
    setPositionByIndex(realSlidesCount);
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  } else {
    moveToSlide(prevIndex);
  }
}

// รองรับการลากนิ้ว  ------------------------------------
let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
}, { passive: true });

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const moveX = e.touches[0].clientX;
  const diffX = startX - moveX;

  if (Math.abs(diffX) > 50) { // ลากเกิน 50px ถึงจะเลื่อน
    if (diffX > 0) {
      goNext();
    } else {
      goPrev();
    }
    isDragging = false;
  }
}, { passive: true });

track.addEventListener('touchend', () => {
  isDragging = false;
});

// รองรับปุ่มลูกศรคีย์บอร์ด
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    goNext();
  } else if (e.key === 'ArrowLeft') {
    goPrev();
  }
});

// ซูมรูปภาพ------------------------------------
const overlay = document.getElementById('imageOverlay');
const fullImage = document.getElementById('fullImage');
const caption = document.getElementById('caption');

const zoomInSound = document.getElementById('zoomInSound');

document.querySelectorAll('.carousel-slide img').forEach(img => {
  img.addEventListener('click', () => {
    fullImage.src = img.src;
    const captionDiv = img.closest('.carousel-slide')?.querySelector('.fullcaption');
    const captionText = captionDiv ? captionDiv.innerHTML : ''; 
    caption.innerHTML = captionText;
    overlay.style.display = 'flex';
    
    zoomInSound.currentTime = 0;
    zoomInSound.play();
  });
});

overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
  fullImage.src = '';
  caption.textContent = '';
});

// กดตันตัน
  function playtantan() {
    const audio = document.getElementById('tbmuk');
    audio.currentTime = 0; // เริ่มต้นใหม่ทุกครั้งที่คลิก
    audio.play();
  }

