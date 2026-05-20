const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const faqItems = document.querySelectorAll(".faq-item");
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const revealItems = document.querySelectorAll(".reveal");

function closeMenu() {
  body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navPanel?.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (link) {
    closeMenu();
  }
});

anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

faqItems.forEach((item) => {
  const button = item.querySelector("button");

  button?.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
