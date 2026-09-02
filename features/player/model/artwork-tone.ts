export type ArtworkTone = {
  a: string;
  b: string;
  ink: string;
  muted: string;
};

export const FALLBACK_TONE: ArtworkTone = {
  a: "168, 174, 184",
  b: "118, 126, 138",
  ink: "6, 6, 6",
  muted: "6, 6, 6",
};

function rgb(r: number, g: number, b: number) {
  return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
}

function punch(r: number, g: number, b: number) {
  const l = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  return {
    r: Math.min(255, Math.max(0, l + (r - l) * 1.35)),
    g: Math.min(255, Math.max(0, l + (g - l) * 1.35)),
    b: Math.min(255, Math.max(0, l + (b - l) * 1.35)),
  };
}

function luma(r: number, g: number, b: number) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

export function sampleArtwork(src: string): Promise<ArtworkTone> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const size = 24;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        resolve(FALLBACK_TONE);
        return;
      }
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      const bins = Array.from({ length: 12 }, () => ({ r: 0, g: 0, b: 0, n: 0 }));
      let ar = 0;
      let ag = 0;
      let ab = 0;
      let an = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const max = Math.max(r, g, b) / 255;
        const min = Math.min(r, g, b) / 255;
        const l = (max + min) / 2;
        const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
        ar += r;
        ag += g;
        ab += b;
        an += 1;
        if (l < 0.1 || l > 0.92 || s < 0.14) continue;
        let h = 0;
        const d = max - min;
        if (d) {
          if (max === r / 255) h = ((g / 255 - b / 255) / d + (g < b ? 6 : 0)) / 6;
          else if (max === g / 255) h = ((b / 255 - r / 255) / d + 2) / 6;
          else h = ((r / 255 - g / 255) / d + 4) / 6;
        }
        const bin = bins[Math.min(11, Math.floor(h * 12))];
        bin.r += r;
        bin.g += g;
        bin.b += b;
        bin.n += 1;
      }

      const ranked = bins.filter((bin) => bin.n).sort((x, y) => y.n - x.n);
      const first = ranked[0];
      const second = ranked[1] || first;
      const a = first
        ? { r: first.r / first.n, g: first.g / first.n, b: first.b / first.n }
        : { r: ar / Math.max(an, 1), g: ag / Math.max(an, 1), b: ab / Math.max(an, 1) };
      const bb = second
        ? { r: second.r / second.n, g: second.g / second.n, b: second.b / second.n }
        : a;
      const pa = punch(a.r, a.g, a.b);
      const pb = punch(bb.r, bb.g, bb.b);
      const light = luma(pa.r, pa.g, pa.b) > 0.62;
      resolve({
        a: rgb(pa.r, pa.g, pa.b),
        b: rgb(pb.r, pb.g, pb.b),
        ink: light ? "18, 18, 20" : "255, 255, 255",
        muted: light ? "18, 18, 20" : "255, 255, 255",
      });
    };
    img.onerror = () => resolve(FALLBACK_TONE);
    img.src = src;
  });
}
