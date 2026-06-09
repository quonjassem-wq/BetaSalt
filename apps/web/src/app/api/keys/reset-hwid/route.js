import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { keyValue, hwid } = await request.json();
    if (!keyValue || !hwid)
      return Response.json({ error: "Missing params" }, { status: 400 });

    const rows = await sql(
      `SELECT * FROM keys WHERE key_value = $1 AND is_active = TRUE`,
      [keyValue],
    );
    if (!rows.length)
      return Response.json({ error: "Invalid key" }, { status: 404 });

    const key = rows[0];
    if (key.hwid !== hwid)
      return Response.json({ error: "HWID mismatch" }, { status: 403 });

    // Check if reset is allowed yet
    const resetDays = key.hwid_reset_days || 7;
    const lastReset = key.last_hwid_reset
      ? new Date(key.last_hwid_reset)
      : new Date(key.created_at);
    const nextReset = new Date(lastReset);
    nextReset.setDate(nextReset.getDate() + resetDays);

    if (new Date() < nextReset) {
      return Response.json(
        {
          error: `HWID reset not available yet. Next reset: ${nextReset.toLocaleString()}`,
          next_reset: nextReset,
        },
        { status: 429 },
      );
    }

    await sql(
      `UPDATE keys SET hwid = NULL, last_hwid_reset = CURRENT_TIMESTAMP WHERE id = $1`,
      [key.id],
    );
    return Response.json({ success: true, message: "HWID reset successfully" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
