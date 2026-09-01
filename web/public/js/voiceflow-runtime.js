document.getElementById('footerYear').textContent = new Date().getFullYear();

    // Mobile header: hide on scroll down, show on scroll up
    (function() {
      var header = document.querySelector('.mobile-header');
      if (!header) return;
      var lastY = 0;
      var ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking) {
          requestAnimationFrame(function() {
            var y = window.scrollY;
            if (y > lastY && y > 60) {
              header.style.transform = 'translateY(-100%)';
            } else {
              header.style.transform = 'translateY(0)';
            }
            lastY = y;
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    })();

    // Mobile menu toggle
    (function() {
      var toggle = document.querySelector('.menu-toggle');
      var menu = document.querySelector('.mobile-menu');
      if (!toggle || !menu) return;
      toggle.addEventListener('click', function() {
        var isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isOpen);
        menu.setAttribute('aria-hidden', isOpen);
        document.body.classList.toggle('menu-open', !isOpen);
      });
      menu.querySelectorAll('.mobile-menu-link').forEach(function(link) {
        link.addEventListener('click', function() {
          if (link.id === 'mobileMenuCopyEmail') return;
          toggle.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('menu-open');
        });
      });
    })();

    // Mobile menu: copy email
    (function() {
      var btn = document.getElementById('mobileMenuCopyEmail');
      if (!btn) return;
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        navigator.clipboard.writeText('gregory@murynmukha.com').then(function() {
          btn.textContent = 'Copied';
          btn.style.color = 'var(--text)';
          setTimeout(function() { btn.textContent = 'Email'; btn.style.color = ''; }, 2000);
        });
      });
    })();

    // Sidebar + mobile header scroll spy (position-based, always one active)
    (function() {
      var sidebarLinks = document.querySelectorAll('.sidebar-nav .nav-link[data-section]');
      var mobileLinks = document.querySelectorAll('.mobile-header__link[data-section]');
      if (!sidebarLinks.length) return;

      var navIds = [];
      sidebarLinks.forEach(function(link) { navIds.push(link.getAttribute('data-section')); });
      var navSections = navIds.map(function(id) { return document.getElementById(id); }).filter(Boolean);

      function update() {
        var scrollY = window.scrollY;
        var threshold = window.innerHeight * 0.25;
        var activeId = navIds[0];

        for (var i = 0; i < navSections.length; i++) {
          if (navSections[i].getBoundingClientRect().top <= threshold) {
            activeId = navIds[i];
          }
        }

        sidebarLinks.forEach(function(link) {
          link.classList.toggle('active', link.getAttribute('data-section') === activeId);
        });
        mobileLinks.forEach(function(link) {
          link.classList.toggle('active', link.getAttribute('data-section') === activeId);
        });
      }

      var ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking) {
          requestAnimationFrame(function() { update(); ticking = false; });
          ticking = true;
        }
      }, { passive: true });
      update();
    })();

    // Gallery carousel + lightbox + single image zoom
    (function() {
      var prevSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.25 11C18.6642 11 19 11.3358 19 11.75C19 12.1642 18.6642 12.5 18.25 12.5L7.35127 12.5L10.8262 16.2698C11.0913 16.5881 11.0483 17.061 10.7301 17.3261C10.4119 17.5913 9.939 17.5483 9.67383 17.2301L5.17383 12.2301C4.94205 11.952 4.94205 11.548 5.17383 11.2698L9.67383 6.26984C9.939 5.95163 10.4119 5.90864 10.7301 6.17382C11.0483 6.43899 11.0913 6.91191 10.8262 7.23012L7.35129 11L18.25 11Z" fill="#002E71"/></svg>';
      var nextSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.75 11C5.33579 11 5 11.3358 5 11.75C5 12.1642 5.33579 12.5 5.75 12.5L16.6487 12.5L13.1738 16.2698C12.9087 16.5881 12.9517 17.061 13.2699 17.3261C13.5881 17.5913 14.061 17.5483 14.3262 17.2301L18.8262 12.2301C19.0579 11.952 19.0579 11.548 18.8262 11.2698L14.3262 6.26984C14.061 5.95163 13.5881 5.90864 13.2699 6.17382C12.9517 6.43899 12.9087 6.91191 13.1738 7.23012L16.6487 11L5.75 11Z" fill="#002E71"/></svg>';
      var prevSvgWhite = prevSvg.replace('#002E71', '#FFFFFF');
      var nextSvgWhite = nextSvg.replace('#002E71', '#FFFFFF');

      // Pixel transition grid
      function createPixelGrid(container) {
        var grid = document.createElement('div');
        grid.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:2;border-radius:10px;';
        var GRID = 16;
        for (var r = 0; r < GRID; r++) {
          for (var c = 0; c < GRID; c++) {
            var px = document.createElement('div');
            var size = 100 / GRID;
            px.style.cssText = 'position:absolute;display:none;background:#FFFFFF;';
            px.style.width = size + '%'; px.style.height = size + '%';
            px.style.left = (c * size) + '%'; px.style.top = (r * size) + '%';
            grid.appendChild(px);
          }
        }
        container.appendChild(grid);
        return grid;
      }

      function pixelTransition(grid, newSrc, imgEl, cb) {
        var pixels = grid.querySelectorAll('div');
        var total = pixels.length;
        var indices = [];
        for (var i = 0; i < total; i++) indices.push(i);
        for (var i = total - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
        }
        var stepDur = 180, perPixel = stepDur / total;

        indices.forEach(function(pi, i) {
          setTimeout(function() { pixels[pi].style.display = 'block'; }, i * perPixel);
        });

        setTimeout(function() {
          imgEl.src = newSrc;
          for (var i = total - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
          }
          indices.forEach(function(pi, i) {
            setTimeout(function() { pixels[pi].style.display = 'none'; }, i * perPixel);
          });
          setTimeout(function() { if (cb) cb(); }, stepDur + 30);
        }, stepDur + 30);
      }

      // === Lightbox ===
      var lb = document.createElement('div');
      lb.className = 'cs-lightbox';
      lb.innerHTML = '<button class="cs-lightbox__close">&times;</button><button class="cs-lightbox__nav cs-lightbox__nav--prev">' + prevSvgWhite + '</button><div class="cs-lightbox__img-wrap"><img src="" alt=""></div><button class="cs-lightbox__nav cs-lightbox__nav--next">' + nextSvgWhite + '</button>';
      document.body.appendChild(lb);
      var lbWrap = lb.querySelector('.cs-lightbox__img-wrap');
      var lbImg = lb.querySelector('img');
      var lbSrcs = [], lbIdx = 0;
      var zoomed = false, panX = 0, panY = 0, isDragging = false, dragStartX, dragStartY, startPanX, startPanY;

      function openLightbox(srcs, idx) {
        lbSrcs = srcs; lbIdx = idx;
        lbImg.src = srcs[idx];
        lb.classList.add('cs-lightbox--open');
        zoomed = false; panX = 0; panY = 0;
        lbImg.style.transform = '';
        lbWrap.style.cursor = 'zoom-in';
        lb.querySelector('.cs-lightbox__nav--prev').style.display = srcs.length > 1 ? '' : 'none';
        lb.querySelector('.cs-lightbox__nav--next').style.display = srcs.length > 1 ? '' : 'none';
        document.body.style.overflow = 'hidden';
      }

      function closeLightbox() {
        lb.classList.remove('cs-lightbox--open');
        zoomed = false;
        document.body.style.overflow = '';
      }

      function lbGo(dir) {
        lbIdx = (lbIdx + dir + lbSrcs.length) % lbSrcs.length;
        lbImg.src = lbSrcs[lbIdx];
        zoomed = false; panX = 0; panY = 0;
        lbImg.style.transform = '';
        lbWrap.style.cursor = 'zoom-in';
      }

      lb.querySelector('.cs-lightbox__close').addEventListener('click', function(e) { e.stopPropagation(); closeLightbox(); });
      lb.querySelector('.cs-lightbox__nav--prev').addEventListener('click', function(e) { e.stopPropagation(); lbGo(-1); });
      lb.querySelector('.cs-lightbox__nav--next').addEventListener('click', function(e) { e.stopPropagation(); lbGo(1); });

      lbWrap.addEventListener('click', function(e) {
        if (isDragging) return;
        if (!zoomed) {
          zoomed = true;
          panX = 0; panY = 0;
          lbImg.style.transform = 'scale(2)';
          lbWrap.style.cursor = 'grab';
        } else {
          zoomed = false;
          panX = 0; panY = 0;
          lbImg.style.transform = '';
          lbWrap.style.cursor = 'zoom-in';
        }
      });

      // Pan when zoomed
      lbWrap.addEventListener('mousedown', function(e) {
        if (!zoomed) return;
        isDragging = true;
        dragStartX = e.clientX; dragStartY = e.clientY;
        startPanX = panX; startPanY = panY;
        lbWrap.style.cursor = 'grabbing';
        e.preventDefault();
      });
      window.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        var rawX = startPanX + (e.clientX - dragStartX);
        var rawY = startPanY + (e.clientY - dragStartY);

        // Clamp pan so image doesn't go beyond its edges
        var rect = lbImg.getBoundingClientRect();
        var imgW = lbImg.naturalWidth ? Math.min(lbImg.naturalWidth, lbWrap.clientWidth) : lbWrap.clientWidth;
        var imgH = lbImg.naturalHeight ? Math.min(lbImg.naturalHeight, lbWrap.clientHeight) : lbWrap.clientHeight;
        var maxPanX = Math.max(0, (imgW * 2 - lbWrap.clientWidth) / 2);
        var maxPanY = Math.max(0, (imgH * 2 - lbWrap.clientHeight) / 2);

        panX = Math.max(-maxPanX, Math.min(maxPanX, rawX));
        panY = Math.max(-maxPanY, Math.min(maxPanY, rawY));
        lbImg.style.transform = 'scale(2) translate(' + (panX / 2) + 'px,' + (panY / 2) + 'px)';
      });
      window.addEventListener('mouseup', function() {
        if (isDragging) {
          setTimeout(function() { isDragging = false; }, 10);
          if (zoomed) lbWrap.style.cursor = 'grab';
        }
      });

      lb.addEventListener('click', function(e) { if (e.target === lb) closeLightbox(); });
      document.addEventListener('keydown', function(e) {
        if (!lb.classList.contains('cs-lightbox--open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lbGo(-1);
        if (e.key === 'ArrowRight') lbGo(1);
      });

      // === Transform galleries into carousels ===
      document.querySelectorAll('.cs-gallery').forEach(function(gallery) {
        if (gallery.classList.contains('cs-gallery--react')) return;
        var items = gallery.querySelectorAll('.cs-gallery__item');
        if (items.length < 2) return;

        var srcs = [];
        items.forEach(function(item) {
          var img = item.querySelector('img');
          if (img) srcs.push(img.src);
        });

        var currentIdx = 0, transitioning = false;

        var main = document.createElement('div');
        main.className = 'cs-gallery__main';
        main.style.position = 'relative';
        if (gallery.classList.contains('cs-gallery--fixed-frame')) {
          main.style.height = 'min(68vh, 620px)';
          main.style.overflowX = 'hidden';
          main.style.overflowY = 'auto';
        }
        var mainImg = document.createElement('img');
        mainImg.src = srcs[0];
        main.appendChild(mainImg);

        var pixGrid = createPixelGrid(main);

        var counter = document.createElement('span');
        counter.className = 'cs-gallery__counter';
        counter.textContent = '1 / ' + srcs.length;
        main.appendChild(counter);

        var prevBtn = document.createElement('button');
        prevBtn.className = 'cs-gallery__nav cs-gallery__nav--prev';
        prevBtn.innerHTML = prevSvg;

        var nextBtn = document.createElement('button');
        nextBtn.className = 'cs-gallery__nav cs-gallery__nav--next';
        nextBtn.innerHTML = nextSvg;

        var thumbs = document.createElement('div');
        thumbs.className = 'cs-gallery__thumbs';
        srcs.forEach(function(src, i) {
          var thumb = document.createElement('div');
          thumb.className = 'cs-gallery__thumb' + (i === 0 ? ' cs-gallery__thumb--active' : '');
          var tImg = document.createElement('img');
          tImg.src = src;
          thumb.appendChild(tImg);
          thumb.addEventListener('click', function() { goTo(i); });
          thumbs.appendChild(thumb);
        });

        var dots = document.createElement('div');
        dots.className = 'cs-gallery__dots';
        srcs.forEach(function(src, i) {
          var dot = document.createElement('button');
          dot.className = 'cs-gallery__dot' + (i === 0 ? ' cs-gallery__dot--active' : '');
          dot.addEventListener('click', function() { goTo(i); });
          dots.appendChild(dot);
        });

        function goTo(idx) {
          if (transitioning || idx === currentIdx) return;
          transitioning = true;
          main.scrollTop = 0;
          pixelTransition(pixGrid, srcs[idx], mainImg, function() {
            transitioning = false;
          });
          currentIdx = idx;
          thumbs.querySelectorAll('.cs-gallery__thumb').forEach(function(t, i) {
            t.classList.toggle('cs-gallery__thumb--active', i === idx);
          });
          dots.querySelectorAll('.cs-gallery__dot').forEach(function(d, i) {
            d.classList.toggle('cs-gallery__dot--active', i === idx);
          });
        }

        prevBtn.addEventListener('click', function(e) { e.stopPropagation(); goTo((currentIdx - 1 + srcs.length) % srcs.length); });
        nextBtn.addEventListener('click', function(e) { e.stopPropagation(); goTo((currentIdx + 1) % srcs.length); });
        mainImg.addEventListener('click', function() { openLightbox(srcs, currentIdx); });

        var touchStartX = 0;
        main.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, {passive: true});
        main.addEventListener('touchend', function(e) {
          var dx = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(dx) > 40) goTo((currentIdx + (dx < 0 ? 1 : -1) + srcs.length) % srcs.length);
        });

        var thumbRow = document.createElement('div');
        thumbRow.className = 'cs-gallery__thumb-row';
        thumbRow.appendChild(prevBtn);
        thumbRow.appendChild(thumbs);
        thumbRow.appendChild(nextBtn);

        gallery.insertBefore(main, gallery.firstChild);
        gallery.appendChild(thumbRow);
        gallery.appendChild(dots);
      });

      // === Single images clickable to zoom ===
      document.querySelectorAll('.cs-image__wrap img').forEach(function(img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
          openLightbox([img.src], 0);
        });
      });
    })();

    // Tilt effect on gallery main images (desktop only)
    (function() {
      if (window.innerWidth < 900) return;
      var amp = 2;
      function lerp(a, b, t) { return a + (b - a) * t; }

      document.querySelectorAll('.cs-gallery__main, .cs-image__wrap').forEach(function(card) {
        var sx = 0, sy = 0, ss = 1;
        var tx = 0, ty = 0, ts = 1;
        var raf = null, hov = false;

        function tick() {
          sx = lerp(sx, tx, 0.08);
          sy = lerp(sy, ty, 0.08);
          ss = lerp(ss, ts, 0.04);
          if (Math.abs(sx - tx) < 0.01 && Math.abs(sy - ty) < 0.01 && Math.abs(ss - ts) < 0.001 && !hov) {
            sx = tx; sy = ty; ss = ts;
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            raf = null; return;
          }
          card.style.transform = 'perspective(1000px) rotateX(' + sx.toFixed(2) + 'deg) rotateY(' + sy.toFixed(2) + 'deg) scale(' + ss.toFixed(4) + ')';
          raf = requestAnimationFrame(tick);
        }

        card.addEventListener('mousemove', function(e) {
          var r = card.getBoundingClientRect();
          tx = -((e.clientY - r.top) / r.height - 0.5) * amp;
          ty = ((e.clientX - r.left) / r.width - 0.5) * amp;
          if (!raf) raf = requestAnimationFrame(tick);
        });
        card.addEventListener('mouseenter', function() {
          hov = true; ts = 1.01; card.style.transition = 'none';
          if (!raf) raf = requestAnimationFrame(tick);
        });
        card.addEventListener('mouseleave', function() {
          hov = false; tx = 0; ty = 0; ts = 1;
          if (!raf) raf = requestAnimationFrame(tick);
        });
      });
    })();

    // Tag tooltips — follow cursor
    (function() {
      var tags = document.querySelectorAll('.cs-hero__tag[data-tip]');
      if (!tags.length) return;

      var tip = document.createElement('div');
      tip.className = 'cs-tag-tip';
      document.body.appendChild(tip);

      tags.forEach(function(tag) {
        tag.addEventListener('mouseenter', function() {
          tip.textContent = tag.getAttribute('data-tip');
          tip.classList.add('cs-tag-tip--visible');
        });

        tag.addEventListener('mousemove', function(e) {
          tip.style.left = (e.clientX + 12) + 'px';
          tip.style.top = (e.clientY + 16) + 'px';
        });

        tag.addEventListener('mouseleave', function() {
          tip.classList.remove('cs-tag-tip--visible');
        });
      });
    })();

    // Tag spring-tension physics
    (function() {
      var container = document.querySelector('.cs-hero__contributions');
      if (!container) return;
      var tags = Array.prototype.slice.call(container.querySelectorAll('.cs-hero__tag'));
      if (tags.length < 2) return;

      var stiffness = 0.032, damp = 0.82, restThreshold = 0.04;
      var pushX = 6, pullY = -1.2;
      var state = tags.map(function() {
        return { x: 0, y: 0, vx: 0, vy: 0, sc: 1, vsc: 0, tx: 0, ty: 0, tsc: 1 };
      });
      var hoveredIdx = -1, rafId = null;

      function getRow(tag) {
        return Math.round(tag.getBoundingClientRect().top);
      }

      function setTargets() {
        var rows = tags.map(getRow);
        var hovRow = hoveredIdx >= 0 ? rows[hoveredIdx] : -1;

        for (var i = 0; i < tags.length; i++) {
          if (i === hoveredIdx) {
            state[i].tx = 0;
            state[i].ty = -1.5;
            state[i].tsc = 1.02;
            continue;
          }
          if (hoveredIdx < 0 || rows[i] !== hovRow) {
            state[i].tx = 0;
            state[i].ty = 0;
            state[i].tsc = 1;
            continue;
          }
          var dist = i - hoveredIdx;
          var absDist = Math.abs(dist);
          var falloff = Math.exp(-0.9 * (absDist - 1));
          state[i].tx = (dist > 0 ? pushX : -pushX) * falloff;
          state[i].ty = pullY * falloff;
          state[i].tsc = 1;
        }
      }

      function step() {
        var moving = false;
        for (var i = 0; i < state.length; i++) {
          var s = state[i];

          s.vx = (s.vx + stiffness * (s.tx - s.x)) * damp;
          s.vy = (s.vy + stiffness * (s.ty - s.y)) * damp;
          s.vsc = (s.vsc + stiffness * (s.tsc - s.sc)) * damp;
          s.x += s.vx;
          s.y += s.vy;
          s.sc += s.vsc;

          tags[i].style.transform =
            'translate3d(' + s.x.toFixed(3) + 'px,' + s.y.toFixed(3) + 'px,0) scale(' + s.sc.toFixed(4) + ')';

          if (Math.abs(s.x - s.tx) > restThreshold || Math.abs(s.vx) > restThreshold ||
              Math.abs(s.y - s.ty) > restThreshold || Math.abs(s.vy) > restThreshold ||
              Math.abs(s.sc - s.tsc) > 0.0003 || Math.abs(s.vsc) > 0.0003) {
            moving = true;
          }
        }
        if (moving) {
          rafId = requestAnimationFrame(step);
        } else {
          rafId = null;
          for (var j = 0; j < state.length; j++) {
            var s = state[j];
            s.x = s.tx; s.y = s.ty; s.sc = s.tsc;
            s.vx = s.vy = s.vsc = 0;
            tags[j].style.transform =
              'translate3d(' + s.tx.toFixed(3) + 'px,' + s.ty.toFixed(3) + 'px,0) scale(' + s.tsc.toFixed(4) + ')';
          }
        }
      }

      function kick() {
        if (!rafId) rafId = requestAnimationFrame(step);
      }

      tags.forEach(function(tag, i) {
        tag.addEventListener('mouseenter', function() {
          hoveredIdx = i;
          setTargets();
          kick();
        });
        tag.addEventListener('mouseleave', function() {
          if (hoveredIdx === i) hoveredIdx = -1;
          setTargets();
          kick();
        });
      });
    })();

    // Target frame cursor on focus items
    (function() {
      var targets = document.querySelectorAll('.cs-focus-list .cs-focus-item, .cs-outcome-card');
      if (!targets.length) return;

      var frame = document.createElement('div');
      frame.className = 'tc-frame';
      frame.innerHTML = '<div class="tc-frame-inner"></div>';
      document.body.appendChild(frame);

      targets.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
          var rect = item.getBoundingClientRect();
          frame.style.top = (rect.top - 3) + 'px';
          frame.style.left = (rect.left - 3) + 'px';
          frame.style.width = (rect.width + 6) + 'px';
          frame.style.height = (rect.height + 6) + 'px';
          var isOutline = item.classList.contains('cs-outcome-card') || item.closest('.cs-focus-list--outline');
          frame.classList.toggle('tc-frame--neutral', !!isOutline);
          frame.classList.add('tc-frame--visible');
        });

        item.addEventListener('mouseleave', function() {
          frame.classList.remove('tc-frame--visible');
          frame.classList.remove('tc-frame--neutral');
        });
      });

      // Update position on scroll
      window.addEventListener('scroll', function() {
        if (!frame.classList.contains('tc-frame--visible')) return;
        var active = document.querySelector('.cs-focus-item:hover, .cs-outcome-card:hover');
        if (active) {
          var rect = active.getBoundingClientRect();
          frame.style.top = (rect.top - 3) + 'px';
          frame.style.left = (rect.left - 3) + 'px';
        }
      }, { passive: true });
    })();


    // About CTA: copy email with spark + icon morph
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
          (function(s) { setTimeout(function() { if (s.parentNode) s.parentNode.removeChild(s); }, dur + 50); })(spark);
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


    // Summarize button
    (function() {
      var btn = document.getElementById('summarizeBtn');
      var panel = document.getElementById('summarizePanel');
      var closeBtn = document.getElementById('summarizePanelClose');
      if (!btn || !panel) return;
      var textEl = btn.querySelector('.cs-summarize__text');
      var state = 'idle';

      btn.addEventListener('click', function() {
        if (state === 'loading') return;

        if (state === 'done') {
          panel.classList.toggle('cs-summarize__panel--visible');
          return;
        }

        state = 'loading';
        textEl.textContent = 'Summarizing\u2026';
        btn.classList.add('cs-summarize__btn--loading');

        setTimeout(function() {
          state = 'done';
          btn.classList.remove('cs-summarize__btn--loading');
          btn.classList.add('cs-summarize__btn--done');
          textEl.textContent = 'Summarized';
          panel.classList.add('cs-summarize__panel--visible');
        }, 3000);
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          panel.classList.remove('cs-summarize__panel--visible');
        });
      }

      document.addEventListener('click', function(e) {
        if (state !== 'done') return;
        if (!btn.contains(e.target) && !panel.contains(e.target)) {
          panel.classList.remove('cs-summarize__panel--visible');
        }
      });
    })();

    // Scroll reveal
    (function() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var els = document.querySelectorAll('.cs-heading, .cs-body, .cs-focus-list, .cs-process, .cs-two-col, .cs-image__wrap, .cs-gallery, .cs-hero__contributions, .cs-next__link');
      els.forEach(function(el) { el.classList.add('reveal-scroll'); });
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-scroll--visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function(el) { observer.observe(el); });
    })();
;
// Staggered sidebar + hero reveal on page load
    (function() {
      var els = document.querySelectorAll('.reveal-load');
      if (!els.length) return;
      els.forEach(function(el) {
        var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
        setTimeout(function() {
          el.classList.add('reveal-load--active');
        }, delay);
      });
      // Nudge summarize button after it appears
      var sumBtn = document.getElementById('summarizeBtn');
      if (sumBtn) {
        setTimeout(function() {
          sumBtn.classList.add('cs-summarize__btn--nudge');
          sumBtn.addEventListener('animationend', function() {
            sumBtn.classList.remove('cs-summarize__btn--nudge');
          }, { once: true });
        }, 1300);
      }
    })();

    // Auto-apply reveal-scroll to content elements
    (function() {
      // Section headings and body text (labels animate with their parent .cs-body)
      document.querySelectorAll('.cs-heading, .cs-body').forEach(function(el) {
        el.classList.add('reveal-scroll');
      });
      // Image sections (skip ones already reveal-load)
      document.querySelectorAll('.cs-image__wrap, .cs-gallery').forEach(function(el) {
        if (!el.classList.contains('reveal-load')) el.classList.add('reveal-scroll');
      });
      // Individual cards (staggered via CSS nth-child)
      document.querySelectorAll('.cs-focus-item, .cs-outcome-card').forEach(function(el) {
        el.classList.add('reveal-scroll');
      });
      // Diagrams
      document.querySelectorAll('.cs-tree').forEach(function(el) {
        el.classList.add('reveal-scroll');
      });
      // CTA footer
      document.querySelectorAll('.cs-cta-footer .about__footer').forEach(function(el) {
        el.classList.add('reveal-scroll');
      });

      // Scroll reveal observer
      var scrollEls = document.querySelectorAll('.reveal-scroll');
      var scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-scroll--visible');
            scrollObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      scrollEls.forEach(function(el) { scrollObserver.observe(el); });
    })();
;
// Make interactive tree diagrams scrollable on mobile
    (function() {
      if (window.innerWidth > 900) return;
      var isMobileSmall = window.innerWidth < 680;

      ['blocksTree', 'messageTree', 'pipelineTree', 'systemTree', 'seoulPipelineTree', 'seoulSystemTree', 'slopPipelineTree', 'slopSystemTree'].forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.style.overflowX = 'auto';
        el.style.webkitOverflowScrolling = 'touch';
        el.style.maxWidth = '100%';
        var svg = el.querySelector('svg');
        if (!svg) return;
        svg.style.overflow = 'visible';
        // Wait for tree to render then size SVG to actual content
        setTimeout(function() {
          var g = svg.querySelector('g');
          if (!g) return;
          var bbox = g.getBBox();
          var w = bbox.x + bbox.width + 40;
          if (w > el.clientWidth) {
            svg.style.minWidth = w + 'px';
            svg.style.width = w + 'px';
          }
          el.scrollLeft = 0;

          // On small mobile: auto-scroll right when diagram enters viewport
          if (isMobileSmall) {
            var revealed = false;
            var observer = new IntersectionObserver(function(entries) {
              if (entries[0].isIntersecting && !revealed) {
                revealed = true;
                observer.disconnect();
                var maxScroll = el.scrollWidth - el.clientWidth;
                if (maxScroll <= 0) return;
                var start = null;
                var dur = 2200;
                function animate(ts) {
                  if (!start) start = ts;
                  var t = Math.min((ts - start) / dur, 1);
                  var ease = t < 0.5
                    ? 16 * t * t * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 5) / 2;
                  el.scrollLeft = ease * maxScroll;
                  if (t < 1) requestAnimationFrame(animate);
                }
                setTimeout(function() { requestAnimationFrame(animate); }, 300);
              }
            }, { threshold: 0.3 });
            observer.observe(el);
          }
        }, 1200);
      });
    })();
;
(function(){function r(){document.body.classList.add('fonts-ready')}if(document.fonts&&document.fonts.ready){document.fonts.ready.then(r)}else{setTimeout(r,500)}setTimeout(r,3000)})()
