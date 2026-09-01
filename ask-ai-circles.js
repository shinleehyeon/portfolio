// "Ask AI about Gregory" circle animation.
// - Rolls circles in from the left (rightmost first) when the block becomes visible.
// - Makes circles draggable; siblings visually shift to open up a slot while dragging.
// - On release, DOM is reordered and Flip smoothly settles the new arrangement.
// Shared across index + case study pages. Requires GSAP core, Draggable, Flip
// (InertiaPlugin optional and unused — inertia is disabled for cleaner snapping).
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap || !window.Draggable || !window.Flip) return;
  gsap.registerPlugin(Draggable, Flip);

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

  // Entrance: short fast roll in from left, rightmost arrives first
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

  // Draggable: visual sibling shifts during drag, DOM reorder on release
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
