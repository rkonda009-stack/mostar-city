document.addEventListener("DOMContentLoaded", () => {

  const world = document.querySelector(".world");
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  let currentSlide = 0;

  const slides = [
    {
      title: "MOSTAR",
      subtitle: "Where stone, water and history meet."
    },
    {
      title: "STARI MOST",
      subtitle: "A bridge connecting two sides of history."
    },
    {
      title: "NERETVA",
      subtitle: "A river flowing through centuries of stories."
    }
  ];

  function changeSlide(direction) {

    currentSlide += direction;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    const title = document.querySelector(".title h1");
    const subtitle = document.querySelector(".subtitle");

    title.style.opacity = "0";
    subtitle.style.opacity = "0";

    setTimeout(() => {

      title.textContent = slides[currentSlide].title;
      subtitle.textContent = slides[currentSlide].subtitle;

      title.style.opacity = "1";
      subtitle.style.opacity = "1";

    }, 250);

  }

  nextButton.addEventListener("click", () => {
    changeSlide(1);
  });

  prevButton.addEventListener("click", () => {
    changeSlide(-1);
  });


  /* PARALLAX EFFECT */

  window.addEventListener("mousemove", (event) => {

    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    const bridge = document.querySelector(".bridge");
    const background = document.querySelector(".back-four");
    const title = document.querySelector(".title");

    if (bridge) {
      bridge.style.transform =
        `translate(${x * 10}px, ${y * 5}px)`;
    }

    if (background) {
      background.style.transform =
        `perspective(900px)
         rotateY(${-15 + x * 3}deg)
         rotateX(${5 + y * 2}deg)
         translate(${x * 5}px, ${y * 5}px)`;
    }

    if (title) {
      title.style.transform =
        `translate(${x * -5}px, ${y * -3}px)`;
    }

  });


  /* SCROLL REVEAL */

  const storySections = document.querySelectorAll(".story");

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }

      });

    },
    {
      threshold: 0.2
    }
  );

  storySections.forEach((section) => {
    observer.observe(section);
  });


  /* KEYBOARD CONTROLS */

  document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
      changeSlide(1);
    }

    if (event.key === "ArrowLeft") {
      changeSlide(-1);
    }

  });

});
