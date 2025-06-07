const container = document.getElementById("slideshow-container");
const prevBtn = container.querySelector(".prev");
const nextBtn = container.querySelector(".next");
let slideIndex = 0;
let slides = [];

async function fetchImages() {
  try {
    const response = await fetch(
      "https://api.unsplash.com/photos/random?count=5&query=bank&client_id=DRNoRxSLNTalShyDRhG0ZLFJl4bdidONcmLm1ZaHB3c"
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    slides = data.map((img) => img.urls.regular);

    // Remove old images if any
    container.querySelectorAll(".slide").forEach((img) => img.remove());
    // Remove old error if any
    const oldError = container.querySelector(".slide-error");
    if (oldError) oldError.remove();

    if (slides.length === 0) throw new Error("No images found");

    // Add new images
    slides.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "slide";
      img.style.display = i === 0 ? "block" : "none";
      container.insertBefore(img, prevBtn);
    });

    prevBtn.style.display = "";
    nextBtn.style.display = "";
    slideIndex = 0;
    showSlide(slideIndex);
  } catch (error) {
    // Remove old images if any
    container.querySelectorAll(".slide").forEach((img) => img.remove());
    // Remove old error if any
    const oldError = container.querySelector(".slide-error");
    if (oldError) oldError.remove();

    // Show error message
    const errorMsg = document.createElement("div");
    errorMsg.className = "slide-error";
    errorMsg.textContent = "Failed to load images. Please try again later.";
    errorMsg.style.color = "red";
    errorMsg.style.textAlign = "center";
    errorMsg.style.width = "100%";
    container.insertBefore(errorMsg, prevBtn);

    // Hide arrows
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  }
}

function showSlide(n) {
  const imgs = container.querySelectorAll(".slide");
  if (imgs.length === 0) return;
  imgs.forEach((img, i) => {
    img.style.display = i === n ? "block" : "none";
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

fetchImages();

// Close hamburger menu on nav link click (mobile)
document.querySelectorAll(".nav-link a").forEach((link) => {
  link.addEventListener("click", () => {
    const toggle = document.getElementById("toggle");
    if (toggle && toggle.checked) {
      toggle.checked = false;
    }
    
  });
});

const requestBtn = document.querySelectorAll(".btn");
requestBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Thank you for your interest! We will contact you soon");
  });
});


// Optionally, handle browser back/forward navigation (basic)
window.addEventListener("popstate", function () {
  // You can reload the main content or handle routing here if you expand SPA features
});

const mainContent = document.getElementById("main-content");
const originalMainHTML = mainContent.innerHTML;

// SPA-like navigation for Home and About
document.querySelectorAll(".nav-link a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const text = link.textContent.trim();

    // Careers handled separately below
    if (link.id === "career-link") return;

    if (text === "Home") {
      e.preventDefault();
      mainContent.innerHTML = originalMainHTML;
      fetchImages();
    }

    if (text === "About") {
      e.preventDefault();
      mainContent.innerHTML = originalMainHTML;
      fetchImages();
      // Wait for DOM update, then scroll to About
      setTimeout(() => {
        const aboutSection = document.getElementById("about-section");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }

    // Always close hamburger menu on nav click (mobile)
    const toggle = document.getElementById("toggle");
    if (toggle && toggle.checked) {
      toggle.checked = false;
    }
  });
});

// SPA-like Career page loader
document.getElementById("career-link").addEventListener("click", function (e) {
  e.preventDefault();
  mainContent.innerHTML = "";
  const template = document.getElementById("career-template");
  mainContent.appendChild(template.content.cloneNode(true));

  // Always close hamburger menu on nav click (mobile)
  const toggle = document.getElementById("toggle");
  if (toggle && toggle.checked) {
    toggle.checked = false;
  }
});
