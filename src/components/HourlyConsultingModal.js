import React, { useState } from 'react';
import Modal from 'react-modal';
import BookingCalendar from './BookingCalendar';
import StripePaymentForm from './StripePaymentForm';

export default function HourlyConsultingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Schedule & Select Hours, 2: Payment, 3: Confirmation
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [hours, setHours] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const handleClose = () => {
    setStep(1);
    setSelectedSlot(null);
    setHours(1);
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setPaymentComplete(false);
    setBookingId(null);
    onClose();
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHoursChange = (e) => {
    setHours(parseInt(e.target.value));
  };

  const totalAmount = hours * 200;
  const duration = hours * 60; // in minutes

  const handleContinueToPayment = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    setStep(2);
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    console.log('Payment successful:', paymentIntent);
    setPaymentComplete(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'hourly-consulting',
          amount: totalAmount,
          hours: hours,
          ...formData,
          slot: selectedSlot,
        })
      });

      const data = await response.json();
      if (data.success) {
        setBookingId(data.bookingId);
        setStep(3);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again.');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="max-w-3xl mx-auto bg-white rounded-2xl p-8 my-8 max-h-[90vh] overflow-y-auto shadow-2xl"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      {/* Step 1: Select Hours & Book Time */}
      {step === 1 && (
        <div>
          <h2 className="text-3xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent">
            Hourly Consulting - $200/hour
          </h2>
          <p className="text-textGray mb-6">
            Schedule an "ask me anything" tech strategy session.
          </p>

          {/* Hours Selection */}
          <div className="mb-6">
            <label className="block font-semibold mb-3">Choose Duration:</label>
            <select
              value={hours}
              onChange={handleHoursChange}
              className="w-48 px-4 py-3 border border-gray-300 rounded-lg focus:border-pink focus:outline-none"
            >
              <option value={1}>1 hr</option>
              <option value={2}>2 hrs</option>
              <option value={3}>3 hrs</option>
              <option value={4}>4 hrs</option>
            </select>
          </div>

          {/* Calendar */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Select Your Time:</h3>
            <BookingCalendar
              duration={duration}
              onSelectSlot={setSelectedSlot}
              selectedSlot={selectedSlot}
              serviceType="hourly-consulting"
            />
          </div>

          {/* Contact Form */}
          <div className="space-y-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleFormChange}
              required
              autoComplete="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleFormChange}
              required
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink focus:outline-none"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleFormChange}
              required
              autoComplete="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink focus:outline-none"
            />
            <textarea
              name="notes"
              placeholder="What would you like to discuss? (optional)"
              value={formData.notes}
              onChange={handleFormChange}
              rows="3"
              autoComplete="off"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleContinueToPayment}
              disabled={!selectedSlot || !formData.name || !formData.email || !formData.phone}
              className="flex-1 bg-gradient-pink-purple text-white px-6 py-3 rounded-lg shadow-glow-pink hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div>
          <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
            Payment - ${totalAmount}
          </h2>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-textGray">Hourly Consulting ({hours} {hours === 1 ? 'hour' : 'hours'})</span>
                <span className="font-semibold">${totalAmount}.00</span>
              </div>
              <div className="text-sm text-textGray">
                <strong>Date:</strong> {selectedSlot?.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                <br />
                <strong>Time:</strong> {selectedSlot?.time}
              </div>
            </div>
            <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalAmount}.00</span>
            </div>
          </div>

          <div className="mb-6">
            <StripePaymentForm
              amount={totalAmount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              buttonText={`Pay $${totalAmount}`}
            />
          </div>

          <button
            onClick={() => setStep(1)}
            className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-pink-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent">
              Consultation Scheduled!
            </h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold mb-3">Details:</h3>
            <p className="text-sm text-textGray mb-2">
              <strong>Service:</strong> Hourly Consulting ({hours} {hours === 1 ? 'hour' : 'hours'})
            </p>
            <p className="text-sm text-textGray mb-2">
              <strong>Date:</strong> {selectedSlot?.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-sm text-textGray mb-2">
              <strong>Time:</strong> {selectedSlot?.time}
            </p>
            <p className="text-sm text-textGray mb-2">
              <strong>Amount Paid:</strong> ${totalAmount}.00
            </p>
            <p className="text-sm text-textGray">
              <strong>Booking ID:</strong> {bookingId}
            </p>
          </div>

          <p className="text-textGray mb-6">
            You'll receive a calendar invite and meeting link at <strong>{formData.email}</strong>.
          </p>

          <button
            onClick={handleClose}
            className="bg-gradient-pink-purple text-white px-8 py-3 rounded-lg shadow-glow-pink hover:scale-105 transition-all"
          >
            Done
          </button>
        </div>
      )}
    </Modal>
  );
}
