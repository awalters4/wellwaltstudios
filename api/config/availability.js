// Weekly availability configuration
// Times are in 24-hour format

module.exports = {
  // Regular weekly hours
  weeklyHours: {
    1: { start: '10:00', end: '14:00' }, // Monday
    2: { start: '10:00', end: '14:00' }, // Tuesday
    3: { start: '10:00', end: '14:00' }, // Wednesday
    4: { start: '10:00', end: '14:00' }, // Thursday
    6: { start: '10:00', end: '16:00' }, // Saturday
  },

  // Blocked dates (manually add specific dates you're unavailable)
  // Format: 'YYYY-MM-DD'
  blockedDates: [],

  // Custom available dates outside regular hours
  // Format: { 'YYYY-MM-DD': { start: '10:00', end: '14:00' } }
  customAvailability: {},

  // Booking duration options (in minutes)
  durations: {
    techAuditConsultation: 30,
    hourlyConsulting: 60, // Base duration, can be extended
    depositConsultation: 120, // Up to 2 hours
  },

  // Buffer time between bookings (in minutes)
  bufferTime: 15,
};
