import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: 'https://www.snackproject.site', // ✅ allow frontend domain
  methods: ['POST'],
  credentials: true,
}));

app.use(express.json()); // to parse JSON body

app.post('/api/email', async (req, res) => {
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

    res.status(200).json({ message: "Email sent", response: emailResponse });
  } catch (err) {
    console.error("Failed to send email:", err.message || err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Optional: if you're hosting on Vercel, export it
export default app;