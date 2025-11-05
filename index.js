const overlay = document.getElementById("overlay");
const overlayBox = document.getElementById("overlayBox");
const links = document.querySelectorAll("header nav a");

const sections = ["About", "Services", "Contact"];
let currentIndex = 0;

function renderOverlay(section) {
  let content = "";

  if (section === "About") {
    content = `
      <h1>About</h1>
      <p>Hi! I'm <strong>Christian Gentiles</strong>, an aspiring <strong>Frontend Developer</strong>.
      I'm passionate about creating clean, modern interfaces and improving my skills every day.
      I enjoy learning new technologies, exploring creative ideas, and building meaningful digital experiences.</p>
    `;
  } else if (section === "Services") {
    content = `<h1>My Services</h1><p>Coming Soon..</p>`;
  } else if (section === "Contact") {
    content = `
      <h1>Contact</h1>
      <p>Let's work together! Message me on social media.</p>
      <!-- ✅ Added Facebook and Instagram icons -->
      <div class="social-icons">
        <a href="https://facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a>
        <a href="https://instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
      </div>
    `;
  }

  const circles = sections.map((s, i) =>
    `<div class="circle ${i === currentIndex ? "active" : ""}" onclick="goToSection(${i})"></div>`
  ).join("");

  overlayBox.innerHTML = `
    <button class="arrow-btn arrow-left" onclick="prevSection()">&#8592;</button>
    <div class="content">${content}</div>
    <div class="circle-container">${circles}</div>
    <button class="arrow-btn arrow-right" onclick="nextSection()">&#8594;</button>
  `;
}

function openOverlay(section, el) {
  overlay.classList.add("show");
  setActiveHeader(section);
  currentIndex = sections.indexOf(section);
  renderOverlay(section);
}

function nextSection() {
  currentIndex = (currentIndex + 1) % sections.length;
  const section = sections[currentIndex];
  setActiveHeader(section);
  renderOverlay(section);
}

function prevSection() {
  currentIndex = (currentIndex - 1 + sections.length) % sections.length;
  const section = sections[currentIndex];
  setActiveHeader(section);
  renderOverlay(section);
}

function goToSection(index) {
  currentIndex = index;
  const section = sections[index];
  setActiveHeader(section);
  renderOverlay(section);
}

/* Highlight active header link in gray */
function setActiveHeader(section) {
  links.forEach(a => {
    const text = a.textContent.trim();
    if (text === section) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });
}

/* When clicking outside overlay box, close it */
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("show");
    resetHeaderColors();
  }
});

/* Reset all header link colors */
function resetHeaderColors() {
  links.forEach(a => a.classList.remove("active"));
}