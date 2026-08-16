import { NextResponse } from "next/server";
import { coerceEnquiry, hasErrors, validateEnquiry } from "@/lib/enquiry";

/**
 * ============================================================================
 * Enquiry endpoint — INTEGRATION POINT
 * ============================================================================
 * This route validates the enquiry and then forwards it to whatever delivery
 * service the restaurant chooses. Nothing is faked: with no service configured
 * it reports honestly that the message could not be sent, and the form tells
 * the visitor to call instead.
 *
 * To switch it on, set ENQUIRY_WEBHOOK_URL in your hosting environment (see
 * .env.example) to an endpoint that delivers the payload — a mail service such
 * as Resend or Postmark, a Zapier/Make hook, or a WhatsApp Business webhook.
 *
 * The variable is server-only: it is read here, on the server, and is never
 * exposed to the browser.
 * ============================================================================
 */

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400 },
    );
  }

  const enquiry = coerceEnquiry(body);
  const errors = validateEnquiry(enquiry);

  // Server-side validation is the authoritative check — client validation is
  // only there to give faster feedback.
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Enquiries are not connected yet. Please call the restaurant directly.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...enquiry,
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error(`Delivery failed: ${response.status}`);

    return NextResponse.json({ ok: true });
  } catch {
    // Detail is deliberately withheld from the response: upstream errors can
    // leak the webhook host or credentials.
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not send your message just now. Please call the restaurant.",
      },
      { status: 502 },
    );
  }
}
