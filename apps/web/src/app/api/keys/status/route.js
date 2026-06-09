import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { keyValue } = await request.json();
    if (!keyValue)
      return Response.json({ error: "Key required" }, { status: 400 });

    const rows = await sql(`SELECT * FROM keys WHERE key_value = $1`, [
      keyValue,
    ]);
    if (!rows.length)
      return Response.json({ error: "Invalid key" }, { status: 404 });
    const k = rows[0];

    const valid =
      k.is_active && (!k.expires_at || new Date(k.expires_at) > new Date());

    // Compute next HWID reset
    const resetDays = k.hwid_reset_days || 7;
    const lastReset = k.last_hwid_reset
      ? new Date(k.last_hwid_reset)
      : k.created_at
        ? new Date(k.created_at)
        : new Date();
    const nextReset = new Date(lastReset);
    nextReset.setDate(nextReset.getDate() + resetDays);
    const canResetHwid = new Date() >= nextReset;

    return Response.json({
      valid,
      hwid: k.hwid,
      expires_at: k.expires_at,
      duration: k.duration_days,
      max_hwids: k.max_hwids,
      hwid_reset_days: resetDays,
      next_hwid_reset: nextReset,
      can_reset_hwid: canResetHwid,
      note: k.note,
      key_value: k.key_value,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
