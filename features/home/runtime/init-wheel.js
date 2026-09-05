export function initWheel(root) {
  var track = root.querySelector('.sp-wheel__track');
  var arrow = root.querySelector('.sp-services__arrow');
  var wheelContainer = root.querySelector('.sp-services__wheel');
  if (!track) return function () {};

  var services = [
    '왜부터',
    '문제 먼저',
    '추측 금지',
    '구조 우선',
    '흐름이 코드',
    '설명 없는 화면',
    '쓰는 중에 고치기',
    '끝까지 보기'
  ];

  var descriptions = [
    '만들기 전에 왜 필요한지부터 묻습니다. 답이 없으면 아직 만들 때가 아닙니다.',
    '기능 목록보다 풀 문제를 고릅니다. 무엇을 뺄지가 더 중요합니다.',
    '감으로 밀지 않습니다. 데이터로 막힌 지점을 확인한 뒤 만듭니다.',
    '작은 구조가 이후 속도와 유지보수를 가릅니다. 먼저 그리고, 그다음 짭니다.',
    '잘 돌아가는 코드보다, 문제가 풀리는 흐름이 먼저입니다.',
    '화면이 스스로 설명해야 합니다. 다음 행동을 고민하게 두지 않습니다.',
    '만든 뒤에 검증하지 않습니다. 만드는 중에 쓰고, 막히는 지점을 다시 넣습니다.',
    '배포에서 끝나지 않습니다. 연동과 운영이 끊기면 제품이 아닙니다.'
  ];

  var isDarkTheme = document.documentElement.dataset.theme === 'dark';
  var PILL_BG_RGB = isDarkTheme ? '48,58,86' : '214,231,255';

  var pillStack = document.getElementById('pillStack');
  var stackAnimating = false;
  var ANIM_DUR = 450;
  var ANIM_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
  var ANIM_TR = 'all ' + ANIM_DUR + 'ms ' + ANIM_EASE;

  var elTop2 = document.getElementById('stackTop2');
  var elTop1 = document.getElementById('stackTop1');
  var elActive = document.getElementById('stackActive');
  var elBot1 = document.getElementById('stackBot1');
  var elBot2 = document.getElementById('stackBot2');
  var elActiveText = elActive.querySelector('span');

  var S = {
    top2:   { w: 134, h: 20, bg: 0.24, r: '14px 14px 0 0', shadow: '0 -12px 8px 0 rgba(' + PILL_BG_RGB + ',0.35)', stroke: 'none', pad: '0', scale: 1, opacity: 1, yOff: 0 },
    top1:   { w: 184, h: 28, bg: 0.44, r: '18px 18px 0 0', shadow: '0 -12px 8px 0 rgba(' + PILL_BG_RGB + ',0.35)', stroke: 'none', pad: '0', scale: 1, opacity: 1, yOff: 0 },
    active: { w: 260, h: 175, bg: 0.92, r: '32px', shadow: '0 -12px 8px 0 rgba(' + PILL_BG_RGB + ',0.35)', stroke: 'inset 0 -2px 0 0 rgba(' + PILL_BG_RGB + ',0.32)', pad: '22px 28px 23px', scale: 1, opacity: 1, yOff: 0 },
    bot1:   { w: 184, h: 28, bg: 0.44, r: '0 0 18px 18px', shadow: 'none', stroke: 'inset 0 -1.5px 0 0 rgba(' + PILL_BG_RGB + ',0.32)', pad: '0', scale: 1, opacity: 1, yOff: 0 },
    bot2:   { w: 134, h: 20, bg: 0.24, r: '0 0 14px 14px', shadow: 'none', stroke: 'inset 0 -1.5px 0 0 rgba(' + PILL_BG_RGB + ',0.24)', pad: '0', scale: 1, opacity: 1, yOff: 0 },
  };

  function applyState(el, s, animate) {
    el.style.transition = animate ? ANIM_TR : 'none';
    el.style.width = s.w + 'px';
    el.style.height = s.h + 'px';
    el.style.background = 'rgba(' + PILL_BG_RGB + ',' + s.bg + ')';
    el.style.borderRadius = s.r;
    el.style.boxShadow = (s.stroke !== 'none' && s.shadow !== 'none') ? s.stroke + ',' + s.shadow : (s.stroke !== 'none' ? s.stroke : s.shadow);
    el.style.padding = s.pad;
    el.style.transform = 'scale(' + s.scale + ') translateY(' + s.yOff + 'px)';
    el.style.opacity = s.opacity;
  }

  applyState(elTop2, S.top2, false);
  applyState(elTop1, S.top1, false);
  applyState(elActive, S.active, false);
  applyState(elBot1, S.bot1, false);
  applyState(elBot2, S.bot2, false);
  elActiveText.textContent = descriptions[0];

  // Live-react to the theme toggle: keep each pill's current opacity, just
  // swap the color base so this doesn't get stuck on a stale theme's tint.
  function retintPill(el) {
    var bg = el.style.background;
    var m = bg && bg.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/);
    if (m) el.style.background = 'rgba(' + PILL_BG_RGB + ',' + m[1] + ')';
  }
  new MutationObserver(function() {
    isDarkTheme = document.documentElement.dataset.theme === 'dark';
    PILL_BG_RGB = isDarkTheme ? '48,58,86' : '214,231,255';
    [elTop2, elTop1, elActive, elBot1, elBot2].forEach(retintPill);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function updateDescription(idx) {
    if (stackAnimating) return;
    stackAnimating = true;

    var nextText = descriptions[idx];

    applyState(elTop2, Object.assign({}, S.bot2, { scale: 0.5, opacity: 0, yOff: 20 }), false);

    pillStack.appendChild(elTop2);

    var newSpan = document.createElement('span');
    newSpan.style.opacity = '0';
    newSpan.textContent = nextText;
    elBot1.appendChild(newSpan);
    elBot1.classList.add('sp-stack__card--active');

    elActiveText.style.transition = 'opacity 0.15s ease-out';
    elActiveText.style.opacity = '0';

    pillStack.offsetHeight;

    requestAnimationFrame(function() {

      applyState(elTop1, S.top2, true);

      applyState(elActive, Object.assign({}, S.top1, { pad: '0' }), true);

      applyState(elBot1, S.active, true);

      applyState(elBot2, S.bot1, true);

      applyState(elTop2, S.bot2, true);
    });

    setTimeout(function() {

      elActive.classList.remove('sp-stack__card--active');
      if (elActiveText.parentNode) elActiveText.parentNode.removeChild(elActiveText);

      var oldTop2 = elTop2;
      elTop2 = elTop1;
      elTop1 = elActive;
      elActive = elBot1;
      elActiveText = newSpan;
      elBot1 = elBot2;
      elBot2 = oldTop2;

      pillStack.offsetHeight;

      elActiveText.style.transition = 'opacity 0.2s ease-in';
      elActiveText.style.opacity = '1';

      setTimeout(function() {
        elActiveText.style.transition = '';
        stackAnimating = false;
      }, 220);
    }, ANIM_DUR + 10);
  }

  var N = services.length;
  var wheelEl = document.querySelector('.sp-services__wheel');
  var CARD_H = wheelEl ? wheelEl.offsetHeight : 364;
  var CENTER_Y = CARD_H / 2;

  window.addEventListener('resize', function() {
    if (wheelEl) {
      CARD_H = wheelEl.offsetHeight;
      CENTER_Y = CARD_H / 2;
      render();
    }
  });

  var R = 128;
  var STEP_DEG = 12;
  var DEG = Math.PI / 180;

  var CX = 64 - R;
  var CY = CENTER_Y;

  var BLUR = [0, 1, 2, 3, 4, 5];

  function getBlur(dist) {
    var i = Math.min(Math.floor(dist), BLUR.length - 2);
    var f = dist - i;
    return BLUR[i] + (BLUR[i + 1] - BLUR[i]) * f;
  }

  var COPIES = 3;
  var total = N * COPIES;
  var els = [];

  track.style.position = 'absolute';
  track.style.inset = '0';

  for (var c = 0; c < COPIES; c++) {
    for (var i = 0; i < N; i++) {
      var el = document.createElement('span');
      el.className = 'sp-wheel__item';
      el.textContent = services[i];
      el.style.transformOrigin = 'left center';
      el.dataset.serviceIdx = i;
      track.appendChild(el);
      els.push(el);
    }
  }

  var currentIdx = 0;
  var scrollAngle = 0;
  var arrowNudge = 0;
  var activeNudge = 0;
  var hoveredEl = null;
  var isAnimating = false;

  function render() {
    var activeSlot = N + currentIdx;

    for (var i = 0; i < total; i++) {
      var el = els[i];
      var slotDiff = i - activeSlot;
      var angleDeg = slotDiff * STEP_DEG - scrollAngle;
      var angleRad = angleDeg * DEG;

      var x = CX + R * Math.cos(angleRad);
      var y = CY + R * Math.sin(angleRad);
      var rot = angleDeg;

      var dist = Math.abs(angleDeg) / STEP_DEG;
      var nx = dist < 0.5 ? activeNudge : 0;

      el.style.left = (x + nx).toFixed(1) + 'px';
      el.style.top = (y - 12.8).toFixed(1) + 'px';
      el.style.transform = 'rotate(' + rot.toFixed(2) + 'deg)';

      var isActive = dist < 0.5;
      var isHovered = el === hoveredEl && !isActive;

      if (isActive) {
        el.style.fontWeight = '600';
        if (el !== sweepingEl) {
          el.style.color = 'var(--text-body)';
        }
        el.style.opacity = '1';
        el.style.filter = 'none';
      } else if (isHovered) {
        el.style.fontWeight = '400';
        el.style.color = 'var(--neutral-850)';
        el.style.opacity = '0.72';
        el.style.filter = 'none';
      } else {
        el.style.fontWeight = '400';
        el.style.color = 'var(--neutral-500)';
        el.style.opacity = '0.4';
        var blur = getBlur(dist);
        el.style.filter = blur > 0.3 ? 'blur(' + blur.toFixed(1) + 'px)' : 'none';
      }

      el.style.visibility = Math.abs(angleDeg) > 70 ? 'hidden' : 'visible';
      el.style.cursor = isActive ? 'default' : (Math.abs(angleDeg) < 50 ? 'pointer' : 'default');
    }

    if (arrow) {

      var stretchAmt = Math.abs(arrowNudge) / 16;
      var sx = 1 + stretchAmt * 0.22;
      var sy = 1 - stretchAmt * 0.16;
      arrow.style.transform = 'translateY(-50%) translateX(' + arrowNudge.toFixed(1) + 'px) scale(' + sx.toFixed(3) + ', ' + sy.toFixed(3) + ')';
    }
  }

  render();
  updateDescription(currentIdx);

  wheelContainer.style.pointerEvents = 'auto';

  track.addEventListener('mouseover', function(e) {
    var target = e.target.closest('.sp-wheel__item');
    if (target && target !== hoveredEl) {
      hoveredEl = target;
      render();
    }
  });

  track.addEventListener('mouseout', function(e) {
    if (hoveredEl) {
      hoveredEl = null;
      render();
    }
  });

  track.addEventListener('click', function(e) {
    if (dragging) return;
    var target = e.target.closest('.sp-wheel__item');
    if (!target || isAnimating) return;

    var targetServiceIdx = parseInt(target.dataset.serviceIdx, 10);
    if (targetServiceIdx === currentIdx) return;

    scrollToService(targetServiceIdx);
  });

  function scrollToService(targetIdx) {

    var diff = targetIdx - currentIdx;

    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    if (diff === 0) return;

    var steps = Math.abs(diff);
    var direction = diff > 0 ? 1 : -1;
    var totalDeg = steps * STEP_DEG * direction;

    isAnimating = true;
    var from = 0;
    var to = totalDeg;
    var start = performance.now();

    var dur = Math.min(300 + steps * 150, 900);
    var nudgeStarted = false;

    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      scrollAngle = from + (to - from) * e;

      if (!nudgeStarted && p > 0.95) {
        nudgeStarted = true;
        currentIdx = targetIdx;
        scrollAngle = 0;
        isAnimating = false;
        resetTimer();
        animateNudge();
      }

      render();
      if (p < 1 && !nudgeStarted) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  function springPushReturn(t) {
    if (t < 0.2) {
      var p = t / 0.2;
      return p * p * (3 - 2 * p);
    } else {
      var p = (t - 0.2) / 0.8;
      var decay = Math.exp(-5 * p);
      var osc = Math.cos(p * Math.PI * 2.5);
      return decay * osc;
    }
  }

  var isNarrowMobile = window.matchMedia('(max-width: 553px)');
  var INTERVAL_DEFAULT = 5250;
  var SWEEP_DEFAULT = 4750;
  var NARROW_OFFSET = 3750;

  var INTERVAL = isNarrowMobile.matches ? INTERVAL_DEFAULT - NARROW_OFFSET : INTERVAL_DEFAULT;
  var NUDGE_DUR = 700;
  var SWEEP_DUR = INTERVAL - NUDGE_DUR;

  var sweepingEl = null;
  var sweepRAF = null;
  var sweepElapsed = 0;
  var sweepLastTime = 0;
  var sweepDur = isNarrowMobile.matches ? SWEEP_DEFAULT - NARROW_OFFSET : SWEEP_DEFAULT;

  isNarrowMobile.addEventListener('change', function(e) {
    INTERVAL = e.matches ? INTERVAL_DEFAULT - NARROW_OFFSET : INTERVAL_DEFAULT;
    SWEEP_DUR = INTERVAL - NUDGE_DUR;
    sweepDur = e.matches ? SWEEP_DEFAULT - NARROW_OFFSET : SWEEP_DEFAULT;
  });
  var sweepPaused = false;

  function triggerSweep() {
    var activeSlot = N + currentIdx;
    var el = els[activeSlot];
    if (!el) return;

    if (sweepingEl) clearSweep(sweepingEl);
    sweepingEl = el;
    sweepElapsed = 0;
    sweepPaused = false;

    el.style.backgroundImage = 'linear-gradient(90deg, var(--text-body) 0%, var(--text-body) 44%, var(--accent-300) 50%, var(--text-body) 56%, var(--text-body) 100%)';
    el.style.backgroundSize = '200% auto';
    el.style.webkitBackgroundClip = 'text';
    el.style.backgroundClip = 'text';
    el.style.webkitTextFillColor = 'transparent';
    el.style.backgroundPosition = '100% center';

    sweepLastTime = performance.now();
    sweepTick();
  }

  function sweepTick() {
    if (!sweepingEl) return;

    var now = performance.now();
    if (!sweepPaused) {
      sweepElapsed += now - sweepLastTime;
    }
    sweepLastTime = now;

    var p = Math.min(sweepElapsed / sweepDur, 1);
    var pos = 100 - 100 * p;
    sweepingEl.style.backgroundPosition = pos.toFixed(1) + '% center';

    if (p < 1) {
      sweepRAF = requestAnimationFrame(sweepTick);
    } else {
      clearSweep(sweepingEl);
    }
  }

  function pauseSweep() {
    sweepPaused = true;
  }

  function resumeSweep() {
    if (!sweepingEl) return;
    sweepPaused = false;
    sweepLastTime = performance.now();
  }

  function clearSweep(el) {
    if (sweepRAF) { cancelAnimationFrame(sweepRAF); sweepRAF = null; }
    if (el) {
      el.style.backgroundImage = '';
      el.style.backgroundSize = '';
      el.style.webkitBackgroundClip = '';
      el.style.backgroundClip = '';
      el.style.webkitTextFillColor = '';
      el.style.backgroundPosition = '';
    }
    sweepingEl = null;
  }

  function animateNudge() {
    var start = performance.now();
    var distance = 16;
    var arrowLead = 60;
    var sweepTriggered = false;

    function tick(now) {
      var elapsed = now - start;

      var arrowT = Math.min(elapsed / NUDGE_DUR, 1);
      arrowNudge = distance * springPushReturn(arrowT);

      var textElapsed = Math.max(0, elapsed - arrowLead);
      var textT = Math.min(textElapsed / (NUDGE_DUR - arrowLead), 1);
      activeNudge = distance * springPushReturn(textT);

      if (!sweepTriggered && elapsed >= 120) {
        sweepTriggered = true;
        updateDescription(currentIdx);
        triggerSweep();
      }

      render();

      if (elapsed < NUDGE_DUR) {
        requestAnimationFrame(tick);
      } else {
        arrowNudge = 0;
        activeNudge = 0;
        render();
      }
    }
    requestAnimationFrame(tick);
  }

  var paused = false;
  var offScreen = false;

  window.wheelSetPaused = function(val) {
    offScreen = val;
    if (val) pauseSweep();
    else if (!paused) resumeSweep();
  };
  var timerElapsed = 0;
  var timerLastTime = performance.now();
  var timerRAF = null;

  wheelContainer.addEventListener('mouseenter', function() {
    paused = true;
    pauseSweep();
  });
  wheelContainer.addEventListener('mouseleave', function() {
    paused = false;
    timerLastTime = performance.now();
    hoveredEl = null;
    resumeSweep();
    render();
  });

  function advance() {
    var from = 0;
    var to = STEP_DEG;
    var start = performance.now();
    var dur = 600;
    var nudgeStarted = false;
    isAnimating = true;

    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      scrollAngle = from + (to - from) * e;

      if (!nudgeStarted && p > 0.95) {
        nudgeStarted = true;
        currentIdx = (currentIdx + 1) % N;
        scrollAngle = 0;
        isAnimating = false;
        animateNudge();
      }

      render();
      if (p < 1 && !nudgeStarted) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  function timerTick() {
    var now = performance.now();
    if (!paused && !offScreen && !isAnimating) {
      timerElapsed += now - timerLastTime;
    }
    timerLastTime = now;

    if (timerElapsed >= INTERVAL) {
      timerElapsed = 0;
      advance();
    }

    timerRAF = requestAnimationFrame(timerTick);
  }

  function resetTimer() {
    timerElapsed = 0;
    timerLastTime = performance.now();
  }

  timerTick();
  triggerSweep();

  var pointerDown = false;
  var dragging = false;
  var dragStartY = 0;
  var dragVelocity = 0;
  var lastDragY = 0;
  var lastDragTime = 0;
  var DRAG_THRESHOLD = 4;

  function onPointerDown(y) {
    if (isAnimating) return;
    pointerDown = true;
    dragging = false;
    dragStartY = y;
    lastDragY = y;
    lastDragTime = performance.now();
    dragVelocity = 0;
  }

  function onPointerMove(y) {
    if (!pointerDown) return;

    if (!dragging) {
      if (Math.abs(y - dragStartY) < DRAG_THRESHOLD) return;
      dragging = true;
      if (sweepingEl) clearSweep(sweepingEl);
    }

    var now = performance.now();
    var dt = now - lastDragTime;
    if (dt > 0) dragVelocity = (y - lastDragY) / dt;
    lastDragY = y;
    lastDragTime = now;

    var pxPerStep = R * Math.sin(STEP_DEG * DEG);
    scrollAngle = -(y - dragStartY) / pxPerStep * STEP_DEG;
    render();
  }

  function onPointerUp() {
    if (!pointerDown) return;
    pointerDown = false;

    if (!dragging) return;
    dragging = false;

    var stepsOffset = Math.round(scrollAngle / STEP_DEG);
    if (stepsOffset === 0) {
      animateSnapBack();
      return;
    }

    var targetIdx = ((currentIdx + stepsOffset) % N + N) % N;

    currentIdx = targetIdx;
    scrollAngle = scrollAngle - stepsOffset * STEP_DEG;

    var from = scrollAngle;
    var start = performance.now();
    var dur = 200;
    isAnimating = true;

    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        scrollAngle = 0;
        isAnimating = false;
        render();
        resetTimer();
        animateNudge();
      }
    }
    requestAnimationFrame(tick);
  }

  function animateSnapBack() {
    var from = scrollAngle;
    var start = performance.now();
    var dur = 300;
    isAnimating = true;

    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        scrollAngle = 0;
        isAnimating = false;
        render();
        triggerSweep();
      }
    }
    requestAnimationFrame(tick);
  }

  wheelContainer.addEventListener('mousedown', function(e) {
    e.preventDefault();
    onPointerDown(e.clientY);
  });
  window.addEventListener('mousemove', function(e) {
    if (pointerDown) { e.preventDefault(); onPointerMove(e.clientY); }
  });
  window.addEventListener('mouseup', function() { onPointerUp(); });

  wheelContainer.addEventListener('touchstart', function(e) {
    onPointerDown(e.touches[0].clientY);
  }, { passive: true });
  window.addEventListener('touchmove', function(e) {
    if (pointerDown) onPointerMove(e.touches[0].clientY);
  }, { passive: true });
  window.addEventListener('touchend', function() { onPointerUp(); });

  wheelContainer.style.cursor = 'grab';
  wheelContainer.addEventListener('mousedown', function() {
    wheelContainer.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', function() {
    wheelContainer.style.cursor = 'grab';
  });

  return function dispose() {
    if (timerRAF) cancelAnimationFrame(timerRAF);
    if (sweepRAF) cancelAnimationFrame(sweepRAF);
    window.wheelSetPaused = undefined;
  };
}
