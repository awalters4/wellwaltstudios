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
  blockedDates: [
    // Dec 22 - Dec 31, 2025
    '2025-12-22', '2025-12-23', '2025-12-24', '2025-12-25', '2025-12-26',
    '2025-12-27', '2025-12-28', '2025-12-29', '2025-12-30', '2025-12-31',
    // Jan 1 - Jan 5, 2026
    '2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04', '2026-01-05',
    // Jan 15 - Jan 20, 2026
    '2026-01-15', '2026-01-16', '2026-01-17', '2026-01-18', '2026-01-19', '2026-01-20',
    // Feb 10 - Feb 18, 2026
    '2026-02-10', '2026-02-11', '2026-02-12', '2026-02-13', '2026-02-14',
    '2026-02-15', '2026-02-16', '2026-02-17', '2026-02-18',
    // Mar 1 - Mar 14, 2026
    '2026-03-01', '2026-03-02', '2026-03-03', '2026-03-04', '2026-03-05',
    '2026-03-06', '2026-03-07', '2026-03-08', '2026-03-09', '2026-03-10',
    '2026-03-11', '2026-03-12', '2026-03-13', '2026-03-14',
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
