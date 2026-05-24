
// ===============================
// GLOBAL ELEMENTS (SAFE CACHE)
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a[href^='#']");
const navbar = document.getElementById("nav");
const revealEls = document.querySelectorAll(".reveal");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const form = document.getElementById("contactForm");
const messageBox = document.getElementById("formMessage");

// ===============================
// 1. ACTIVE NAV (OPTIMIZED)
// ===============================
let lastActive = "";

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;

  let current = "";

  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      current = sec.id;
    }
  });

  if (current === lastActive) return;
  lastActive = current;

  navLinks.forEach((link) => {
    const isActive = current && link.getAttribute("href") === `#${current}`;

    link.classList.toggle("text-[#10b981]", isActive);
    link.classList.toggle("text-[#9ca3af]", !isActive);
  });
}

// ===============================
// 2. MOBILE MENU (SAFE)
// ===============================
(function () {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
})();

// ===============================
// 3. REVEAL ON SCROLL (OPTIMIZED)
// ===============================
function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealEls.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 120) {
      el.classList.add("active");
    }
  });
}

// ===============================
// 4. PORTFOLIO FILTER (SAFE)
// ===============================
(function () {
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.filter;

      filterBtns.forEach((b) => {
        const active = b === btn;

        b.classList.toggle("bg-[#10b981]", active);
        b.classList.toggle("text-white", active);

        b.classList.toggle("border-2", !active);
        b.classList.toggle("border-[#10b981]", !active);
        b.classList.toggle("text-[#10b981]", !active);
      });

      projectCards.forEach((card) => {
        const cat = card.dataset.category;

        const show = value === "all" || cat === value;

        card.style.display = show ? "block" : "none";
      });
    });
  });
})();

// ===============================
// 5. CONTACT FORM (EMAILJS FIXED)
// ===============================
if (form && messageBox) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    messageBox.classList.remove("hidden");
    messageBox.textContent = "Sending...";
    messageBox.className =
      "p-3 rounded bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/50";

    emailjs
      .sendForm("service_il2g0tx", "template_6cogq0b", form)
      .then(() => {
        messageBox.textContent = "✓ Message sent successfully!";
        messageBox.className =
          "p-3 rounded bg-green-500/20 text-green-400 border border-green-500/50";

        form.reset();

        // ✅ hide after 5 seconds
        setTimeout(() => {
          messageBox.classList.add("hidden");
        }, 5000);
      })
      .catch((error) => {
        console.error(error);

        messageBox.textContent = "❌ Failed to send. Try again.";
        messageBox.className =
          "p-3 rounded bg-red-500/20 text-red-400 border border-red-500/50";

        // Error hide after 5 sec baad hide
        setTimeout(() => {
          messageBox.classList.add("hidden");
        }, 5000);
      });
  });
}
// ===============================
// 6. SMOOTH SCROLL (FIXED CONFLICT)
// ===============================
(function () {
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    });
  });
})();

// ===============================
// 7. NAVBAR SCROLL (SAFE)
// ===============================
(function () {
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("bg-[#121212]/95", window.scrollY > 50);
  });
})();

// ===============================
// MASTER SCROLL OPTIMIZATION
// ===============================
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveLink();
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// INIT
updateActiveLink();
revealOnScroll();