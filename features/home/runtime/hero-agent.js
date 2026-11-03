const VERT = `
attribute vec2 p;
varying vec2 v;
void main() {
  v = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D u;
uniform vec2 px;
uniform vec3 color;
uniform vec3 accent;
uniform vec2 edge;
uniform float fade;
uniform vec2 cursor;
uniform float bloom;
uniform float aspect;
varying vec2 v;
float val(vec2 q) {
  vec4 c = texture2D(u, q);
  return c.a * 0.9 + dot(c.rgb, vec3(0.299, 0.587, 0.114)) * 0.7;
}
float edgeAt(vec2 q) {
  float tl = val(q + px * vec2(-1.0, -1.0));
  float t = val(q + px * vec2(0.0, -1.0));
  float tr = val(q + px * vec2(1.0, -1.0));
  float l = val(q + px * vec2(-1.0, 0.0));
  float r = val(q + px * vec2(1.0, 0.0));
  float bl = val(q + px * vec2(-1.0, 1.0));
  float b = val(q + px * vec2(0.0, 1.0));
  float br = val(q + px * vec2(1.0, 1.0));
  float gx = -tl - 2.0 * l - bl + tr + 2.0 * r + br;
  float gy = -tl - 2.0 * t - tr + bl + 2.0 * b + br;
  return smoothstep(edge.x, edge.y, length(vec2(gx, gy)));
}
void main() {
  float a = edgeAt(v);
  vec3 c = color;
  vec2 d = (v - cursor) * vec2(aspect, 1.0);
  float near = (1.0 - smoothstep(0.0, 0.3, length(d))) * bloom;
  if (near > 0.01) {
    float halo = 0.0;
    for (int i = 0; i < 8; i++) {
      float ang = float(i) * 0.7853982 + 0.3;
      vec2 o = vec2(cos(ang), sin(ang)) * px;
      halo += edgeAt(v + o * 4.0) + 0.8 * edgeAt(v + o * 8.0) + 0.6 * edgeAt(v + o * 13.0) + 0.45 * edgeAt(v + o * 19.0) + 0.3 * edgeAt(v + o * 26.0);
    }
    halo /= 12.0;
    float lit = (a * 1.6 + halo * 0.9) * near;
    c = mix(color, accent, min(1.0, near * 1.2));
    a = min(1.0, a * fade + lit);
  } else {
    a *= fade;
  }
  gl_FragColor = vec4(c * a, a);
}`;

function asset(path) {
  const rel = path.replace(/^\/landing\//, "");
  return new URL(`/jimo/${rel}`, window.location.origin).href;
}

function facePass(canvas) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
  });
  if (!gl) return null;
  const compile = (type, src) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.uniform3f(gl.getUniformLocation(program, "color"), 0.91, 0.537, 0.588);
  gl.uniform3f(gl.getUniformLocation(program, "accent"), 0.62, 0.78, 1);
  gl.uniform2f(gl.getUniformLocation(program, "edge"), 0.5, 1.6);
  const px = gl.getUniformLocation(program, "px");
  const fade = gl.getUniformLocation(program, "fade");
  const cursor = gl.getUniformLocation(program, "cursor");
  const bloom = gl.getUniformLocation(program, "bloom");
  const aspect = gl.getUniformLocation(program, "aspect");
  return {
    draw(source, amount, point, glow) {
      if (!source.width || !source.height) return;
      if (canvas.width !== source.width || canvas.height !== source.height) {
        canvas.width = source.width;
        canvas.height = source.height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(px, 1 / canvas.width, 1 / canvas.height);
      gl.uniform1f(fade, amount);
      gl.uniform2f(cursor, point.x, point.y);
      gl.uniform1f(bloom, glow);
      gl.uniform1f(aspect, canvas.width / canvas.height);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
  };
}

function loadScenes() {
  const factories = new Map();
  const cache = new Map();
  const previous = globalThis.TURBOPACK;
  globalThis.TURBOPACK = {
    push(parts) {
      let i = typeof parts[0] === "number" ? 0 : 1;
      for (; i + 1 < parts.length; i += 2) factories.set(parts[i], parts[i + 1]);
    },
  };
  return fetch("/jimo/glove-source.js")
    .then((response) => response.text())
    .then((source) => {
      (0, eval)(source
        .replace("G=0,S=1/0,L=!1", "G=0,S=2.35,L=!0")
        .replace("I(a<.5)", "I(!0)")
        .replace("180*a+", "")
        .replace("S+=1.55*t", "(S=S+1.55*t>8.95?2.35:S+1.55*t)"));
      globalThis.TURBOPACK = previous;
      factories.set(69801, (mod) => {
        mod.s(["asset", 0, asset, "withAssetOrigin", 0, (value) => value]);
      });
      const load = (id) => {
        if (cache.has(id)) return cache.get(id);
        const factory = factories.get(id);
        if (!factory) throw new Error(`missing module ${id}`);
        const exp = {};
        const api = {
          s(list) {
            for (let i = 0; i < list.length; i += 3) exp[list[i]] = list[i + 2];
          },
          i: load,
        };
        cache.set(id, exp);
        factory(api);
        return exp;
      };
      return load;
    });
}

export function startHeroAgent(root) {
  const faceSrc = root.querySelector("[data-face-src]");
  const faceCanvas = root.querySelector(".hero-agent__gl");
  const face = root.querySelector(".hero-agent__face");
  if (!faceSrc || !faceCanvas || !face) return () => {};

  const hand = document.createElement("span");
  hand.className = "hero-agent__hand";
  hand.setAttribute("aria-hidden", "true");
  root.appendChild(hand);

  let disposed = false;
  let frameId = 0;
  const cleanups = [() => hand.remove()];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const point = {
    lookX: 0,
    lookY: 0,
    faceX: -9,
    faceY: -9,
  };
  let glow = 0;
  let fadeIn = 0;

  const place = () => {
    const x = face.offsetLeft + face.clientWidth * 0.7;
    const y = face.offsetTop - 6;
    hand.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };
  place();

  const onMove = (event) => {
    const box = faceCanvas.getBoundingClientRect();
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2 - 0.09 * box.height;
    point.lookX = (event.clientX - cx) / (0.5 * window.innerWidth);
    point.lookY = -(event.clientY - cy) / (0.6 * window.innerHeight);
    point.faceX = (event.clientX - box.left) / box.width;
    point.faceY = 1 - (event.clientY - box.top) / box.height;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  cleanups.push(() => window.removeEventListener("pointermove", onMove));

  loadScenes().then(async (load) => {
    if (disposed) return;
    const glove = await load(36869).createGloveScene(hand);
    if (disposed) {
      glove.dispose();
      return;
    }
    glove.setArrival(1);
    const pass = facePass(faceCanvas);
    const avatar = await load(59263).createAvatarScene(faceSrc, {
      zoom: 2.9,
      pixelRatio: 1,
      lift: 47,
      tilt: -5,
    });
    if (disposed) {
      glove.dispose();
      avatar.dispose();
      return;
    }

    let last = performance.now();
    const tick = (now) => {
      if (disposed) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      glove.setPointer(0, 0);
      glove.frame(dt, now / 1000);
      place();
      avatar.look(point.lookX, point.lookY);
      avatar.frame(dt, now / 1000);
      fadeIn = Math.min(1, fadeIn + 1.6 * dt);
      const over = point.faceX >= 0 && point.faceX <= 1 && point.faceY >= 0.5 && point.faceY <= 1;
      glow += ((over ? 1 : 0) - glow) * Math.min(1, 7 * dt);
      pass?.draw(avatar.canvas, 1 - (1 - fadeIn) ** 3, { x: point.faceX, y: point.faceY }, glow);
      root.classList.add("is-live");
      if (!reduced) frameId = requestAnimationFrame(tick);
    };

    const onResize = () => {
      glove.resize();
      avatar.resize();
      place();
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));

    if (reduced) {
      glove.setArrival(1);
      glove.frame(0.016, 0);
      avatar.frame(0.016, 0);
      pass?.draw(avatar.canvas, 1, { x: point.faceX, y: point.faceY }, glow);
      root.classList.add("is-live");
    } else {
      frameId = requestAnimationFrame(tick);
    }

    cleanups.push(() => {
      cancelAnimationFrame(frameId);
      glove.dispose();
      avatar.dispose();
    });
  }).catch((error) => {
    console.error(error);
  });

  return () => {
    disposed = true;
    for (const cleanup of cleanups) cleanup();
  };
}
