import sql from "@/app/api/utils/sql";

const ADMIN_PASS = "SALTY-WAS-HEREWITHSUGAR_ezez.meow.ez.kidd_keno";

export async function POST(request) {
  try {
    const { password, type, value, reason, banned_until } =
      await request.json();
    if (password !== ADMIN_PASS)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (!type || !value)
      return Response.json(
        { error: "type and value required" },
        { status: 400 },
      );

    const rows = await sql(
      `INSERT INTO banned_items (type, value, reason, banned_until)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (value) DO UPDATE SET reason = $3, banned_until = $4, banned_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [type, value, reason || "No reason provided", banned_until || null],
    );
    return Response.json({ banned: rows[0] });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { password, value } = await request.json();
    if (password !== ADMIN_PASS)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    await sql(`DELETE FROM banned_items WHERE value = $1`, [value]);
    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");
    if (password !== ADMIN_PASS)
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    const rows = await sql(
      `SELECT * FROM banned_items ORDER BY banned_at DESC LIMIT 200`,
    );
    return Response.json({ bans: rows });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
