export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") || "";
  if (!/^[\w-]{6,20}$/.test(id)) return new Response("invalid", { status: 400 });

  const res = await fetch(`https://i.ytimg.com/vi/${id}/mqdefault.jpg`);
  if (!res.ok) return new Response("missing", { status: 502 });

  return new Response(res.body, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
