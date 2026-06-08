document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const site = document.getElementById("site");
  const typingTitle = document.getElementById("typing-title");
  const navbar = document.getElementById("navbar");

  const discoverSection = document.getElementById("decouvrir");
  const creationsSection = document.getElementById("creations");
  const pricingSection = document.getElementById("tarifs");

  const showroomItems = document.querySelectorAll(".showroom-item");
  const previewImage = document.getElementById("previewImage");
  const previewTitle = document.getElementById("previewTitle");
  const previewText = document.getElementById("previewText");

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
      { threshold }
    );

    observer.observe(section);
  }

  revealOnScroll(discoverSection, 0.35);
  revealOnScroll(creationsSection, 0.25);
  revealOnScroll(pricingSection, 0.2);

  const projects = {
    restaurant: {
      title: "Restaurant",
      text: "Une vitrine élégante pour présenter votre cuisine, votre ambiance et faciliter les réservations.",
      bg: "var(--restaurant-bg)"
    },
    garage: {
      title: "Garage automobile",
      text: "Une interface claire et rassurante pour présenter vos services, vos horaires et générer des demandes.",
      bg: "var(--garage-bg)"
    },
    coiffeur: {
      title: "Coiffeur",
      text: "Un univers moderne pour mettre en valeur votre salon, vos prestations et votre style.",
      bg: "var(--coiffeur-bg)"
    },
    bar: {
      title: "Bar",
      text: "Une ambiance visuelle forte pour transmettre votre atmosphère avant même l’arrivée du client.",
      bg: "var(--bar-bg)"
    },
    boulangerie: {
      title: "Boulangerie",
      text: "Une présence chaleureuse pour présenter vos produits, vos horaires et votre savoir-faire.",
      bg: "var(--boulangerie-bg)"
    },
    beaute: {
      title: "Institut de beauté",
      text: "Une image douce et premium pour valoriser vos soins, votre expertise et votre univers.",
      bg: "var(--beaute-bg)"
    }
  };

  showroomItems.forEach((item) => {
    const updatePreview = () => {
      const projectKey = item.dataset.project;
      const project = projects[projectKey];

      if (!project) return;

      showroomItems.forEach((button) => {
        button.classList.remove("active");
      });

      item.classList.add("active");

      if (previewTitle) previewTitle.textContent = project.title;
      if (previewText) previewText.textContent = project.text;
      if (previewImage) previewImage.style.setProperty("--preview-bg", project.bg);
    };

    item.addEventListener("mouseenter", updatePreview);
    item.addEventListener("click", updatePreview);
  });

  if (motifSelect && otherReason) {
    motifSelect.addEventListener("change", () => {
      otherReason.classList.toggle("is-visible", motifSelect.value === "autre");
    });
  }
});