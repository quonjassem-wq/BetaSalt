export async function GET() {
  return new Response("0.0.1", {
    headers: { "Content-Type": "text/plain" },
  });
}
