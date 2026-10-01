/* =========================================================
   MARCELA & MIGUEL
   Wedding Invitation
   30 December 2026
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const cover = document.getElementById("cover");
  const invitation = document.getElementById("invitation");

  const openButton = document.getElementById("openInvitation");
  const envelope = document.querySelector(".envelope");

  const languageButtons = document.querySelectorAll(".lang-btn");

  const musicButton = document.getElementById("musicButton");
  const music = document.getElementById("backgroundMusic");

  const rsvpForm = document.getElementById("rsvpForm");

  let currentLanguage = "es";
  let invitationOpened = false;
  let musicPlaying = false;


  /* =======================================================
     LANGUAGE
  ======================================================= */

  function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-es][data-en]").forEach(element => {

      const translation = element.dataset[language];

      if (translation) {
        element.textContent = translation;
      }

    });


    languageButtons.forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.lang === language
      );

    });


    // Save guest language choice
    try {
      localStorage.setItem("weddingLanguage", language);
    } catch (error) {
      // Website still works if localStorage is unavailable.
    }

  }


  languageButtons.forEach(button => {

    button.addEventListener("click", () => {

      changeLanguage(button.dataset.lang);

    });

  });


  /* Load previously selected language */

  try {

    const savedLanguage =
      localStorage.getItem("weddingLanguage");

    if (
      savedLanguage === "es" ||
      savedLanguage === "en"
    ) {

      changeLanguage(savedLanguage);

    }

  } catch (error) {
    changeLanguage("es");
  }


  /* =======================================================
     OPEN INVITATION
  ======================================================= */

  function openInvitation() {

    if (invitationOpened) {
      return;
    }

    invitationOpened = true;

    envelope.classList.add("open");


    /*
      Music will start here later when we add
      the MP3 file.
    */

    if (
      music &&
      music.querySelector("source") &&
      music.querySelector("source").getAttribute("src")
    ) {

      music.play()
        .then(() => {

          musicPlaying = true;
          musicButton.classList.add("playing");

        })
        .catch(() => {

          musicPlaying = false;

        });

    }


    /*
      Allow envelope animation to finish
    */

    setTimeout(() => {

      cover.classList.add("fade-away");

    }, 1300);


    /*
      Reveal invitation
    */

    setTimeout(() => {

      invitation.classList.remove("hidden");

      cover.style.display = "none";

      window.scrollTo({
        top: 0,
        behavior: "instant"
      });


      /*
        Trigger first reveal
      */

      setTimeout(() => {

        const firstSection =
          invitation.querySelector(".reveal");

        if (firstSection) {
          firstSection.classList.add("show");
        }

      }, 100);

    }, 2200);

  }


  if (openButton) {

    openButton.addEventListener(
      "click",
      openInvitation
    );

  }


  /* =======================================================
     MUSIC BUTTON
  ======================================================= */

  if (musicButton && music) {

    musicButton.addEventListener("click", () => {

      const source =
        music.querySelector("source");

      /*
        No song added yet
      */

      if (
        !source ||
        !source.getAttribute("src")
      ) {

        return;

      }


      if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.classList.remove("playing");

        musicButton.textContent = "♫";

      } else {

        music.play()
          .then(() => {

            musicPlaying = true;

            musicButton.classList.add("playing");

            musicButton.textContent = "♪";

          })
          .catch(() => {});

      }

    });

  }


  /* =======================================================
     COUNTDOWN
     Hobart time — 30 December 2026, 3:00 PM
  ======================================================= */

  const weddingDate =
    new Date("2026-12-30T15:00:00+11:00");


  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  function updateCountdown() {

    const now = new Date();

    const difference =
      weddingDate.getTime() -
      now.getTime();


    /*
      Wedding day has arrived
    */

    if (difference <= 0) {

      if (daysElement) daysElement.textContent = "00";
      if (hoursElement) hoursElement.textContent = "00";
      if (minutesElement) minutesElement.textContent = "00";
      if (secondsElement) secondsElement.textContent = "00";

      return;

    }


    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );


    const hours =
      Math.floor(
        (difference /
        (1000 * 60 * 60)) %
        24
      );


    const minutes =
      Math.floor(
        (difference /
        (1000 * 60)) %
        60
      );


    const seconds =
      Math.floor(
        (difference / 1000) %
        60
      );


    if (daysElement) {
      daysElement.textContent =
        String(days).padStart(2, "0");
    }


    if (hoursElement) {
      hoursElement.textContent =
        String(hours).padStart(2, "0");
    }


    if (minutesElement) {
      minutesElement.textContent =
        String(minutes).padStart(2, "0");
    }


    if (secondsElement) {
      secondsElement.textContent =
        String(seconds).padStart(2, "0");
    }

  }


  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("show");

              observer.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold: 0.15
        }

      );


    revealElements.forEach(element => {

      observer.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("show");

    });

  }


  /* =======================================================
     RSVP
     Temporary behaviour until we connect the real form.
  ======================================================= */

  if (rsvpForm) {

    rsvpForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        if (currentLanguage === "es") {

          alert(
            "¡Gracias! 💌 En el siguiente paso conectaremos este formulario para guardar tu confirmación."
          );

        } else {

          alert(
            "Thank you! 💌 In the next step we will connect this form so your RSVP is saved."
          );

        }

      }
    );

  }


  /* =======================================================
     IMAGE FALLBACK
  ======================================================= */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.display = "none";

        }
      );

    });

});
