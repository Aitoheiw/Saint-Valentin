/**
 * Saint-Valentin App
 * - Le bouton "Non" fuit le curseur avec des animations
 * - Le bouton "Oui" affiche la page de célébration
 */

// ===== FLOATING HEARTS BACKGROUND =====
(function createFloatingHearts() {
  const container = document.querySelector(".floating-hearts");
  const hearts = ["💕", "💗", "💖", "💘", "♥", "❤️", "💓"];

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = Math.random() * 1.2 + 0.6 + "rem";
    heart.style.animationDuration = Math.random() * 10 + 8 + "s";
    heart.style.animationDelay = Math.random() * 12 + "s";
    container.appendChild(heart);
  }
})();

// ===== "NON" BUTTON FLEE LOGIC =====
const btnNon = document.getElementById("btn-non");
const btnOui = document.getElementById("btn-oui");
let fleeCount = 0;
let isMoving = false;

const funnyTexts = [
  "Non",
  "Sûr(e) ?",
  "Vraiment ?",
  "Pense a mini cochon !!",
  "🥺",
  "Non tu ne peut pas dire ça",
  "Réfléchis...",
  "Non non...",
  "😢",
  "Mauvaise réponse !",
  "💔",
  "Essaie encore !",
];

function getRandomPosition() {
  const margin = 20;
  const btnRect = btnNon.getBoundingClientRect();
  const maxX = window.innerWidth - btnRect.width - margin;
  const maxY = window.innerHeight - btnRect.height - margin;
  const x = Math.random() * maxX + margin;
  const y = Math.random() * maxY + margin;
  return { x, y };
}

function fleeButton() {
  if (isMoving) return;
  isMoving = true;
  fleeCount++;

  // Change text
  const textIndex = Math.min(fleeCount, funnyTexts.length - 1);
  btnNon.textContent = funnyTexts[textIndex];

  // Add fleeing class for smooth transition
  btnNon.classList.add("fleeing");

  // Make "Oui" button grow slightly to entice clicking
  const ouiScale = 1 + Math.min(fleeCount * 0.05, 0.4);
  btnOui.style.transform = `scale(${ouiScale})`;

  // Progressively shrink the "Non" button
  if (fleeCount >= 5) {
    btnNon.classList.add("shrinking");
  }
  if (fleeCount >= 8) {
    btnNon.classList.add("tiny");
  }

  // Move to random position
  const pos = getRandomPosition();

  // Use fixed positioning to escape the button container
  btnNon.style.position = "fixed";
  btnNon.style.left = pos.x + "px";
  btnNon.style.top = pos.y + "px";
  btnNon.style.zIndex = "999";

  setTimeout(() => {
    isMoving = false;
  }, 280);
}

// Flee on hover (desktop)
btnNon.addEventListener("mouseenter", fleeButton);

// Flee on touch start (mobile)
btnNon.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    fleeButton();
  },
  { passive: false },
);

// Also flee on click just in case
btnNon.addEventListener("click", (e) => {
  e.preventDefault();
  fleeButton();
});

// ===== "OUI" BUTTON - SHOW CELEBRATION =====
function sayYes() {
  const questionPage = document.getElementById("question-page");
  const celebrationPage = document.getElementById("celebration-page");

  // Transition pages
  questionPage.classList.remove("active");

  setTimeout(() => {
    celebrationPage.classList.add("active");
    celebrationPage.style.background =
      "linear-gradient(135deg, #fff5f5 0%, #ffe0e6 50%, #ffd6e0 100%)";

    // Launch confetti
    const confetti = new ConfettiEngine("confetti-canvas");
    confetti.burst(200);

    // Second wave of confetti
    setTimeout(() => confetti.burst(100), 1200);

    // Third wave
    setTimeout(() => confetti.burst(80), 2500);
  }, 400);
}
