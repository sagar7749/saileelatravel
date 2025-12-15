// Page Loader

// Hide loader after 10.5 seconds
window.onload = function () {
  setTimeout(() => {
    document.getElementById("page-loader").style.display = "none";
  }, 7000);
};

// window.addEventListener("load", () => {
//   const loader = document.getElementById("page-loader");
//   setTimeout(() => {
//     loader.classList.add("hide");
//   }, 1000);
// });

// Scroll Reveal Animation
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const currentScroll = window.scrollY;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Hide & show effect
  if (currentScroll > lastScroll && currentScroll > 200) {
    gsap.to(navbar, { y: "-100%", duration: 0.4 });
  } else {
    gsap.to(navbar, { y: "0%", duration: 0.4 });
  }

  lastScroll = currentScroll;
});

/* ===============================
   HELPER SELECTORS
================================ */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ===============================
   BOOK NOW → WHATSAPP
================================ */
$$(".book-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const packageName = btn.dataset.package;
    const price = btn.dataset.price;

    const phoneNumber = "918238966749";
    const message = `Hello, I want to book the following package:%0A
Package: ${packageName}%0A
Price: ${price}%0A
Please contact me with details.`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  });
});

/* ===============================
   VIDEO PLAY
================================ */
function playVideo() {
  const video = $("#myVideo");
  if (!video) return;
  video.setAttribute("controls", "controls");
  video.play();
}

/* ===============================
   MOBILE MENU TOGGLE
================================ */
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

$$(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});

/* ===============================
   CAROUSEL
================================ */
const slides = $$(".slide");
const dots = $$(".carousel-dot");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

setInterval(() => showSlide(currentSlide + 1), 5000);

dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

/* ===============================
   GALLERY FILTER
================================ */
const tabBtns = $$(".tab-btn");
const galleryItems = $$(".gallery-item");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.tab;

    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    galleryItems.forEach((item) => {
      item.style.display =
        filter === "all" || item.dataset.type === filter ? "block" : "none";
    });
  });
});

/* ===============================
   SMOOTH SCROLL
================================ */
$$('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = $(anchor.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ===============================
   SCROLL TO TOP
================================ */
const scrollTopBtn = $("#scrollTop");
scrollTopBtn?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* ===============================
   FORM → WHATSAPP
================================ */
function sendToWhatsApp() {
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const phone = $("#phone").value.trim();
  const message = $("#message").value.trim();

  let valid = true;
  $$(".error").forEach((e) => (e.innerText = ""));

  if (!name) ($("#nameError").innerText = "Name is required"), (valid = false);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ($("#emailError").innerText = "Valid email required"), (valid = false);
  if (!phone || !/^[0-9]{6,15}$/.test(phone))
    ($("#phoneError").innerText = "Valid phone required"), (valid = false);
  if (!message)
    ($("#messageError").innerText = "Message cannot be empty"), (valid = false);

  if (!valid) return;

  const whatsappMessage = `New Inquiry:%0A%0A👤 Name: ${name}%0A📧 Email: ${email}%0A📱 Phone: ${phone}%0A💬 Message: ${message}`;
  window.open(`https://wa.me/8238966749?text=${whatsappMessage}`, "_blank");
}

/* ===============================
   SCROLL EFFECTS + ACTIVE LINK
================================ */
const navbar = $("#navbar");
const sections = $$("section[id]");
const navItems = $$(".nav-links a");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  // Navbar shadow
  navbar?.classList.toggle("scrolled", scrollY > 50);

  // Scroll-top button
  scrollTopBtn?.classList.toggle("visible", scrollY > 300);

  // Active nav link
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id = section.id;

    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`)
      );
    }
  });
});

/* ===============================
   SCROLL ANIMATION
================================ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

$$(".fleet-card, .package-card, .review-card, .gallery-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});
