/* Global dot cursor — small inverse-blend dot that trails the pointer.
   Ported from the reference portfolio's site.js. Fine-pointer devices only. */
(function initDotCursor() {
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!fine.matches) return;

  var dot = document.createElement('div');
  dot.className = 'dot-cursor';
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);
  document.documentElement.classList.add('dot-cursor-on');

  var x = window.innerWidth / 2, y = window.innerHeight / 2;
  var shown = false, raf = 0;

  var HOT = 'a,button,[role="button"],input,textarea,select,label,summary,[data-cursor="hot"]';

  function render() {
    raf = 0;
    dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
  }
  function tick() { if (!raf) raf = requestAnimationFrame(render); }

  window.addEventListener('pointermove', function(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY;
    if (!shown) { shown = true; dot.classList.add('on'); }
    dot.classList.toggle('hot', !!(e.target.closest && e.target.closest(HOT)));
    tick();
  }, { passive: true });

  window.addEventListener('pointerdown', function() { dot.classList.add('down'); });
  window.addEventListener('pointerup', function() { dot.classList.remove('down'); });
  document.addEventListener('mouseleave', function() { shown = false; dot.classList.remove('on'); });
  document.addEventListener('mouseenter', function() { shown = true; dot.classList.add('on'); });
})();
