// ===============================
// AU BONHEUR — INTERACTIONS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const revealElements = document.querySelectorAll(".reveal");
  const reviewGrid = document.querySelector(".review-grid");
  const forms = document.querySelectorAll("form");

  // ===============================
  // HEADER AU SCROLL
  // ===============================

  const updateHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader);

  // ===============================
  // MENU MOBILE
  // ===============================

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
      });
    });
  }

  // ===============================
  // ANIMATIONS AU SCROLL
  // ===============================

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // ===============================
  // EFFET PARALLAX LÉGER
  // ===============================

  const hero = document.querySelector(".hero");
  const heroCard = document.querySelector(".hero-card");

  window.addEventListener("scroll", () => {
    const scrollValue = window.scrollY;

    if (hero && scrollValue < window.innerHeight) {
      hero.style.backgroundPositionY = `${scrollValue * 0.2}px`;
    }

    if (heroCard && scrollValue < window.innerHeight) {
      heroCard.style.transform = `translateY(${scrollValue * -0.04}px)`;
    }
  });

  // ===============================
  // MESSAGE DE CONFIRMATION
  // ===============================

  const showSuccessMessage = (form, message) => {
    const oldMessage = form.querySelector(".form-success");

    if (oldMessage) {
      oldMessage.remove();
    }

    const successMessage = document.createElement("p");
    successMessage.classList.add("form-success");
    successMessage.textContent = message;

    form.appendChild(successMessage);
  };

  // ===============================
  // CRÉATION D’UN AVIS DYNAMIQUE
  // ===============================

  const createReviewCard = (name, rating, message) => {
    if (!reviewGrid) return;

    const card = document.createElement("article");
    card.classList.add("review-card", "added");

    const stars = "★".repeat(Number(rating)) + "☆".repeat(5 - Number(rating));

    card.innerHTML = `
      <div class="stars">${stars}</div>
      <p>“${message}”</p>
      <span>${name}</span>
    `;

    reviewGrid.prepend(card);
  };

  // ===============================
  // FORMULAIRES
  // ===============================

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // FORMULAIRE D’AVIS
      if (form.classList.contains("review-form")) {
        const name = form.reviewName.value.trim();
        const rating = form.reviewRating.value;
        const message = form.reviewMessage.value.trim();

        if (!name || !rating || !message) {
          showSuccessMessage(
            form,
            "Veuillez remplir tous les champs avant de publier votre avis."
          );
          return;
        }

        createReviewCard(name, rating, message);

        showSuccessMessage(
          form,
          "Merci pour votre avis. Il vient d’être ajouté à la page de démonstration."
        );

        form.reset();
        return;
      }

      // FORMULAIRE DE RÉSERVATION
      if (form.classList.contains("booking-form")) {
        const name = form.bookingName.value.trim();
        const guests = form.bookingGuests.value;
        const date = form.bookingDate.value;
        const time = form.bookingTime.value;

        const submitButton = form.querySelector("button[type='submit']");
        const originalButtonText = submitButton.textContent;

        submitButton.textContent = "Envoi en cours...";
        submitButton.disabled = true;

        try {
          const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
              Accept: "application/json",
            },
          });

          if (response.ok) {
            showSuccessMessage(
              form,
              `Merci ${name}. Votre demande pour ${guests} personne(s), le ${date} à ${time}, a bien été envoyée au restaurant.`
            );

            form.reset();
          } else {
            showSuccessMessage(
              form,
              "Une erreur est survenue pendant l’envoi. Veuillez appeler directement le restaurant."
            );
          }
        } catch (error) {
          showSuccessMessage(
            form,
            "Impossible d’envoyer la demande pour le moment. Veuillez appeler directement le restaurant."
          );
        } finally {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        }
      }
    });
  });
});