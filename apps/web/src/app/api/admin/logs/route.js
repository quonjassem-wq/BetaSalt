import sql from "@/app/api/utils/sql";

const ADMIN_PASS = "SALTY-WAS-HEREWITHSUGAR_ezez.meow.ez.kidd_keno";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");
    if (password !== ADMIN_PASS)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    const rows = await sql(
      `SELECT * FROM ip_logs ORDER BY visited_at DESC LIMIT 500`,
    );
    return Response.json({ logs: rows });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { page, key_value, hwid } = body;
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const ua = request.headers.get("user-agent") || "unknown";

    await sql(
      `INSERT INTO ip_logs (ip_address, page, key_value, hwid, user_agent) VALUES ($1, $2, $3, $4, $5)`,
      [ip, page || "/", key_value || null, hwid || null, ua],
    );
    return Response.json({ logged: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
