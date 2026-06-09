import sql from "@/app/api/utils/sql";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const hwid = searchParams.get("hwid");

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!key || !hwid) return new Response("invalid", { status: 200 });

  try {
    // Check IP ban
    const ipBan = await sql(
      `SELECT * FROM banned_items WHERE type = 'ip' AND value = $1`,
      [ip],
    );
    if (ipBan.length) {
      if (
        !ipBan[0].banned_until ||
        new Date(ipBan[0].banned_until) > new Date()
      ) {
        return new Response("banned", { status: 200 });
      }
    }

    // Check HWID ban
    const hwidBan = await sql(
      `SELECT * FROM banned_items WHERE type = 'hwid' AND value = $1`,
      [hwid],
    );
    if (hwidBan.length) {
      if (
        !hwidBan[0].banned_until ||
        new Date(hwidBan[0].banned_until) > new Date()
      ) {
        return new Response("banned", { status: 200 });
      }
    }

    const rows = await sql(
      `SELECT * FROM keys WHERE key_value = $1 AND is_active = TRUE`,
      [key],
    );
    if (!rows.length) return new Response("invalid", { status: 200 });
    const existingKey = rows[0];

    // Log the visit
    await sql(
      `INSERT INTO ip_logs (ip_address, page, key_value, hwid, user_agent) VALUES ($1, $2, $3, $4, $5)`,
      [
        ip,
        "/api/validate",
        key,
        hwid,
        request.headers.get("user-agent") || "unknown",
      ],
    );

    // Expiry check
    if (
      existingKey.expires_at &&
      new Date(existingKey.expires_at) < new Date()
    ) {
      await sql(`UPDATE keys SET is_active = FALSE WHERE id = $1`, [
        existingKey.id,
      ]);
      return new Response("invalid", { status: 200 });
    }

    // HWID logic
    if (!existingKey.hwid) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + existingKey.duration_days);
      await sql(`UPDATE keys SET hwid = $1, expires_at = $2 WHERE id = $3`, [
        hwid,
        expiresAt,
        existingKey.id,
      ]);
      return new Response("valid", { status: 200 });
    }

    if (existingKey.hwid === hwid)
      return new Response("valid", { status: 200 });
    return new Response("invalid", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("invalid", { status: 200 });
  }
}
