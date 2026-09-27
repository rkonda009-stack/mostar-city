/* =========================================
   MOSTAR CINEMATIC WEBSITE
========================================= */


/* CUSTOM CURSOR */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

});


/* =========================================
   PARALLAX
========================================= */

const parallaxElements =
  document.querySelectorAll(".parallax");

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;

  parallaxElements.forEach((element) => {

    const speed =
      parseFloat(element.dataset.speed) || 0.1;

    const rect = element.getBoundingClientRect();

    if (
      rect.bottom > 0 &&
      rect.top < window.innerHeight
    ) {

      element.style.transform =
        `translateY(${scrollY * speed * -0.15}px) scale(1.08)`;

    }

  });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
  ".story-content, .bazaar-content, .bazaar-card, .river-content, .ending-content"
);

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

      }

    });

  },
  {
    threshold: 0.15
  }
);


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================
   3D HERO MOVEMENT
========================================= */

const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");

hero.addEventListener("mousemove", (e) => {

  const x =
    (e.clientX / window.innerWidth - 0.5) * 10;

  const y =
    (e.clientY / window.innerHeight - 0.5) * 10;

  heroImage.style.transform =
    `translate(${x}px, ${y}px) scale(1.08)`;

});


hero.addEventListener("mouseleave", () => {

  heroImage.style.transform =
    "translate(0,0) scale(1.08)";

});


/* =========================================
   NAVIGATION
========================================= */

const sections = [
  "#intro",
  "#bridge",
  "#bazaar",
  ".river",
  ".ending"
];


let currentSection = 0;


function nextSection() {

  currentSection++;

  if (currentSection >= sections.length) {
    currentSection = 0;
  }

  document.querySelector(sections[currentSection])
    .scrollIntoView({
      behavior: "smooth"
    });

}


function previousSection() {

  currentSection--;

  if (currentSection < 0) {
    currentSection = sections.length - 1;
  }

  document.querySelector(sections[currentSection])
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================================
   UPDATE ACTIVE LOCATION
========================================= */

const locationItems =
  document.querySelectorAll(".location");

window.addEventListener("scroll", () => {

  const scrollPosition =
    window.scrollY + window.innerHeight / 2;

  document.querySelectorAll(".section")
    .forEach((section, index) => {

      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition <
        section.offsetTop + section.offsetHeight
      ) {

        currentSection = index;

      }

    });


  locationItems.forEach((item, index) => {

    item.classList.toggle(
      "active",
      index === currentSection
    );

  });

});


/* =========================================
   IMAGE TILT
========================================= */

const cards =
  document.querySelectorAll(".bazaar-card");

cards.forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -8;

    const rotateY =
      ((x / rect.width) - 0.5) * 8;

    card.style.transform =
      `perspective(800px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-5px)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "perspective(800px) rotateX(0) rotateY(0)";

  });

});
