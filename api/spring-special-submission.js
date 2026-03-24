const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Create email content based on offering type
    const isWebsite = data.offering === "4-Page Website Development";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
          .detail-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
          .detail-label { font-weight: 600; color: #666; display: inline-block; width: 150px; }
          .detail-value { color: #333; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🌸 Spring Special Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Well Walt Studios</p>
          </div>
          <div class="content">
            <h2>${data.offering}</h2>

            <div class="detail-section">
              <h3 style="margin-top: 0;">Submission Details</h3>

              ${isWebsite ? `
                <div class="detail-row">
                  <span class="detail-label">Contact Info:</span>
                  <span class="detail-value">${data.contactInfo}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Domain Name:</span>
                  <span class="detail-value">${data.domainName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Rush Fee:</span>
                  <span class="detail-value">${data.rushFee ? 'Yes (+$500)' : 'No'}</span>
                </div>
                <div class="detail-row" style="border-bottom: none;">
                  <span class="detail-label">Project Details:</span>
                  <div style="margin-top: 10px; white-space: pre-wrap;">${data.projectDetails}</div>
                </div>
              ` : `
                <div class="detail-row">
                  <span class="detail-label">Contact Info:</span>
                  <span class="detail-value">${data.contactInfo || 'N/A'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Audit Type:</span>
                  <span class="detail-value">${data.auditType}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Rush Fee:</span>
                  <span class="detail-value">${data.rushFee ? 'Yes (+$200)' : 'No'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Tech Details:</span>
                  <div style="margin-top: 10px; white-space: pre-wrap;">${data.techDetails}</div>
                </div>
                <div class="detail-row" style="border-bottom: none;">
                  <span class="detail-label">Desired Outcome:</span>
                  <div style="margin-top: 10px; white-space: pre-wrap;">${data.desiredOutcome}</div>
                </div>
              `}
            </div>

            <div class="detail-section">
              <div class="detail-row" style="border-bottom: none;">
                <span class="detail-label">Total Paid:</span>
                <span class="detail-value" style="font-size: 24px; font-weight: bold; color: #C239B3;">$${data.total}</span>
              </div>
              <div class="detail-row" style="border-bottom: none;">
                <span class="detail-label">Payment ID:</span>
                <span class="detail-value" style="font-size: 12px; color: #666;">${data.paymentId}</span>
              </div>
            </div>

            <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
              <strong>Next Steps:</strong><br>
              Follow up with the client within 24 hours to confirm details and set expectations.
            </p>
          </div>
          <div class="footer">
            <p>Well Walt Studios | <a href="https://wellwaltstudios.com">wellwaltstudios.com</a></p>
            <p style="font-size: 12px; margin-top: 10px;">This notification was sent to ariel@wellwaltstudios.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to you
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: 'ariel@wellwaltstudios.com',
      subject: `🌸 Spring Special: ${data.offering} - $${data.total}`,
      html: emailHtml,
    });

    res.status(200).json({ success: true, message: 'Submission sent successfully' });
  } catch (error) {
    console.error('Email submission error:', error);
    res.status(500).json({ error: error.message || 'Failed to send submission' });
  }
};
