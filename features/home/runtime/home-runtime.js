(function () {

    if (window.__homeRuntimeCleanup) window.__homeRuntimeCleanup();
    var __cleanupFns = [];
    function __track(target, type, fn, opts) {
      target.addEventListener(type, fn, opts);
      __cleanupFns.push(function() { target.removeEventListener(type, fn, opts); });
    }
    window.__homeRuntimeCleanup = function() {
      __cleanupFns.forEach(function(fn) { fn(); });
      __cleanupFns = [];
    };

    var globeSvg = document.querySelector('.globe-svg');
    var locationLine = document.querySelector('.hero-bio--location');
    if (globeSvg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      function spinGlobe() {

        var meridians = globeSvg.querySelectorAll('.globe-meridian');
        meridians.forEach(function(m) {
          var clone = m.cloneNode(true);
          m.parentNode.replaceChild(clone, m);
        });
        globeSvg.classList.add('globe-spinning');
      }

      setTimeout(spinGlobe, 600);

      if (locationLine) {
        locationLine.addEventListener('mouseenter', spinGlobe);
      }
    }

    if (locationLine && window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var textSpan = locationLine.querySelector('span:not(.globe-wrap)');
      if (textSpan && !textSpan.dataset.flipInit) {
        textSpan.dataset.flipInit = '1';
        textSpan.classList.add('flip-text');
        var raw = textSpan.textContent;
        textSpan.textContent = '';
        for (var i = 0; i < raw.length; i++) {
          var ch = raw[i];
          var s = document.createElement('span');
          s.className = 'flip-char';
          if (ch === ' ') { s.innerHTML = '&nbsp;'; s.classList.add('flip-char--space'); }
          else s.textContent = ch;
          textSpan.appendChild(s);
        }

        var chars = textSpan.querySelectorAll('.flip-char:not(.flip-char--space)');
        var INFLUENCE_RADIUS = 34;

        var letterData = Array.prototype.map.call(chars, function(el) {
          var r = el.getBoundingClientRect();
          return {
            el: el,
            cx: r.left + r.width / 2,
            cy: r.top + r.height / 2,
            set: gsap.quickTo(el, 'rotationY', { duration: 0.35, ease: 'power2.out' })
          };
        });

        var updatePositions = function() {
          letterData.forEach(function(d) {
            var r = d.el.getBoundingClientRect();
            d.cx = r.left + r.width / 2;
            d.cy = r.top + r.height / 2;
          });
        };
        __track(window, 'scroll', updatePositions, { passive: true });
        __track(window, 'resize', updatePositions);

        var lastX = 0, lastT = 0;
        var lastDir = 1;

        __track(document, 'pointermove', function(e) {
          var now = performance.now();
          var dt = Math.max(1, now - lastT);
          var vx = (e.clientX - lastX) / dt;
          var instantDir = Math.max(-1, Math.min(1, vx * 3));

          if (Math.abs(instantDir) > 0.3) {
            lastDir = instantDir;
          }
          lastX = e.clientX;
          lastT = now;

          letterData.forEach(function(d) {
            var dx = e.clientX - d.cx;
            var dy = e.clientY - d.cy;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
            d.set(lastDir * 270 * proximity);
          });
        }, { passive: true });
      }
    }

    (function() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      var sigWrap = document.querySelector('.signature-wrap');
      var sigImg = sigWrap && sigWrap.querySelector('.signature-img');
      if (!sigWrap || !sigImg) return;

      var topPaths = null, botPaths = null;
      var animating = false;
      var animFrame = 0;
      var svgEl = null;

      function getPathBounds(d) {
        var xs = [], ys = [];
        var parts = d.match(/[MLCQSTAZHVmlcqstahvz][^MLCQSTAZHVmlcqstahvz]*/g) || [];
        parts.forEach(function(part) {
          var cmd = part[0];
          var numbers = part.slice(1).match(/-?\d+\.?\d*/g);
          if (!numbers) return;
          numbers = numbers.map(Number);
          if (cmd === 'H') { numbers.forEach(function(n) { xs.push(n); }); }
          else if (cmd === 'V') { numbers.forEach(function(n) { ys.push(n); }); }
          else if (cmd === 'Z' || cmd === 'z') { return; }
          else {
            for (var i = 0; i < numbers.length - 1; i += 2) {
              xs.push(numbers[i]);
              ys.push(numbers[i + 1]);
            }
          }
        });
        if (!xs.length || !ys.length) return null;
        var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
        var minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
        return { minX: minX, maxX: maxX, centerX: (minX + maxX) / 2, midY: (minY + maxY) / 2 };
      }

      fetch('images/signature.svg')
        .then(function(r) { return r.text(); })
        .then(function(svgText) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(svgText, 'image/svg+xml');
          var svg = doc.querySelector('svg');
          if (!svg) return;

          var allPaths = Array.from(svg.querySelectorAll('path'));
          var top = [], bot = [];

          allPaths.forEach(function(p) {
            var fill = p.getAttribute('fill') || '';
            if (fill.toLowerCase().indexOf('white') !== -1 || fill === '#ffffff' || fill === '#fff') {
              p.parentNode.removeChild(p);
              return;
            }
            var bounds = getPathBounds(p.getAttribute('d') || '');
            if (bounds) {
              var item = { el: p, centerX: bounds.centerX, maxX: bounds.maxX };

              if (bounds.midY < 24 && bounds.centerX <= 70) top.push(item);
              else bot.push(item);
            }
          });

          topPaths = top;
          botPaths = bot;

          svg.style.display = 'none';
          svg.setAttribute('width', '123');
          svg.setAttribute('height', '48');
          svg.setAttribute('aria-hidden', 'true');
          sigWrap.appendChild(svg);
          svgEl = svg;
        });

      var sigLink = document.getElementById('sidebarSig');
      if (!sigLink) return;

      sigLink.addEventListener('mouseenter', function() {
        if (!topPaths || animating) return;
        animating = true;
        cancelAnimationFrame(animFrame);

        sigImg.style.display = 'none';
        svgEl.style.display = 'block';

        topPaths.forEach(function(p) { p.el.style.opacity = '0'; });
        botPaths.forEach(function(p) { p.el.style.opacity = '0'; });

        var topDuration = 1800;
        var botDuration = 2200;
        var pauseBetween = 200;
        var totalDuration = topDuration + pauseBetween + botDuration;
        var startTime = null;

        var inkSpread = 3;

        function tick(timestamp) {
          if (!startTime) startTime = timestamp;
          var elapsed = timestamp - startTime;

          if (elapsed < topDuration) {

            var progress = elapsed / topDuration;

            var eased = progress < 0.1 ? progress * 5 * progress :
                        progress > 0.9 ? 1 - (1 - progress) * 5 * (1 - progress) :
                        progress;
            var penX = eased * 123;
            topPaths.forEach(function(p) {
              if (p.centerX <= penX + inkSpread) {
                p.el.style.opacity = '1';
              }
            });
          } else if (elapsed < topDuration + pauseBetween) {

            topPaths.forEach(function(p) { p.el.style.opacity = '1'; });
          } else if (elapsed < totalDuration) {

            topPaths.forEach(function(p) { p.el.style.opacity = '1'; });
            var botElapsed = elapsed - topDuration - pauseBetween;
            var progress = botElapsed / botDuration;
            var eased = progress < 0.1 ? progress * 5 * progress :
                        progress > 0.9 ? 1 - (1 - progress) * 5 * (1 - progress) :
                        progress;
            var penX = eased * 123;
            botPaths.forEach(function(p) {
              if (p.centerX <= penX + inkSpread) {
                p.el.style.opacity = '1';
              }
            });
          } else {

            topPaths.forEach(function(p) { p.el.style.opacity = '1'; });
            botPaths.forEach(function(p) { p.el.style.opacity = '1'; });
            animating = false;
            return;
          }

          animFrame = requestAnimationFrame(tick);
        }

        animFrame = requestAnimationFrame(tick);
      });

      var catCursorEl = document.createElement('div');
      catCursorEl.className = 'cat-cursor';
      catCursorEl.innerHTML = '<canvas class="blob-canvas" width="192" height="192"></canvas><div class="cat"><div class="ear ear--left"></div><div class="ear ear--right"></div><div class="face"><div class="eye eye--left"><div class="eye-pupil"></div></div><div class="eye eye--right"><div class="eye-pupil"></div></div><div class="muzzle"></div></div></div>';
      document.body.appendChild(catCursorEl);

      var catTimer = null;
      var checkInterval = null;
      var catActive = false;

      function moveCatCursor(e) {
        catCursorEl.style.left = e.clientX + 'px';
        catCursorEl.style.top = e.clientY + 'px';
      }

      __track(document, 'mousemove', moveCatCursor);

      var catTriggerEl = null;

      function showCatCursor(triggerEl) {
        if (catActive) return;
        catActive = true;
        catTriggerEl = triggerEl || sigLink;
        catTriggerEl.style.cursor = 'none';

        var canvas = catCursorEl.querySelector('.blob-canvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 192, 192);

        catCursorEl.classList.remove('cat-cursor--cat-visible');
        catCursorEl.classList.add('cat-cursor--visible');

        function drawBrushStroke(ctx, cx, cy, rx, ry, rot) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);
          ctx.beginPath();

          var steps = 24;
          for (var j = 0; j <= steps; j++) {
            var a = (j / steps) * Math.PI * 2;
            var jitter = 0.75 + Math.random() * 0.5;
            var x = Math.cos(a) * rx * jitter;
            var y = Math.sin(a) * ry * jitter;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        var strokes = [];

        for (var i = 0; i < 5; i++) {
          var angle = Math.random() * Math.PI * 2;
          var dist = Math.random() * 12;
          strokes.push({
            cx: 96 + Math.cos(angle) * dist,
            cy: 96 + Math.sin(angle) * dist,
            rx: 40 + Math.random() * 30,
            ry: 25 + Math.random() * 20,
            rot: Math.random() * Math.PI,
            type: 'brush'
          });
        }

        var directions = [
          { a: -Math.PI * 0.6, d: 30 },
          { a: -Math.PI * 0.4, d: 30 },
          { a: -Math.PI * 0.5, d: 20 },
          { a: 0, d: 25 },
          { a: Math.PI, d: 25 },
          { a: Math.PI * 0.5, d: 15 },
          { a: Math.PI * 0.7, d: 20 },
          { a: -Math.PI * 0.2, d: 25 },
        ];
        for (var i = 0; i < directions.length; i++) {
          var dir = directions[i];
          strokes.push({
            cx: 96 + Math.cos(dir.a) * dir.d,
            cy: 96 + Math.sin(dir.a) * dir.d,
            rx: 22 + Math.random() * 18,
            ry: 14 + Math.random() * 12,
            rot: dir.a + (Math.random() - 0.5) * 0.5,
            type: 'brush'
          });
        }

        for (var i = 0; i < 14; i++) {
          var angle = Math.random() * Math.PI * 2;
          var dist = 38 + Math.random() * 28;
          strokes.push({
            cx: 96 + Math.cos(angle) * dist,
            cy: 96 + Math.sin(angle) * dist,
            rx: 5 + Math.random() * 10,
            ry: 3 + Math.random() * 7,
            rot: Math.random() * Math.PI,
            type: 'brush'
          });
        }

        for (var i = 0; i < 16; i++) {
          var angle = Math.random() * Math.PI * 2;
          var dist = 45 + Math.random() * 40;
          var r = 1 + Math.random() * 3;
          strokes.push({
            cx: 96 + Math.cos(angle) * dist,
            cy: 96 + Math.sin(angle) * dist,
            rx: r, ry: r,
            rot: 0,
            type: 'dot'
          });
        }

        var numStrokes = strokes.length;

        var strokeIndex = 0;
        var revealStart = null;
        var strokeInterval = 30;
        var totalDuration = numStrokes * strokeInterval;
        var catShowTime = totalDuration * 0.7;
        var catShown = false;

        function drawBlob(ts) {
          if (!catActive) return;
          if (!revealStart) revealStart = ts;
          var elapsed = ts - revealStart;
          var targetIndex = Math.min(Math.floor(elapsed / strokeInterval), strokes.length);

          ctx.fillStyle = '#161616';
          while (strokeIndex < targetIndex) {
            var s = strokes[strokeIndex];
            if (s.type === 'brush') {
              drawBrushStroke(ctx, s.cx, s.cy, s.rx, s.ry, s.rot);
            } else {

              ctx.beginPath();
              ctx.arc(s.cx, s.cy, s.rx, 0, Math.PI * 2);
              ctx.fill();
            }
            strokeIndex++;
          }

          if (!catShown && elapsed >= catShowTime) {
            catShown = true;
            catCursorEl.classList.add('cat-cursor--cat-visible');
          }

          if (strokeIndex < strokes.length) {
            requestAnimationFrame(drawBlob);
          }
        }

        requestAnimationFrame(drawBlob);
      }

      function hideCatCursor() {
        catActive = false;
        catCursorEl.classList.remove('cat-cursor--visible');
        catCursorEl.classList.remove('cat-cursor--cat-visible');
        var canvas = catCursorEl.querySelector('.blob-canvas');
        if (canvas) canvas.getContext('2d').clearRect(0, 0, 192, 192);
        if (catTriggerEl) catTriggerEl.style.cursor = '';
        catTriggerEl = null;
      }

      window._showCatCursor = showCatCursor;
      window._hideCatCursor = hideCatCursor;

      sigLink.addEventListener('mouseenter', function() {
        clearTimeout(catTimer);
        clearInterval(checkInterval);
        hideCatCursor();

        checkInterval = setInterval(function() {
          if (!animating && svgEl && svgEl.style.display === 'block') {
            clearInterval(checkInterval);
            catTimer = setTimeout(function() {
              if (sigLink.matches(':hover')) {
                showCatCursor();
              }
            }, 500);
          }
        }, 200);
      });

      sigLink.addEventListener('mouseleave', function() {
        if (!svgEl) return;
        clearTimeout(catTimer);
        clearInterval(checkInterval);
        hideCatCursor();
        cancelAnimationFrame(animFrame);
        sigImg.style.display = 'block';
        svgEl.style.display = 'none';
        animating = false;
      });
    }());

    const copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('shinlee7878@gmail.com').then(() => {
          const label = copyBtn.querySelector('.cta-button-label');
          const original = label.textContent;
          label.textContent = 'Copied!';
          setTimeout(() => { label.textContent = original; }, 2000);
        });
      });
    }
;

    (function() {
      var testimonials = [
        {
          name: 'Mikhail Dubov',
          role: 'Founder @ Chattermill',
          photo: 'images/mikhail-dubov.png',
          quote: '<p>\u201cGregory is the perfect Founding Designer, with meticulous attention to details, full design ownership end to end from idea generation to user research to of course implementation and even quality control.</p><p>You would be hard pressed to find someone else who cares about the product they are working as much.</p><p>Not to mention one of the best work ethics I\u2019ve seen and huge experience building B2B products.\u201d</p>'
        },
        {
          name: 'Michael Hood',
          role: 'Cofounder @ Voiceflow.com',
          photo: 'images/michael-hood.jpg',
          quote: '<p>\u201cGregory is an incredibly talented UI/UX designer and design system architect. His creative output consistently exceeds expectations as his passion for product designs is unmatched.</p><p>Gregory\u2019s ability to work quickly, with an exceptional level of accuracy is what makes him such a valuable member, and leader of any product focused design team.\u201d</p>'
        },
        {
          name: 'Ivan Liagushkin',
          role: 'Engineering @ Twain',
          photo: 'images/ivan-liagushkin.jpg',
          quote: '<p>\u201cGregory is a rare combination of product thinker, skilled designer, and hands-on executor. Every feature ships polished and intentional, not just functional.</p><p>He\u2019s also deeply technical. He tracks new tools and market shifts, understands engineering constraints, and speaks implementation.</p><p>He follows through with QA and research, making sure the feature works as designed from every angle.\u201d</p>'
        },
        {
          name: 'Aleksandr Morozov',
          role: 'Frontend Engineer @ Twain',
          photo: 'images/aleksandr-morozov.jpg',
          quote: '<p>\u201cGregory goes far beyond visuals and holds a very high bar for product logic, user needs, and design.</p><p>His level of precision and expectations can make development more demanding, but it consistently leads to a much stronger result.</p><p>As an engineer, I especially value that he understands implementation and stays involved until the feature works as intended, not just looks right.\u201d</p>'
        },
        {
          name: 'Thomas Metcalfe',
          role: 'Founder, ML Engineer',
          photo: 'images/thomas-metcalfe.jpg',
          quote: '<p>\u201cThere\u2019s no stronger endorsement than working with someone twice. I invited Gregory to Twain after Chattermill because his attention to detail and design instincts are genuinely unparalleled.</p><p>With no established patterns, he designed generative AI products when the category barely existed.</p><p>He\u2019s the kind of designer you trust completely with your product.\u201d</p>'
        }
      ];

      if (!document.getElementById('testimonialCard')) return;

      var idx = 0;
      var avatar = document.getElementById('testimonialAvatar');
      var nameEl = document.getElementById('testimonialName');
      var roleEl = document.getElementById('testimonialRole');
      var quoteEl = document.getElementById('testimonialQuote');
      var prevBtn = document.getElementById('testimonialPrev');
      var nextBtn = document.getElementById('testimonialNext');

      function updateButtons() {
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx === testimonials.length - 1;
      }

      var avatarWrap = document.querySelector('.sp-testimonial__avatar');
      var pixelGrid = null;
      var GRID = 8;

      function setupPixelGrid() {
        pixelGrid = document.createElement('div');
        pixelGrid.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:36px;overflow:hidden;z-index:2;';
        avatarWrap.style.position = 'relative';

        for (var r = 0; r < GRID; r++) {
          for (var c = 0; c < GRID; c++) {
            var px = document.createElement('div');
            var size = 100 / GRID;
            px.style.cssText = 'position:absolute;display:none;background:#D1E3FF;';
            px.style.width = size + '%';
            px.style.height = size + '%';
            px.style.left = (c * size) + '%';
            px.style.top = (r * size) + '%';
            pixelGrid.appendChild(px);
          }
        }
        avatarWrap.appendChild(pixelGrid);
      }
      setupPixelGrid();

      function pixelTransition(newSrc, newAlt, callback) {
        var pixels = pixelGrid.querySelectorAll('div');
        var total = pixels.length;
        var indices = [];
        for (var i = 0; i < total; i++) indices.push(i);

        for (var i = total - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
        }

        var stepDur = 300;
        var perPixel = stepDur / total;

        indices.forEach(function(pi, i) {
          setTimeout(function() { pixels[pi].style.display = 'block'; }, i * perPixel);
        });

        setTimeout(function() {
          avatar.src = newSrc;
          avatar.alt = newAlt;

          for (var i = total - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
          }

          indices.forEach(function(pi, i) {
            setTimeout(function() { pixels[pi].style.display = 'none'; }, i * perPixel);
          });

          if (callback) setTimeout(callback, stepDur);
        }, stepDur);
      }

      var isTransitioning = false;

      function showTestimonial(newIdx, direction) {
        if (newIdx < 0 || newIdx >= testimonials.length || newIdx === idx || isTransitioning) return;
        isTransitioning = true;
        idx = newIdx;
        var t = testimonials[idx];
        updateButtons();

        var fadeEls = [nameEl, roleEl, quoteEl];
        var outShift = direction > 0 ? -8 : 8;
        var inShift = direction > 0 ? 8 : -8;
        fadeEls.forEach(function(el) {
          el.style.transition = 'opacity 0.18s cubic-bezier(0.25, 1, 0.5, 1), transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)';
          el.style.opacity = '0';
          el.style.transform = 'translateX(' + outShift + 'px)';
        });

        pixelTransition(t.photo, t.name, function() {
          isTransitioning = false;
        });

        setTimeout(function() {
          nameEl.textContent = t.name;
          roleEl.textContent = t.role;
          quoteEl.innerHTML = t.quote;

          fadeEls.forEach(function(el) {
            el.style.transition = 'none';
            el.style.transform = 'translateX(' + inShift + 'px)';
            el.style.opacity = '0';

            void el.offsetWidth;
            el.style.transition = 'opacity 0.32s cubic-bezier(0.25, 1, 0.5, 1), transform 0.45s cubic-bezier(0.32, 1.2, 0.5, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
          });
        }, 180);
      }

      function setupButton(btn, getIdx, dir) {
        btn.addEventListener('mousedown', function(e) {
          if (btn.disabled) return;
          btn.classList.add('sp-testimonial__btn--pressed');
        });
        btn.addEventListener('mouseup', function() {
          if (btn.disabled) return;
          btn.classList.remove('sp-testimonial__btn--pressed');

          btn.classList.remove('is-clicking');
          void btn.offsetWidth;
          btn.classList.add('is-clicking');
          setTimeout(function() { btn.classList.remove('is-clicking'); }, 720);
          showTestimonial(getIdx(), dir);
        });
        btn.addEventListener('mouseleave', function() {
          btn.classList.remove('sp-testimonial__btn--pressed');
        });
      }

      setupButton(prevBtn, function() { return idx - 1; }, -1);
      setupButton(nextBtn, function() { return idx + 1; }, 1);

      var dotsContainer = document.getElementById('testimonialDots');
      var dots = [];
      for (var di = 0; di < testimonials.length; di++) {
        var dot = document.createElement('button');
        dot.className = 'sp-testimonial__dot' + (di === 0 ? ' sp-testimonial__dot--active' : '');
        dot.setAttribute('aria-label', 'Testimonial ' + (di + 1));
        dot.dataset.idx = di;
        dotsContainer.appendChild(dot);
        dots.push(dot);
      }

      dotsContainer.addEventListener('click', function(e) {
        var dot = e.target.closest('.sp-testimonial__dot');
        if (!dot) return;
        var target = parseInt(dot.dataset.idx, 10);
        if (target !== idx) showTestimonial(target, target > idx ? 1 : -1);
      });

      function updateDots() {
        dots.forEach(function(d, i) {
          d.classList.toggle('sp-testimonial__dot--active', i === idx);
        });
      }

      var origUpdateButtons = updateButtons;
      updateButtons = function() {
        origUpdateButtons();
        updateDots();
      };

      var card = document.getElementById('testimonialCard');
      var swipeStartX = 0;
      var swipeStartY = 0;
      var swiping = false;

      card.addEventListener('touchstart', function(e) {
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
        swiping = true;
      }, { passive: true });

      card.addEventListener('touchmove', function(e) {
        if (!swiping) return;
        var dx = e.touches[0].clientX - swipeStartX;
        var dy = e.touches[0].clientY - swipeStartY;

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
          e.preventDefault();
        }
      }, { passive: false });

      card.addEventListener('touchend', function(e) {
        if (!swiping) return;
        swiping = false;
        var dx = e.changedTouches[0].clientX - swipeStartX;
        var dy = e.changedTouches[0].clientY - swipeStartY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0 && idx < testimonials.length - 1) {
            showTestimonial(idx + 1, 1);
          } else if (dx > 0 && idx > 0) {
            showTestimonial(idx - 1, -1);
          }
        }
      }, { passive: true });

      updateButtons();
    })();
;

    (function() {
      var studies = document.querySelectorAll('.case-study');
      if (studies.length < 2) return;

      studies.forEach(function(card, i) {
        card.style.zIndex = i + 1;
      });

      function setStickyTops() {
        var viewH = window.innerHeight;
        for (var i = 0; i < studies.length; i++) {
          var cardH = studies[i].offsetHeight;
          if (cardH <= viewH - 56 - 24) {

            studies[i].style.top = '56px';
          } else {

            studies[i].style.top = (viewH - cardH - 24) + 'px';
          }
        }
      }
      setStickyTops();
      __track(window, 'load', setStickyTops);
      __track(window, 'resize', setStickyTops);

      function onScroll() {
        for (var i = 0; i < studies.length - 1; i++) {
          var card = studies[i];
          var next = studies[i + 1];
          var cardRect = card.getBoundingClientRect();
          var nextRect = next.getBoundingClientRect();

          var overlap = cardRect.bottom - nextRect.top;
          var cardH = cardRect.height;
          var progress = Math.max(0, Math.min(1, overlap / cardH));

          var opacity = Math.max(0, 1 - progress);
          var blur = progress * 6;
          var scale = 1 - progress * 0.07;

          card.style.opacity = opacity.toFixed(3);
          card.style.filter = blur > 0.2 ? 'blur(' + blur.toFixed(1) + 'px)' : 'none';
          card.style.transform = 'scale(' + scale.toFixed(4) + ')';

          var padTop = 72 - progress * 72;
          next.style.paddingTop = Math.max(0, padTop).toFixed(1) + 'px';
        }
      }

      __track(window, 'scroll', onScroll, { passive: true });
      onScroll();
      window.dispatchEvent(new Event('home-layout-ready'));
    })();

    (function() {
      return;

      var services = [
        '0→1 product design',
        'NLP & generative AI',
        'MVP scoping',
        'Product strategy',
        'QA ownership',
        'User research',
        'Direction',
        'Fundraising support',
        'Eng partnership',
        'Business analysis'
      ];

      var N = services.length;
      var STEP_DEG = 12;

      var slots = [
        { left: 15.5, top: -67.9,  w: 72,  blur: 4 },
        { left: 34.8, top: -93.3,  w: 153, blur: 4 },
        { left: 48.6, top: -27.9,  w: 136, blur: 3 },
        { left: 58.8, top:  20.3,  w: 148, blur: 2 },
        { left: 64.0, top:  74.1,  w: 205, blur: 0 },
        { left: 58.1, top:  98.8,  w: 169, blur: 2 },
        { left: 47.6, top: 122.9,  w: 115, blur: 3 },
        { left: 32.6, top: 145.3,  w: 130, blur: 4 },
        { left: 13.8, top: 165.1,  w: 102, blur: 4 },
        { left: -6.4, top: 180.8,  w: 79,  blur: 5 },
      ];
      var ACTIVE_SLOT = 4;

      var VISIBLE = slots.length;
      var items = [];
      for (var i = 0; i < VISIBLE; i++) {
        var el = document.createElement('span');
        el.className = 'sp-wheel__item';
        container.appendChild(el);
        items.push(el);
      }

      var currentServiceIdx = 0;

      function render(serviceIdx, interpolation) {

        var t = interpolation || 0;

        for (var i = 0; i < VISIBLE; i++) {
          var el = items[i];

          var offset = i - ACTIVE_SLOT;
          var svcIdx = ((serviceIdx + offset) % N + N) % N;
          el.textContent = services[svcIdx];

          var fromSlot = slots[i];
          var toSlot = slots[i - 1];

          var left, top, w, blur;
          if (toSlot && t > 0) {
            left = fromSlot.left + (toSlot.left - fromSlot.left) * t;
            top  = fromSlot.top  + (toSlot.top  - fromSlot.top)  * t;
            w    = fromSlot.w    + (toSlot.w    - fromSlot.w)    * t;
            blur = fromSlot.blur + (toSlot.blur - fromSlot.blur) * t;
          } else {
            left = fromSlot.left;
            top  = fromSlot.top;
            w    = fromSlot.w;
            blur = fromSlot.blur;
          }

          el.style.left = left.toFixed(1) + 'px';
          el.style.top  = top.toFixed(1)  + 'px';
          el.style.width = w.toFixed(0) + 'px';
          el.style.filter = blur > 0.3 ? 'blur(' + blur.toFixed(1) + 'px)' : 'none';

          var distFromActive = Math.abs(i - ACTIVE_SLOT + t);
          if (distFromActive < 0.5) {
            el.classList.add('sp-wheel__item--active');
          } else {
            el.classList.remove('sp-wheel__item--active');
            el.style.opacity = '0.4';
          }
        }
      }

      render(currentServiceIdx, 0);

      function advance() {
        var from = currentServiceIdx;
        var start = performance.now();
        var duration = 600;

        function tick(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);

          if (progress < 1) {
            render(from, eased);
            requestAnimationFrame(tick);
          } else {
            currentServiceIdx = (from + 1) % N;
            render(currentServiceIdx, 0);
          }
        }
        requestAnimationFrame(tick);
      }

      setInterval(advance, 2000);
    })();
;

    (function() {
      var btn = document.getElementById('sidebarCopyEmail');
      if (!btn) return;
      var email = 'shinlee7878@gmail.com';

      function createSparks(x, y) {
        var count = 8;
        var color = 'var(--accent-500)';
        var dur = 400;
        var radius = 20;
        var size = 8;

        for (var i = 0; i < count; i++) {
          var angle = (Math.PI * 2 / count) * i;
          var spark = document.createElement('div');
          spark.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;width:' + size + 'px;height:2px;background:' + color + ';border-radius:1px;pointer-events:none;z-index:9999;transform-origin:left center;transform:rotate(' + (angle * 180 / Math.PI) + 'deg);opacity:1;transition:all ' + dur + 'ms cubic-bezier(0.25,0.1,0.25,1);';
          document.body.appendChild(spark);

          spark.offsetWidth;

          spark.style.transform = 'rotate(' + (angle * 180 / Math.PI) + 'deg) translateX(' + radius + 'px)';
          spark.style.opacity = '0';
          spark.style.width = '2px';

          (function(s) {
            setTimeout(function() { if (s.parentNode) s.parentNode.removeChild(s); }, dur + 50);
          })(spark);
        }
      }

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(function() {
          createSparks(e.clientX, e.clientY);
          btn.textContent = 'Copied';
          btn.style.color = 'var(--text)';
          setTimeout(function() {
            btn.textContent = 'Email';
            btn.style.color = '';
          }, 2000);
        });
      });
    })();
;

    (function() {
      var wrap = document.querySelector('.case-study__video-border');
      if (!wrap) return;
      var video = wrap.querySelector('video');
      if (!video) return;

      video.addEventListener('timeupdate', function() {
        if (video.currentTime >= 3) {
          wrap.classList.add('case-study__video-border--border-visible');
        } else {
          wrap.classList.remove('case-study__video-border--border-visible');
        }
      });

      video.addEventListener('seeked', function() {
        if (video.currentTime < 3) {
          wrap.classList.remove('case-study__video-border--border-visible');
        }
      });
    })();
;

    (function() {
      var articles = document.querySelectorAll('.pub-article');
      var amp = 4.25;
      function lerp(a, b, t) { return a + (b - a) * t; }

      articles.forEach(function(article) {
        var tilt = article.querySelector('.pub-article__tilt');
        var logo = article.querySelector('.pub-article__logo');
        if (!tilt || !logo) return;

        var rx = 0, ry = 0, lx = 0, ly = 0, lr = 0;
        var trx = 0, try_ = 0, tlx = 0, tly = 0, tlr = 0;
        var raf = null, hov = false;

        var squareSize = 148;
        var logoSize = 56;
        var maxTravel = squareSize - logoSize;
        var logoHomeX = 0;
        var logoHomeY = maxTravel;
        var logoRadius = logoSize / 2;

        function tick() {
          rx = lerp(rx, trx, 0.04);
          ry = lerp(ry, try_, 0.04);
          lx = lerp(lx, tlx, 0.008);
          ly = lerp(ly, tly, 0.008);
          lr = lerp(lr, tlr, 0.008);

          if (!hov && Math.abs(rx-trx)<0.01 && Math.abs(ry-try_)<0.01 && Math.abs(lx-tlx)<0.1 && Math.abs(ly-tly)<0.1) {
            rx=trx; ry=try_; lx=tlx; ly=tly; lr=tlr;
            tilt.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg)';
            logo.style.transform = 'translate(0,0) rotate(0deg)';
            raf = null; return;
          }

          tilt.style.transform = 'perspective(300px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
          logo.style.transform = 'translate(' + lx.toFixed(1) + 'px,' + ly.toFixed(1) + 'px) rotate(' + lr.toFixed(1) + 'deg)';
          raf = requestAnimationFrame(tick);
        }

        article.addEventListener('mousemove', function(e) {
          var r = tilt.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;

          trx = -y * amp;
          try_ = x * amp;

          var rawX = x * maxTravel * 0.15;
          tlx = Math.max(-logoHomeX, Math.min(maxTravel - logoHomeX, rawX));
          tly = 0;

          tlr = (tlx / (logoSize / 2)) * (180 / Math.PI);

          if (!raf) raf = requestAnimationFrame(tick);
        });

        article.addEventListener('mouseenter', function() {
          hov = true;
          if (!raf) raf = requestAnimationFrame(tick);
        });

        article.addEventListener('mouseleave', function() {
          hov = false;
          trx = 0; try_ = 0; tlx = 0; tly = 0; tlr = 0;
          if (!raf) raf = requestAnimationFrame(tick);
        });
      });
    })();
;

    (function() {

      var videos = document.querySelectorAll('video');
      if (videos.length) {
        var videoObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.play().catch(function() {});
            } else {
              entry.target.pause();
            }
          });
        }, { threshold: 0 });
        videos.forEach(function(v) { videoObserver.observe(v); });
      }

      var animated = document.querySelectorAll('.sp-card--services, .case-study__image-wrap');
      if (animated.length) {
        var animObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.style.animationPlayState = '';
            } else {
              entry.target.style.animationPlayState = 'paused';
            }
          });
        }, { threshold: 0 });
        animated.forEach(function(el) { animObserver.observe(el); });
      }

      var servicesCard = document.querySelector('.sp-card--services');
      if (servicesCard && window.wheelPause !== undefined) {
        var wheelObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (typeof window.wheelSetPaused === 'function') {
              window.wheelSetPaused(!entry.isIntersecting);
            }
          });
        }, { threshold: 0 });
        wheelObserver.observe(servicesCard);
      }
    })();
;

    (function() {
      var btn = document.getElementById('aboutCopyEmail');
      if (!btn) return;
      var email = 'shinlee7878@gmail.com';
      var busy = false;

      var copyImg = btn.querySelector('img');
      var checkSrc = 'images/icon-check.svg';
      var copySrc = copyImg.src;

      var preload = new Image();
      preload.src = checkSrc;

      function createSparks(x, y) {
        var count = 8;
        var color = 'var(--accent-500)';
        var dur = 400;
        var radius = 20;
        var size = 8;

        for (var i = 0; i < count; i++) {
          var angle = (Math.PI * 2 / count) * i;
          var spark = document.createElement('div');
          spark.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;width:' + size + 'px;height:2px;background:' + color + ';border-radius:1px;pointer-events:none;z-index:9999;transform-origin:left center;transform:rotate(' + (angle * 180 / Math.PI) + 'deg);opacity:1;transition:all ' + dur + 'ms cubic-bezier(0.25,0.1,0.25,1);';
          document.body.appendChild(spark);
          spark.offsetWidth;
          spark.style.transform = 'rotate(' + (angle * 180 / Math.PI) + 'deg) translateX(' + radius + 'px)';
          spark.style.opacity = '0';
          spark.style.width = '2px';
          (function(s) {
            setTimeout(function() { if (s.parentNode) s.parentNode.removeChild(s); }, dur + 50);
          })(spark);
        }
      }

      btn.addEventListener('click', function(e) {
        if (busy) return;
        busy = true;

        navigator.clipboard.writeText(email).then(function() {
          createSparks(e.clientX, e.clientY);

          copyImg.style.transition = 'transform 0.2s cubic-bezier(0.4,0,0.2,1), opacity 0.15s ease';
          copyImg.style.transform = 'scale(0.3) rotate(-90deg)';
          copyImg.style.opacity = '0';

          setTimeout(function() {

            copyImg.src = checkSrc;

            copyImg.style.transition = 'none';
            copyImg.style.transform = 'scale(0.3) rotate(90deg)';
            copyImg.style.opacity = '0';
            copyImg.offsetWidth;
            copyImg.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease';
            copyImg.style.transform = 'scale(1) rotate(0deg)';
            copyImg.style.opacity = '1';
          }, 200);

          setTimeout(function() {
            copyImg.style.transition = 'transform 0.2s cubic-bezier(0.4,0,0.2,1), opacity 0.15s ease';
            copyImg.style.transform = 'scale(0.3) rotate(-90deg)';
            copyImg.style.opacity = '0';

            setTimeout(function() {
              copyImg.src = copySrc;
              copyImg.style.transition = 'none';
              copyImg.style.transform = 'scale(0.3) rotate(90deg)';
              copyImg.style.opacity = '0';
              copyImg.offsetWidth;
              copyImg.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease';
              copyImg.style.transform = 'scale(1) rotate(0deg)';
              copyImg.style.opacity = '1';
              busy = false;
            }, 200);
          }, 2200);
        });
      });
    })();
;
    (function() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!window.gsap || !window.DrawSVGPlugin || !window.CustomEase) return;
      gsap.registerPlugin(DrawSVGPlugin, CustomEase);

      var section = document.querySelector('.logos-section');
      if (!section) return;

      var dividers = section.querySelectorAll('.logos-section__divider line');
      var leftDivider = dividers[0];
      var rightDivider = dividers[1];
      var title = section.querySelector('.logos-section__title');
      var logoPaths = section.querySelectorAll('.logos-svg path');

      var DURATION = 1.2;

      gsap.set(leftDivider, { drawSVG: '100% 100%' });
      gsap.set(rightDivider, { drawSVG: '0% 0%' });
      gsap.set(title, { clipPath: 'inset(0 100% 0 0)', opacity: 0 });
      gsap.set(logoPaths, {
        fillOpacity: 0,
        strokeOpacity: 1,
        drawSVG: 0
      });

      var splitEase = CustomEase.create('logosSplitEase', 'M0,0 L0.4,0.5 L1,1');

      var played = false;
      var play = function() {
        if (played) return;
        played = true;

        var tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });

        tl.to(leftDivider, { drawSVG: '0% 100%', duration: DURATION }, 0);
        tl.to(rightDivider, { drawSVG: '0% 100%', duration: DURATION }, 0);

        tl.to(title, { opacity: 1, duration: DURATION * 0.2, ease: 'power1.out' }, 0);
        tl.to(title, { clipPath: 'inset(0 0% 0 0)', duration: DURATION }, 0);

        tl.to(logoPaths, {
          drawSVG: '0% 100%',
          duration: DURATION,
          stagger: 0.008,
          ease: 'power2.inOut'
        }, 0);
        tl.to(logoPaths, {
          fillOpacity: 1,
          duration: DURATION * 0.55,
          ease: 'power2.out'
        }, DURATION * 0.45);
        tl.to(logoPaths, {
          strokeOpacity: 0,
          duration: DURATION * 0.35,
          ease: 'power1.out'
        }, DURATION * 0.65);

        var driver = { p: 0 };
        gsap.to(driver, {
          p: 1,
          duration: tl.duration() * (5 / 6),
          ease: splitEase,
          onUpdate: function() { tl.progress(driver.p); }
        });
      };

      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.intersectionRatio >= 0.8) {
            play();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.8 });

      observer.observe(section);
    })();

    (function() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!window.gsap || !window.Draggable || !window.Flip) return;
      gsap.registerPlugin(Draggable, Flip);
      if (window.InertiaPlugin) gsap.registerPlugin(InertiaPlugin);

      var pill = document.querySelector('.about__ai-pill');
      if (!pill) return;
      var items = Array.prototype.slice.call(pill.querySelectorAll('.about__icon-btn'));
      if (!items.length) return;

      var computeVisibility = function(c) {
        var cRect = c.getBoundingClientRect();
        var pRect = pill.getBoundingClientRect();
        var visW = Math.max(0, Math.min(cRect.right, pRect.right) - Math.max(cRect.left, pRect.left));
        var visH = Math.max(0, Math.min(cRect.bottom, pRect.bottom) - Math.max(cRect.top, pRect.top));
        var total = cRect.width * cRect.height;
        return total > 0 ? (visW * visH) / total : 0;
      };
      var updateVisibility = function(c) { c.style.opacity = computeVisibility(c); };

      var START_X = -160;
      var ROLL_ROTATION = -360;
      items.forEach(function(c) {
        gsap.set(c, { x: START_X, rotation: ROLL_ROTATION, opacity: 0, willChange: 'transform' });
      });

      var entrancePlayed = false;
      var playEntrance = function() {
        if (entrancePlayed) return;
        entrancePlayed = true;
        var tl = gsap.timeline();
        var seq = items.slice().reverse();
        var DURATION = 0.7;
        var STAGGER = 0.32;
        seq.forEach(function(c, i) {
          var startT = i * STAGGER;
          tl.to(c, {
            x: 0,
            rotation: 0,
            duration: DURATION,
            ease: 'power2.out',
            onUpdate: function() { updateVisibility(c); }
          }, startT);

          if (i > 0) {
            var rightNeighbor = seq[i - 1];
            var arrivalT = startT + DURATION * 0.9;
            tl.to(rightNeighbor, {
              x: '+=1',
              duration: 0.08,
              ease: 'sine.out',
              onUpdate: function() { updateVisibility(rightNeighbor); }
            }, arrivalT)
              .to(rightNeighbor, {
                x: 0,
                duration: 0.25,
                ease: 'power2.out',
                onUpdate: function() { updateVisibility(rightNeighbor); }
              }, '>');
          }
        });
      };

      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.intersectionRatio >= 0.5) {
            playEntrance();
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      obs.observe(pill);

      var SLOT_SHIFT = 52;
      var siblingShifts = new Map();

      items.forEach(function(item) {
        Draggable.create(item, {
          type: 'x,y',
          inertia: false,
          cursor: 'grab',
          activeCursor: 'grabbing',
          minimumMovement: 4,
          onDragStart: function() {
            this.target.classList.add('is-dragging');
            gsap.set(this.target, { zIndex: 10 });
            this._targetSlot = Array.prototype.indexOf.call(pill.children, this.target);
          },
          onDrag: function() {
            var me = this.target;
            updateVisibility(me);

            var meRect = me.getBoundingClientRect();
            var meCenterX = meRect.left + meRect.width / 2;
            var allChildren = Array.prototype.slice.call(pill.children);
            var myIdx = allChildren.indexOf(me);

            var targetSlot = myIdx;
            allChildren.forEach(function(sib, idx) {
              if (sib === me) return;
              var sibRect = sib.getBoundingClientRect();
              var sibCenter = sibRect.left + sibRect.width / 2;
              if (idx > myIdx && meCenterX > sibCenter && idx > targetSlot) {
                targetSlot = idx;
              }
              if (idx < myIdx && meCenterX < sibCenter && idx < targetSlot) {
                targetSlot = idx;
              }
            });
            this._targetSlot = targetSlot;

            allChildren.forEach(function(sib, idx) {
              if (sib === me) return;
              var wantShift = 0;
              if (myIdx < targetSlot && idx > myIdx && idx <= targetSlot) {
                wantShift = -SLOT_SHIFT;
              } else if (myIdx > targetSlot && idx >= targetSlot && idx < myIdx) {
                wantShift = SLOT_SHIFT;
              }
              var current = siblingShifts.get(sib) || 0;
              if (current !== wantShift) {
                siblingShifts.set(sib, wantShift);
                gsap.to(sib, {
                  x: wantShift,
                  duration: 0.22,
                  ease: 'power2.out',
                  overwrite: 'auto'
                });
              }
            });
          },
          onDragEnd: function() {
            var me = this.target;
            me.classList.remove('is-dragging');

            var allChildren = Array.prototype.slice.call(pill.children);
            var myIdx = allChildren.indexOf(me);
            var targetSlot = (typeof this._targetSlot === 'number') ? this._targetSlot : myIdx;

            if (targetSlot !== myIdx) {

              var state = Flip.getState(allChildren);

              var orderWithoutMe = allChildren.slice();
              orderWithoutMe.splice(myIdx, 1);
              orderWithoutMe.splice(targetSlot, 0, me);
              orderWithoutMe.forEach(function(el) { pill.appendChild(el); });

              allChildren.forEach(function(el) {
                gsap.killTweensOf(el);
                gsap.set(el, { x: 0, y: 0 });
                siblingShifts.set(el, 0);
              });

              Flip.from(state, {
                duration: 0.42,
                ease: 'power2.out',
                onUpdate: function() { allChildren.forEach(updateVisibility); },
                onComplete: function() {
                  me.style.zIndex = '';
                  var d = Draggable.get(me);
                  if (d) d.update();
                  allChildren.forEach(updateVisibility);
                }
              });
            } else {

              gsap.to(me, {
                x: 0, y: 0,
                duration: 0.38,
                ease: 'power2.out',
                onUpdate: function() { updateVisibility(me); },
                onComplete: function() {
                  me.style.zIndex = '';
                  var d = Draggable.get(me);
                  if (d) d.update();
                }
              });
              allChildren.forEach(function(el) {
                if (el !== me && (siblingShifts.get(el) || 0) !== 0) {
                  gsap.to(el, {
                    x: 0,
                    duration: 0.38,
                    ease: 'power2.out',
                    onUpdate: function() { updateVisibility(el); }
                  });
                  siblingShifts.set(el, 0);
                }
              });
            }
            this._targetSlot = undefined;
          }
        });
      });
    })();
;
(function() {
      var btn = document.getElementById('mobileMenuCopyEmail');
      if (!btn) return;
      function createSparks(x, y) {
        var count = 8;
        var color = 'var(--accent-500)';
        var dur = 400;
        var radius = 20;
        var size = 8;
        for (var i = 0; i < count; i++) {
          var angle = (Math.PI * 2 / count) * i;
          var spark = document.createElement('div');
          spark.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;width:' + size + 'px;height:2px;background:' + color + ';border-radius:1px;pointer-events:none;z-index:9999;transform-origin:left center;transform:rotate(' + (angle * 180 / Math.PI) + 'deg);opacity:1;transition:all ' + dur + 'ms cubic-bezier(0.25,0.1,0.25,1);';
          document.body.appendChild(spark);
          spark.offsetWidth;
          spark.style.transform = 'rotate(' + (angle * 180 / Math.PI) + 'deg) translateX(' + radius + 'px)';
          spark.style.opacity = '0';
          spark.style.width = '2px';
          (function(s) { setTimeout(function() { if (s.parentNode) s.parentNode.removeChild(s); }, dur + 50); })(spark);
        }
      }

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        navigator.clipboard.writeText('shinlee7878@gmail.com').then(function() {
          createSparks(e.clientX, e.clientY);
          btn.textContent = 'Copied';
          btn.style.color = 'var(--text)';
          setTimeout(function() { btn.textContent = 'Email'; btn.style.color = ''; }, 2000);
        });
      });
    })();
;

    (function() {
      var container = document.getElementById('aboutPhotos');
      var photos = container ? container.querySelectorAll('.about__photo') : [];

      photos.forEach(function(photo) {
        photo.classList.add('about__photo--animated');
      });

      var heroPhoto = document.getElementById('aboutHeroPhoto');
      if (heroPhoto) {
        var heroObserver = new IntersectionObserver(function(entries) {
          if (entries[0].isIntersecting) {
            heroPhoto.classList.add('about__hero-photo--visible');
            heroObserver.disconnect();
          }
        }, { threshold: 0.2 });
        heroObserver.observe(heroPhoto);

        var heroGlare = heroPhoto.querySelector('.about__hero-glare');
        var hAmp = 5;
        var hrx = 0, hry = 0, htrx = 0, htry = 0;
        var hRunning = false;

        function hLerp(a, b, t) { return a + (b - a) * t; }

        function hTick() {
          hrx = hLerp(hrx, htrx, 0.08);
          hry = hLerp(hry, htry, 0.08);
          heroPhoto.style.transform = 'perspective(800px) rotateX(' + hrx + 'deg) rotateY(' + hry + 'deg)';
          if (Math.abs(hrx - htrx) > 0.01 || Math.abs(hry - htry) > 0.01) {
            requestAnimationFrame(hTick);
          } else {
            hRunning = false;
          }
        }

        function hStart() { if (!hRunning) { hRunning = true; hTick(); } }

        heroPhoto.addEventListener('mousemove', function(e) {
          var rect = heroPhoto.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width - 0.5;
          var py = (e.clientY - rect.top) / rect.height - 0.5;
          htrx = -py * hAmp;
          htry = px * hAmp;
          if (heroGlare) {
            heroGlare.style.opacity = '1';
            heroGlare.style.background = 'radial-gradient(circle at ' + ((px + 0.5) * 100) + '% ' + ((py + 0.5) * 100) + '%, rgba(255,255,255,0.14) 0%, transparent 60%)';
          }
          hStart();
        });

        heroPhoto.addEventListener('mouseleave', function() {
          htrx = 0; htry = 0;
          if (heroGlare) heroGlare.style.opacity = '0';
          hStart();
        });
      }

      var photoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('about__photo--visible');
            photoObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3, rootMargin: '0px 0px -60px 0px' });

      photos.forEach(function(photo) { photoObserver.observe(photo); });

      var amp = 7;
      function lerp(a, b, t) { return a + (b - a) * t; }

      photos.forEach(function(photo) {
        var rx = 0, ry = 0, trx = 0, try_ = 0;
        var running = false;

        function tick() {
          rx = lerp(rx, trx, 0.1);
          ry = lerp(ry, try_, 0.1);
          photo.style.transform = 'perspective(600px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
          if (Math.abs(rx - trx) > 0.01 || Math.abs(ry - try_) > 0.01) {
            requestAnimationFrame(tick);
          } else {
            running = false;
          }
        }

        function start() { if (!running) { running = true; tick(); } }

        photo.addEventListener('mousemove', function(e) {
          var rect = photo.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width - 0.5;
          var py = (e.clientY - rect.top) / rect.height - 0.5;
          trx = -py * amp;
          try_ = px * amp;
          start();
        });

        photo.addEventListener('mouseleave', function() {
          trx = 0; try_ = 0;
          start();
        });
      });

      var catPhoto = photos[2];
      if (catPhoto) {
        var catPhotoTimer = null;
        catPhoto.addEventListener('mouseenter', function() {
          catPhotoTimer = setTimeout(function() {
            if (catPhoto.matches(':hover') && window._showCatCursor) {
              window._showCatCursor(catPhoto);
            }
          }, 1000);
        });
        catPhoto.addEventListener('mouseleave', function() {
          clearTimeout(catPhotoTimer);
          if (window._hideCatCursor) window._hideCatCursor();
        });

        __track(window, 'scroll', function() {
          clearTimeout(catPhotoTimer);
          if (window._hideCatCursor) window._hideCatCursor();
        }, { passive: true });
      }
    })();
;

;
(function(){function r(){document.body.classList.add('fonts-ready')}if(document.fonts&&document.fonts.ready){document.fonts.ready.then(r)}else{setTimeout(r,500)}setTimeout(r,3000)})();

})();
