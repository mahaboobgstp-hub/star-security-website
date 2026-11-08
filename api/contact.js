
const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed."
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {};

    const {
      name,
      company,
      email,
      message,
      website
    } = body;

    // Honeypot spam protection
    if (website) {
      return res.status(200).json({ ok: true });
    }

    // Required field validation
    if (
      ![name, company, email, message].every(
        value => typeof value === "string" && value.trim()
      )
    ) {
      return res.status(400).json({
        error: "Please complete all required fields."
      });
    }

    const cleanName = name.trim();
    const cleanCompany = company.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // Length validation
    if (
      cleanName.length > 100 ||
      cleanCompany.length > 150 ||
      cleanEmail.length > 150 ||
      cleanMessage.length > 3000
    ) {
      return res.status(400).json({
        error: "One or more fields are too long."
      });
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({
        error: "Please enter a valid email address."
      });
    }

    // Server-side environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;

    if (!apiKey || !from) {
      console.error("Email configuration is missing.");

      return res.status(500).json({
        error: "Email delivery is not configured yet. Please try again later."
      });
    }

    // Safe HTML values
    const safeName = escapeHtml(cleanName);
    const safeCompany = escapeHtml(cleanCompany);
    const safeEmail = escapeHtml(cleanEmail);
    const safeMessage = escapeHtml(cleanMessage).replace(
      /\n/g,
      "<br>"
    );

    const subjectCompany = cleanCompany
      .replace(/[\r\n]+/g, " ")
      .slice(0, 150);

    // Send enquiry through Resend
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
          reply_to: cleanEmail,
          subject: `New STAR website enquiry - ${subjectCompany}`,

          html: `
            <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#10213a;">
              <div style="background:#071a35;padding:22px;color:white;">
                <h2 style="margin:0;color:#e8b83f;">
                  STAR Security & Staffing
                </h2>
                <p style="margin:8px 0 0;color:white;">
                  New Website Enquiry
                </p>
              </div>

              <div style="padding:24px;border:1px solid #e5d7bc;">
                <p><strong>Name:</strong> ${safeName}</p>

                <p><strong>Company / Organisation:</strong>
                  ${safeCompany}
                </p>

                <p><strong>Email:</strong>
                  ${safeEmail}
                </p>

                <hr style="border:none;border-top:1px solid #ddd;">

                <h3>Requirements</h3>

                <p style="line-height:1.7;">
                  ${safeMessage}
                </p>
              </div>

              <p style="font-size:12px;color:#777;text-align:center;">
                This enquiry was submitted through the
                STAR Security & Staffing website.
              </p>
            </div>
          `,

          text: `
STAR SECURITY & STAFFING
NEW WEBSITE ENQUIRY

Name: ${cleanName}

Company / Organisation: ${cleanCompany}

Email: ${cleanEmail}

Requirements:
${cleanMessage}
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

    return res.status(200).json({
      ok: true,
      message: "Your enquiry has been submitted successfully."
    });

  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      error: "A server error occurred. Please try again later."
    });
  }
}
