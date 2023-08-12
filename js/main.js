// select elements from HTML
const welcomeCard = document.querySelector(".welcome-container");
const instructionsCard = document.querySelector(".instructions-container");

const nextBtn = document.getElementById("welcome-btn");

nextBtn.addEventListener("click", function () {
  welcomeCard.classList.add("hidden");
  instructionsCard.classList.remove("hidden");
});
