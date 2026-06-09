import sql from "@/app/api/utils/sql";
import { randomBytes } from "crypto";

// Token store (in production use Redis/DB — this is in-memory for simplicity)
const pendingTokens = new Map();

// ─── GET: Linkvertise / Lootlabs redirect back to here ───────────────────────
// Linkvertise redirect URL: https://yourdomain.com/api/keys/callback?provider=linkvertise&token=TOKEN
// Lootlabs redirect URL:    https://yourdomain.com/api/keys/callback?provider=lootlabs&token=TOKEN
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");
    const token = searchParams.get("token");
    const baseUrl =
      process.env.NEXT_PUBLIC_CREATE_APP_URL || "https://yoursite.com";

    if (!token || !pendingTokens.has(token)) {
      return Response.redirect(`${baseUrl}/get-key?error=invalid_token`);
    }

    const pending = pendingTokens.get(token);
    if (Date.now() > pending.expires) {
      pendingTokens.delete(token);
      return Response.redirect(`${baseUrl}/get-key?error=token_expired`);
    }

    // Generate a real key
    const keyValue = "SALT-" + randomBytes(8).toString("hex").toUpperCase();
    await sql(
      `INSERT INTO keys (key_value, duration_days, max_hwids, hwid_reset_days)
       VALUES ($1, $2, $3, $4)`,
      [keyValue, 1, 1, 7],
    );

    pendingTokens.delete(token);

    // Redirect to get-key page with the key
    return Response.redirect(
      `${baseUrl}/get-key?key=${encodeURIComponent(keyValue)}&provider=${provider}`,
    );
  } catch (err) {
    console.error(err);
    const baseUrl =
      process.env.NEXT_PUBLIC_CREATE_APP_URL || "https://yoursite.com";
    return Response.redirect(`${baseUrl}/get-key?error=server_error`);
  }
}

// ─── POST: Start a checkpoint session, returns token + Linkvertise/Lootlabs URL ─
export async function POST(request) {
  try {
    const { provider } = await request.json();
    const token = randomBytes(16).toString("hex");
    const baseUrl =
      process.env.NEXT_PUBLIC_CREATE_APP_URL || "https://yoursite.com";

    // Token valid for 10 minutes
    pendingTokens.set(token, {
      provider,
      expires: Date.now() + 10 * 60 * 1000,
    });

    const callbackUrl = encodeURIComponent(
      `${baseUrl}/api/keys/callback?provider=${provider}&token=${token}`,
    );

    let redirectUrl = "";
    if (provider === "linkvertise") {
      // Replace USER_ID with your actual Linkvertise user ID
      redirectUrl = `https://link-to.net/YOUR_LINKVERTISE_USER_ID/salt-executor-key?r=${callbackUrl}`;
    } else if (provider === "lootlabs") {
      // Replace with your actual Lootlabs link
      redirectUrl = `https://loot-link.com/s?YOUR_LOOTLABS_ID&r=${callbackUrl}`;
    } else {
      return Response.json({ error: "Invalid provider" }, { status: 400 });
    }

    return Response.json({ url: redirectUrl, token });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
