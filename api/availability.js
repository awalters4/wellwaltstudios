const availability = require('./config/availability');
const fs = require('fs');
const path = require('path');

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

// Generate time slots for a given date
function generateTimeSlots(date, duration) {
  const dayOfWeek = date.getDay();
  const dateStr = date.toISOString().split('T')[0];

  // Check if date is in blocked dates
  if (availability.blockedDates.includes(dateStr)) {
    return [];
  }

  // Get hours for this day (custom or regular)
  let hours = availability.customAvailability[dateStr] || availability.weeklyHours[dayOfWeek];

  if (!hours) {
    return [];
  }

  // Parse start and end times
  const [startHour, startMin] = hours.start.split(':').map(Number);
  const [endHour, endMin] = hours.end.split(':').map(Number);

  const slots = [];
  let currentTime = startHour * 60 + startMin; // Convert to minutes
  const endTime = endHour * 60 + endMin;

  // Generate slots
  while (currentTime + duration <= endTime) {
    const hour = Math.floor(currentTime / 60);
    const min = currentTime % 60;
    const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    slots.push(timeStr);
    currentTime += duration + availability.bufferTime;
  }

  return slots;
}

// Check if a slot is booked
function isSlotBooked(dateStr, timeStr, duration, bookings) {
  const requestedStart = new Date(`${dateStr}T${timeStr}`);
  const requestedEnd = new Date(requestedStart.getTime() + duration * 60000);

  for (const booking of bookings) {
    if (booking.date !== dateStr) continue;

    const bookedStart = new Date(`${booking.date}T${booking.time}`);
    const bookedEnd = new Date(bookedStart.getTime() + booking.duration * 60000);

    // Check for overlap
    if (requestedStart < bookedEnd && requestedEnd > bookedStart) {
      return true;
    }
  }

  return false;
}

// Main handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, duration = 60 } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const requestDate = new Date(date + 'T00:00:00');
    const durationNum = parseInt(duration);

    // Get existing bookings
    const bookings = getBookings();

    // Generate all possible slots
    const allSlots = generateTimeSlots(requestDate, durationNum);

    // Filter out booked slots
    const availableSlots = allSlots.filter(slot =>
      !isSlotBooked(date, slot, durationNum, bookings)
    );

    res.status(200).json({
      date,
      duration: durationNum,
      slots: availableSlots
    });
  } catch (error) {
    console.error('Error in availability API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
