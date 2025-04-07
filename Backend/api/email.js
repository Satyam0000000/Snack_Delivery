import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { itemname, quantity, phoneNumber } = req.body;

  if (!itemname || !quantity || !phoneNumber) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Satyam Goswami",
          email: "satyamgoswami2705@gmail.com",
        },
        to: [{ email: "satyamg.tt.23@nitj.ac.in" }],
        subject: "Snack Order",
        htmlContent: `<h1>Order Received</h1><p>${itemname} - Qty: ${quantity} - Phone: ${phoneNumber}</p>`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    res.status(200).json({ message: "Email sent", response: response.data });
  } catch (err) {
    console.error("Failed to send email:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to send email" });
  }
}