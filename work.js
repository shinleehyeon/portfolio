(function () {
  document.querySelectorAll(".yan-case").forEach(function (el) {
    var track = el.querySelector(".yan-case__track");
    var slides = el.querySelectorAll(".yan-case__slide");
    var steps = el.querySelectorAll(".yan-case__step");
    if (!track || slides.length < 2) return;
    var i = 0;
    function show(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = "translateX(-" + i * 100 + "%)";
      steps.forEach(function (btn, idx) {
        btn.classList.toggle("is-on", idx === i);
      });
    }
    var prev = el.querySelector(".yan-case__nav--prev");
    var next = el.querySelector(".yan-case__nav--next");
    if (prev) prev.addEventListener("click", function () { show(i - 1); });
    if (next) next.addEventListener("click", function () { show(i + 1); });
    steps.forEach(function (btn, idx) {
      btn.addEventListener("click", function () { show(idx); });
    });
  });
})();
