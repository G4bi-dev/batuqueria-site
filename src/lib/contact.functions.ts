import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  date: z.string().max(40).optional().default(""),
  type: z.string().max(120).optional().default(""),
  message: z.string().max(5000).optional().default(""),
});

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env["LOVABLE_API_KEY"];
    const RESEND_API_KEY = process.env["RESEND_API_KEY"];
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) return { ok: false as const, error: "Email service not configured" };

    const row = (k: string, v: string) =>
      `<tr><td style="padding:6px 12px;font-weight:bold">${k}</td><td style="padding:6px 12px">${esc(v || "—").replace(/\n/g, "<br>")}</td></tr>`;
    const html = `<h2>New booking request — Batuqueria website</h2><table>${row("Name", data.name)}${row("Email", data.email)}${row("Event date", data.date)}${row("Event type", data.type)}${row("Message", data.message)}</table>`;

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Batuqueria Website <onboarding@resend.dev>",
        to: ["infobatuqueria@gmail.com"],
        reply_to: data.email,
        subject: `New message from ${data.name}${data.type ? ` — ${data.type}` : ""}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error(`Resend failed [${res.status}]: ${await res.text()}`);
      return { ok: false as const, error: "Send failed" };
    }
    return { ok: true as const };
  });
