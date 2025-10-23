const pages = document.querySelectorAll(".page");
const bgMusic = document.getElementById("bgMusic");
const message2 = document.getElementById("message2");
const slideshow = document.getElementById("slideshow");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

let currentPage = 1;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function nextPage(num) {
  bgMusic.play().catch(() => {});
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById("page" + num).classList.add("active");
  currentPage = num;

  if (num === 2) startMessage();
  if (num === 3) startSlideshow();
}

function restart() {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById("page1").classList.add("active");
  currentPage = 1;
}

function startMessage() {
  const lines = [
    "Semoga panjang umur, sehat selalu, dilancarkan rejekinya",
    "Semoga harimu seindah senyumanmu 💋",
    "Semua impianmu bisa tercapai tahun ini 😊",
    "Segala urusanmu dipermudah",
    "Jangan sering-sering sedih yaaa 🌸"
  ];
  message2.innerHTML = "";
  let i = 0;
  function type() {
    if (i < lines.length) {
      message2.innerHTML += lines[i] + "<br><br>";
      i++;
      setTimeout(type, 1500);
    } else {
      setTimeout(() => nextPage(3), 2000);
    }
  }
  type();
}

function startSlideshow() {
  const photos = [
    "IMG-20250902-WA0022.jpg",
    "IMG-20250920-WA0024.jpg",
    "IMG-20250911-WA0034.jpg",
    "IMG-20250901-WA0009.jpg",
    "IMG-20250918-WA0004.jpg",
    "IMG-20250911-WA0022.jpg"
  ];
  let index = 0;
  slideshow.src = photos[0];
  const interval = setInterval(() => {
    index = (index + 1) % photos.length;
    slideshow.style.opacity = 0;
    setTimeout(() => {
      slideshow.src = photos[index];
      slideshow.style.opacity = 1;
    }, 500);
  }, 4000);

  setTimeout(() => {
    clearInterval(interval);
    nextPage(4);
  }, photos.length * 4000 + 2000);
}

function answer(isYes) {
  const question = document.getElementById("question");
  const msg = document.getElementById("finalMessage");
  const waLink = document.getElementById("waLink");
  
  question.style.display = "none";
  msg.classList.remove("hidden");
  
  if (isYes) {
    msg.innerHTML = "Yeayyy kamu suka, Terima kasih sayang 😋";
    waLink.classList.remove("hidden");
    startConfetti();
  } else {
    msg.innerHTML = "Yahhh kurang suka ternyata, next time aku coba lagi ya 😅";
    waLink.classList.add("hidden");
  }
}

// 🎉 Confetti effect
let confettiParticles = [];

function startConfetti() {
  confettiParticles = [];
  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 0.02 + 0.02,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    });
  }
  animateConfetti();
  setTimeout(() => confettiParticles = [], 5000);
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.d * 200;
    if (p.y > confettiCanvas.height) p.y = -10;
  });
  if (confettiParticles.length > 0) requestAnimationFrame(animateConfetti);
}

