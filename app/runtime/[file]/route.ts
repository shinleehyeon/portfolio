import { readFile } from "node:fs/promises";
import { join } from "node:path";

const FILES: Record<string, string> = {
  "home-runtime.js": join(process.cwd(), "features/home/runtime/home-runtime.js"),
  "wheel.js": join(process.cwd(), "features/home/runtime/wheel.js"),
  "voiceflow-runtime.js": join(process.cwd(), "features/case-study/runtime/voiceflow-runtime.js"),
  "trees.js": join(process.cwd(), "features/case-study/runtime/trees.js"),
};

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const path = FILES[file];
  if (!path) return new Response("Not found", { status: 404 });
  const body = await readFile(path, "utf8");
  return new Response(body, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
