import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { itemname, quantity, phoneNumber } = req.body;

  if (!itemname || !quantity || !phoneNumber) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const emailResponse = await resend.emails.send({
      from: 'Satyam <onboarding@resend.dev>', // Or your verified domain email
      to: ['satyamg.tt.23@nitj.ac.in'],
      subject: 'Snack Order',
      html: `<h1>Order Received</h1><p>${itemname} - Qty: ${quantity} - Phone: ${phoneNumber}</p>`,
    });

    res.status(200).json({ message: "Email sent", response: emailResponse });
  } catch (err) {
    console.error("Failed to send email:", err.message || err);
    res.status(500).json({ error: "Failed to send email" });
  }
}