document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const site = document.getElementById("site");
  const typingTitle = document.getElementById("typing-title");
  const navbar = document.getElementById("navbar");

  const discoverSection = document.getElementById("decouvrir");
  const pricingSection = document.getElementById("tarifs");

  const motifSelect = document.getElementById("motif");
  const otherReason = document.getElementById("otherReason");

  const titleText = "Des sites web sur mesure qui reflètent votre identité.";

  setTimeout(() => {
    if (intro) intro.classList.add("is-darkening");
  }, 2500);

  setTimeout(() => {
    if (intro) intro.classList.add("is-hidden");
    if (site) site.classList.add("is-visible");
    typeTitle();
  }, 3100);

  function typeTitle() {
    if (!typingTitle) return;

    let index = 0;

    const interval = setInterval(() => {
      typingTitle.textContent += titleText[index];
      index++;

      if (index >= titleText.length) {
        clearInterval(interval);
        typingTitle.classList.add("is-finished");
      }
    }, 70);
  }

  function handleNavbarScroll() {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll();

  function revealOnScroll(section, threshold = 0.25) {
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("is-visible");
          }
        });
      },
      { threshold },
    );

    observer.observe(section);
  }

  revealOnScroll(discoverSection, 0.35);
  revealOnScroll(pricingSection, 0.2);

  if (motifSelect && otherReason) {
    motifSelect.addEventListener("change", () => {
      otherReason.classList.toggle("is-visible", motifSelect.value === "autre");
    });
  }
});
