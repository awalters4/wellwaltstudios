const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { sendBookingConfirmation } = require('./utils/email');

// Helper to read bookings
function getBookings() {
  try {
    const bookingsPath = path.join(__dirname, 'config', 'bookings.json');
    const data = fs.readFileSync(bookingsPath, 'utf8');
    return JSON.parse(data).bookings || [];
  } catch (error) {
    return [];
  }
}

// Helper to save bookings
function saveBookings(bookings) {
  const bookingsPath = path.join(__dirname, 'config', 'bookings.json');
  fs.writeFileSync(bookingsPath, JSON.stringify({ bookings }, null, 2));
}

// Generate booking ID
function generateBookingId() {
  return 'BK-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

// Main handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Retrieve bookings
  if (req.method === 'GET') {
    try {
      const bookings = getBookings();
      res.status(200).json({ bookings });
    } catch (error) {
      console.error('Error retrieving bookings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    return;
  }

  // POST - Create booking
  if (req.method === 'POST') {
    try {
      const { type, amount, hours, deposit, name, email, phone, notes, slot } = req.body;

      // Validation
      if (!type || !amount || !name || !email || !phone || !slot) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Calculate duration based on booking type
      let duration;
      switch (type) {
        case 'tech-audit':
          duration = 30;
          break;
        case 'hourly-consulting':
          duration = hours * 60;
          break;
        case 'fractional-cto':
        case 'development':
          duration = 120;
          break;
        default:
          duration = 60;
      }

      // Create booking object
      const booking = {
        id: generateBookingId(),
        type,
        amount,
        hours: hours || null,
        deposit: deposit || false,
        name,
        email,
        phone,
        notes: notes || '',
        date: slot.date ? new Date(slot.date).toISOString().split('T')[0] : slot.datetime?.split(' ')[0],
        time: slot.time,
        duration,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };

      // Save booking
      const bookings = getBookings();
      bookings.push(booking);
      saveBookings(bookings);

      // Send confirmation email
      try {
        await sendBookingConfirmation(booking);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the booking if email fails
      }

      res.status(201).json({
        success: true,
        bookingId: booking.id,
        booking
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    return;
  }

  // Method not allowed
  res.status(405).json({ error: 'Method not allowed' });
};
