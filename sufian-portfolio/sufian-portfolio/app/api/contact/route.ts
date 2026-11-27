import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 * Spam protection: honeypot field, minimum fill time, length limits and a simple per IP rate limit.
 * Sending: if RESEND_API_KEY is set (see .env.example) the message is emailed through Resend.
 * Without it, the form tells the visitor to email directly, so nothing is silently lost.
 */
const hits = new Map<string, number[]>();
const clean = (s: unknown, max: number) => (typeof s === "string" ? s.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ message: "Too many messages. Please try again later." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Bots fill hidden fields or submit instantly. Pretend success so they do not retry.
  if (clean(body.website, 200) || Number(body.elapsed) < 2500) return NextResponse.json({ message: "Thanks, your message has been sent." });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 3000) : "";
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || subject.length < 3 || message.length < 10) {
    return NextResponse.json({ message: "Please check the form and try again." }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    return NextResponse.json({ message: `The contact form is not connected yet. Please email ${to || "sufiansayed@outlook.com"} directly.` }, { status: 503 });
  }

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio: ${subject}`,
      html: `<p><strong>${esc(name)}</strong> (${esc(email)}) wrote:</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!r.ok) return NextResponse.json({ message: "Sorry, the message could not be sent. Please email directly." }, { status: 502 });
  return NextResponse.json({ message: "Thanks, your message has been sent. I will reply soon." });
}
