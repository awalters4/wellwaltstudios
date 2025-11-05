import React, { useState, useEffect } from 'react';

export default function BookingCalendar({ duration, onSelectSlot, selectedSlot }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Check if date is available (has regular hours)
  const isDateAvailable = (date) => {
    if (!date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return false;

    const dayOfWeek = date.getDay();
    // Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Saturday=6
    return [1, 2, 3, 4, 6].includes(dayOfWeek);
  };

  // Fetch available time slots for selected date
  const fetchAvailableSlots = async (date) => {
    setLoading(true);
    try {
      const dateStr = date.toISOString().split('T')[0];

      // Mock availability generation for demo
      const dayOfWeek = date.getDay();
      const weeklyHours = {
        1: { start: '10:00', end: '14:00' }, // Monday
        2: { start: '10:00', end: '14:00' }, // Tuesday
        3: { start: '10:00', end: '14:00' }, // Wednesday
        4: { start: '10:00', end: '14:00' }, // Thursday
        6: { start: '10:00', end: '16:00' }, // Saturday
      };

      const hours = weeklyHours[dayOfWeek];
      if (!hours) {
        setAvailableSlots([]);
        setLoading(false);
        return;
      }

      const [startHour, startMin] = hours.start.split(':').map(Number);
      const [endHour, endMin] = hours.end.split(':').map(Number);

      const slots = [];
      let currentTime = startHour * 60 + startMin;
      const endTime = endHour * 60 + endMin;
      const bufferTime = 15;

      while (currentTime + duration <= endTime) {
        const hour = Math.floor(currentTime / 60);
        const min = currentTime % 60;
        const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        slots.push(timeStr);

        // For 2-hour blocks, don't add buffer (just move to next 2-hour slot)
        if (duration >= 120) {
          currentTime += duration;
        } else {
          currentTime += duration + bufferTime;
        }
      }

      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, duration]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
    }
  };

  const handleSlotClick = (slot) => {
    onSelectSlot({
      date: selectedDate,
      time: slot,
      datetime: `${selectedDate.toISOString().split('T')[0]} ${slot}`
    });
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="booking-calendar">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-white border border-pink-light rounded-lg hover:bg-pink-light/10 transition-colors"
        >
          ← Prev
        </button>
        <h3 className="text-xl font-semibold">{monthName}</h3>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-white border border-pink-light rounded-lg hover:bg-pink-light/10 transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-sm text-textGray py-2">
            {day}
          </div>
        ))}
        {calendarDays.map((date, index) => (
          <button
            key={index}
            onClick={() => date && handleDateClick(date)}
            disabled={!date || !isDateAvailable(date)}
            className={`
              aspect-square p-2 rounded-lg text-sm transition-all
              ${!date ? 'invisible' : ''}
              ${!isDateAvailable(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-pink-light/20 cursor-pointer'}
              ${selectedDate && date && date.toDateString() === selectedDate.toDateString()
                ? 'bg-gradient-pink-purple text-white font-bold'
                : 'bg-white border border-gray-200'}
            `}
          >
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-4">
            Available Times for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h4>
          {loading ? (
            <div className="text-center py-8 text-textGray">Loading available times...</div>
          ) : availableSlots.length === 0 ? (
            <div className="text-center py-8 text-textGray">
              No available times for this date. Please select another date or request a custom time.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotClick(slot)}
                  className={`
                    px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${selectedSlot?.time === slot
                      ? 'bg-gradient-pink-purple text-white shadow-glow-pink'
                      : 'bg-white border-2 border-pink-light/30 hover:border-pink hover:shadow-md'}
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Time Request */}
      <div className="mt-6 p-4 bg-gold-light/10 rounded-lg border border-gold-light/30">
        <p className="text-sm text-textGray">
          <strong>Need a different time?</strong> Times outside regular hours can be requested but are not guaranteed.
          Please proceed with payment and note your preferred time in the booking form.
        </p>
      </div>
    </div>
  );
}
