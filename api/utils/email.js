const nodemailer = require('nodemailer');

// Create transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// Format date for emails
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format time for emails
function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

// Get service name
function getServiceName(type) {
  const services = {
    'tech-audit': 'Tech Audit',
    'hourly-consulting': 'Hourly Consulting',
    'fractional-cto': 'Fractional CTO Services',
    'development': 'Development Services',
  };
  return services[type] || 'Service';
}

// Send booking confirmation email
async function sendBookingConfirmation(booking) {
  const transporter = createTransporter();

  const serviceName = getServiceName(booking.type);
  const dateStr = formatDate(booking.date);
  const timeStr = formatTime(booking.time);

  // Customer email
  const customerEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .booking-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
        .detail-label { font-weight: 600; color: #666; }
        .detail-value { color: #333; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
        .button { display: inline-block; background: linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Booking Confirmed! ✓</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Well Walt Studios</p>
        </div>
        <div class="content">
          <p>Hi ${booking.name},</p>
          <p>Thank you for booking with Well Walt Studios! Your ${serviceName.toLowerCase()} has been confirmed.</p>

          <div class="booking-details">
            <h3 style="margin-top: 0;">Booking Details</h3>
            <div class="detail-row">
              <span class="detail-label">Service:</span>
              <span class="detail-value">${serviceName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${dateStr}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${timeStr}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Duration:</span>
              <span class="detail-value">${booking.duration} minutes</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount Paid:</span>
              <span class="detail-value">$${booking.amount.toFixed(2)}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">Booking ID:</span>
              <span class="detail-value">${booking.id}</span>
            </div>
          </div>

          <h3>What's Next?</h3>
          <ul>
            <li>You'll receive a calendar invite shortly</li>
            <li>A meeting link will be sent 24 hours before your session</li>
            ${booking.type === 'tech-audit' ? '<li>Please share any relevant links or information about your systems before our call</li>' : ''}
            ${booking.notes ? `<li>Your notes: "${booking.notes}"</li>` : ''}
          </ul>

          <p>If you need to reschedule or have any questions, reply to this email or reach out directly.</p>

          <p>Looking forward to working with you!</p>
          <p><strong>Ariel Walters</strong><br>
          Founder, Well Walt Studios<br>
          <a href="mailto:ariel@wellwaltstudios.com">ariel@wellwaltstudios.com</a></p>
        </div>
        <div class="footer">
          <p>Well Walt Studios | <a href="https://wellwaltstudios.com">wellwaltstudios.com</a></p>
          <p style="font-size: 12px; margin-top: 10px;">This confirmation was sent to ${booking.email}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to customer
  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
    to: booking.email,
    subject: `Booking Confirmed: ${serviceName} - ${dateStr}`,
    html: customerEmailHtml,
  });

  // Send notification to you
  const notificationHtml = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: sans-serif; padding: 20px;">
      <h2>New Booking Received</h2>
      <p><strong>Service:</strong> ${serviceName}</p>
      <p><strong>Client:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Date:</strong> ${dateStr}</p>
      <p><strong>Time:</strong> ${timeStr}</p>
      <p><strong>Duration:</strong> ${booking.duration} minutes</p>
      <p><strong>Amount:</strong> $${booking.amount.toFixed(2)}</p>
      ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
      <p><strong>Booking ID:</strong> ${booking.id}</p>
      <hr>
      <p style="font-size: 12px; color: #666;">Add this to your calendar and prepare for the session!</p>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_USER, // Your Gmail
    subject: `📅 New Booking: ${serviceName} - ${booking.name}`,
    html: notificationHtml,
  });

  return true;
}

module.exports = {
  sendBookingConfirmation,
};
