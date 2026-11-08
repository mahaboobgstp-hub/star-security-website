
const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const {
    name,
    company,
    email,
    phone,
    message,
    website
  } = req.body || {};

  // Spam honeypot
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (![name, company, email, phone, message].every(
    v => typeof v === "string" && v.trim()
  )) {
    return res.status(400).json({
      error: "Please complete all required fields."
    });
  }

  if (
    name.length > 100 ||
    company.length > 150 ||
    email.length > 150 ||
    phone.length > 25 ||
    message.length > 3000
  ) {
    return res.status(400).json({
      error: "One or more fields are too long."
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      error: "Please enter a valid email address."
    });
  }

  const phoneDigits = phone.replace(/\D/g, "");

  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return res.status(400).json({
      error: "Please enter a valid mobile number."
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return res.status(500).json({
      error: "Email delivery is not configured yet. Please try again later."
    });
  }

  const safe = {
    name: escapeHtml(name.trim()),
    company: escapeHtml(company.trim()),
    email: escapeHtml(email.trim()),
    phone: escapeHtml(phone.trim()),
    message: escapeHtml(message.trim()).replace(/\n/g, "<br>")
  };

  try {
    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from,
          to: ["Admin@starsecurity.info"],
          reply_to: email.trim(),
          subject: `New STAR website enquiry — ${company.trim()}`,

          html: `
            <h2>New STAR Security Website Enquiry</h2>
            <p><b>Name:</b> ${safe.name}</p>
            <p><b>Company:</b> ${safe.company}</p>
            <p><b>Email:</b> ${safe.email}</p>
            <p><b>Mobile Number:</b> ${safe.phone}</p>
            <p><b>Requirements:</b><br>${safe.message}</p>
          `,

          text: `
New STAR Security Website Enquiry

Name: ${name}
Company: ${company}
Email: ${email}
Mobile Number: ${phone}

Requirements:
${message}
          `
        })
      }
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Resend delivery error:", result);

      return res.status(502).json({
        error: "We could not send your enquiry right now. Please try again later."
      });
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      error: "A server error occurred. Please try again later."
    });
  }
}
