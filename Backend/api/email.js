// api/email.js (or ts)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.snackproject.site');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { itemname, quantity, phoneNumber } = req.body;

  if (!itemname || !quantity || !phoneNumber) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const emailResponse = await resend.emails.send({
      from: 'Satyam <onboarding@resend.dev>',
      to: ['satyamg.tt.23@nitj.ac.in'],
      subject: 'Snack Order',
      html: `<h1>Order Received</h1><p>${itemname} - Qty: ${quantity} - Phone: ${phoneNumber}</p>`,
    });

    return res.status(200).json({ success: true, response: emailResponse });
  } catch (err) {
    console.error("Email send failed:", err.message || err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}