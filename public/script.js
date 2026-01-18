// Menu mobile
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.getElementById("checkout-button").addEventListener("click", () => {

fetch("/create-checkout-session", {
    method: "POST"
  })
  .then(res => res.json())
  .then(data => {
    window.location = data.url;
  });
});

