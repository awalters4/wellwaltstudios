// Weekly availability configuration
// Times are in 24-hour format

module.exports = {
  // Regular weekly hours
  weeklyHours: {
    1: { start: '09:00', end: '14:00' }, // Monday
    2: { start: '09:00', end: '14:00' }, // Tuesday
    3: { start: '09:00', end: '14:00' }, // Wednesday
    4: { start: '09:00', end: '14:00' }, // Thursday
  },

  // Blocked dates (manually add specific dates you're unavailable)
  // Format: 'YYYY-MM-DD'
  blockedDates: [
    // April 2 - April 13, 2026
    '2026-04-02', '2026-04-03', '2026-04-04', '2026-04-05', '2026-04-06',
    '2026-04-07', '2026-04-08', '2026-04-09', '2026-04-10', '2026-04-11',
    '2026-04-12', '2026-04-13',
    // May 11, 2026
    '2026-05-11',
    // May 25, 2026
    '2026-05-25',
  ],

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
