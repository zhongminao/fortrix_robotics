(function () {
  "use strict";

  /* Reveal on scroll */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* TOC active state follows scroll position */
  var chips = Array.prototype.slice.call(document.querySelectorAll(".toc-chip"));
  var founders = Array.prototype.slice.call(document.querySelectorAll(".founder"));
  if (chips.length && founders.length) {
    function setActiveChip() {
      var idx = 0;
      var marker = window.scrollY + 160;
      founders.forEach(function (f, i) {
        if (f.getBoundingClientRect().top + window.scrollY <= marker) idx = i;
      });
      chips.forEach(function (c, i) { c.classList.toggle("is-active", i === idx); });
    }
    setActiveChip();
    window.addEventListener("scroll", setActiveChip, { passive: true });
  }
})();
