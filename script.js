// --------- SLIDESHOW ---------
// const container = document.getElementById("slideshow-container");
// const prevBtn = container.querySelector(".prev");
// const nextBtn = container.querySelector(".next");
// let slideIndex = 0;
// let slides = [];

// async function fetchImages() {
//   try {
//     const response = await fetch(
//       "https://api.unsplash.com/photos/random?count=5&query=bank&client_id=DRNoRxSLNTalShyDRhG0ZLFJl4bdidONcmLm1ZaHB3c"
//     );
//     if (!response.ok) throw new Error("Network response was not ok");
//     const data = await response.json();
//     slides = data.map((img) => img.urls.regular);

//     // Remove old images and errors
//     container.querySelectorAll(".slide, .slide-error").forEach((el) => el.remove());

//     if (slides.length === 0) throw new Error("No images found");

//     // Add new images
//     slides.forEach((src, i) => {
//       const img = document.createElement("img");
//       img.src = src;
//       img.className = "slide";
//       img.style.display = i === 0 ? "block" : "none";
//       container.insertBefore(img, prevBtn);
//     });

//     prevBtn.style.display = "";
//     nextBtn.style.display = "";
//     slideIndex = 0;
//     showSlide(slideIndex);
//   } catch (error) {
//     // Remove old images and errors
//     container.querySelectorAll(".slide, .slide-error").forEach((el) => el.remove());

//     // Show error message
//     const errorMsg = document.createElement("div");
//     errorMsg.className = "slide-error";
//     errorMsg.textContent = "Failed to load images. Please try again later.";
//     errorMsg.style.color = "red";
//     errorMsg.style.textAlign = "center";
//     errorMsg.style.width = "100%";
//     container.insertBefore(errorMsg, prevBtn);

//     // Hide arrows
//     prevBtn.style.display = "none";
//     nextBtn.style.display = "none";
//   }
// }

// function showSlide(n) {
//   const imgs = container.querySelectorAll(".slide");
//   if (imgs.length === 0) return;
//   imgs.forEach((img, i) => {
//     img.style.display = i === n ? "block" : "none";
//   });
// }

// function nextSlide() {
//   slideIndex = (slideIndex + 1) % slides.length;
//   showSlide(slideIndex);
// }

// function prevSlide() {
//   slideIndex = (slideIndex - 1 + slides.length) % slides.length;
//   showSlide(slideIndex);
// }

// prevBtn.addEventListener("click", prevSlide);
// nextBtn.addEventListener("click", nextSlide);

// fetchImages();

// --------- HAMBURGER MENU CLOSE ON NAV CLICK ---------
function closeHamburgerMenu() {
  const toggle = document.getElementById("toggle");
  if (toggle && toggle.checked) {
    toggle.checked = false;
  }
}

// --------- SPA NAVIGATION ---------
const mainContent = document.getElementById("main-content");
const originalMainHTML = mainContent.innerHTML;

document.querySelectorAll(".nav-link a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const text = link.textContent.trim();

    // Careers handled separately below
    if (link.id === "career-link") return;
    

    if (text === "Home") {
      e.preventDefault();
      mainContent.innerHTML = originalMainHTML;
      // fetchImages();
      setupRequestInviteButtons();
      closeHamburgerMenu();
    }

    if (text === "About") {
      e.preventDefault();
      mainContent.innerHTML = originalMainHTML;
      // fetchImages();
      setupRequestInviteButtons();
      setTimeout(() => {
        const aboutSection = document.getElementById("about-section");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
      closeHamburgerMenu();
    }

    closeHamburgerMenu();
  });
});

// --------- SPA-LIKE CAREER PAGE LOADER ---------
document.getElementById("career-link").addEventListener("click", function (e) {
  e.preventDefault();
  mainContent.innerHTML = "";
  const template = document.getElementById("career-template");
  mainContent.appendChild(template.content.cloneNode(true));
  closeHamburgerMenu();
  setupCareerApplyModal();
});

// --------- CAREER MODAL & FORM ---------
function setupCareerApplyModal() {
  // Event delegation for "Apply Now" buttons inside careers-list
  const careersList = document.querySelector('.careers-list');
  if (careersList) {
    careersList.addEventListener('click', function(e) {
      if (e.target.classList.contains('btn')) {
        e.preventDefault();
        const modal = document.getElementById('career-modal');
        if (modal) modal.style.display = 'flex';
      }
    });
  }

  // Close modal on close button
  const closeBtn = document.getElementById('career-modal-close');
  if (closeBtn) {
    closeBtn.onclick = function() {
      document.getElementById('career-modal').style.display = 'none';
    };
  }
  // Close modal when clicking outside the modal content
  const modalBg = document.getElementById('career-modal');
  if (modalBg) {
    modalBg.onclick = function(e) {
      if (e.target === modalBg) {
        modalBg.style.display = 'none';
      }
    };
  }

  // Handle form submission and save to localStorage
  const form = document.getElementById('career-apply-form');
  if (form) {
    form.onsubmit = function(ev) {
      ev.preventDefault();
      const name = form.elements['name'].value;
      const email = form.elements['email'].value;
      const message = form.elements['message'].value;
      const applications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
      applications.push({ name, email, message, date: new Date().toISOString() });
      localStorage.setItem('careerApplications', JSON.stringify(applications));
      alert('Application submitted! Thank you.');
      document.getElementById('career-modal').style.display = 'none';
      form.reset();
    };
  }
}

// --------- REQUEST INVITE BUTTONS ---------
function setupRequestInviteButtons() {
 document.body.addEventListener("click", function(e) {
  const btn = e.target.closest(".btn");
  if (
    btn &&
    !btn.closest('.career-item') &&
    !btn.closest('#career-modal')
  ) {
    e.preventDefault();
    alert("Thank you for your interest! We will contact you soon");
  }
});
}
setupRequestInviteButtons();

// --------- OPTIONAL: HANDLE BROWSER BACK/FORWARD ---------
window.addEventListener("popstate", function () {
  // You can reload the main content or handle routing here if you expand SPA features
});