import sql from "@/app/api/utils/sql";
import { randomBytes } from "crypto";

const ADMIN_PASS = "SALTY-WAS-HEREWITHSUGAR_ezez.meow.ez.kidd_keno";

export async function POST(request) {
  try {
    const { password, duration, amount, max_hwids, hwid_reset_days, note } =
      await request.json();

    if (password !== ADMIN_PASS) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const count = Math.min(Math.max(parseInt(amount) || 1, 1), 100);
    const days = Math.max(parseInt(duration) || 1, 1);
    const hwidLimit = Math.max(parseInt(max_hwids) || 1, 1);
    const hwidReset = Math.max(parseInt(hwid_reset_days) || 7, 1);
    const keyNote = note || null;

    const keys = [];
    for (let i = 0; i < count; i++) {
      const keyValue = "SALT-" + randomBytes(8).toString("hex").toUpperCase();
      const rows = await sql(
        `INSERT INTO keys (key_value, duration_days, max_hwids, hwid_reset_days, note)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [keyValue, days, hwidLimit, hwidReset, keyNote],
      );
      keys.push(rows[0]);
    }

    return Response.json({ keys });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to generate keys" }, { status: 500 });
  }
}
