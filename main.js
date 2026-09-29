/* Big Lugg preview — GSAP + ScrollTrigger */
(function () {
  "use strict";

  document.documentElement.classList.add("js-ready");

  const reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nav = document.querySelector(".site-nav");

  function onScrollNav() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* Magnetic buttons */
  function initMagnetic() {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".magnetic").forEach((el) => {
      const strength = 18;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  function revealImmediate() {
    document.querySelectorAll(".reveal, .reveal-inner").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    revealImmediate();
    initMagnetic();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (reduced) {
    revealImmediate();
    initMagnetic();
    return;
  }

  /* Hero mount reveals */
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTl
    .to(".hero-kicker", { opacity: 1, y: 0, duration: 0.7 }, 0.15)
    .to(
      ".hero-title .reveal-inner",
      { opacity: 1, y: "0%", duration: 0.9, stagger: 0.12 },
      0.25
    )
    .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 }, 0.55)
    .to(".hero-ctas", { opacity: 1, y: 0, duration: 0.7 }, 0.7)
    .to(".scroll-hint", { opacity: 1, y: 0, duration: 0.6 }, 0.95)
    .from(
      ".float-cover",
      {
        opacity: 0,
        y: 40,
        rotate: 0,
        duration: 1,
        stagger: 0.12,
        clearProps: "opacity,y",
      },
      0.5
    );

  /* Parallax floating covers */
  gsap.to(".float-cover--1", {
    y: -80,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.to(".float-cover--2", {
    y: -140,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.to(".float-cover--3", {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  /* Hero orbs drift */
  gsap.to(".hero-orb--leaf", {
    y: 60,
    x: -40,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.to(".hero-orb--violet", {
    y: -40,
    x: 50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  /* Fire Style chapter — light pin + cover scale */
  const fireSection = document.querySelector(".chapter--fire");
  if (fireSection && window.innerWidth >= 860) {
    ScrollTrigger.create({
      trigger: fireSection,
      start: "top top+=64",
      end: "+=45%",
      pin: ".chapter-pin",
      pinSpacing: true,
    });
  }

  gsap.fromTo(
    ".fire-cover",
    { scale: 1.08 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".chapter--fire",
        start: "top bottom",
        end: "center center",
        scrub: true,
      },
    }
  );

  gsap.to(".fire-glow", {
    opacity: 0.85,
    scale: 1.15,
    ease: "none",
    scrollTrigger: {
      trigger: ".chapter--fire",
      start: "top 80%",
      end: "center center",
      scrub: true,
    },
  });

  /* Staggered section reveals */
  document.querySelectorAll(".chapter").forEach((section) => {
    const items = section.querySelectorAll(".reveal");
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true,
      },
    });
  });

  /* Album cards parallax scrub */
  document.querySelectorAll(".album-card").forEach((card) => {
    const speed = parseFloat(card.dataset.speed || "1");
    gsap.fromTo(
      card,
      { y: 40 * speed },
      {
        y: -30 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  initMagnetic();

  /* Ensure any leftover reveals become visible after load */
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
})();
