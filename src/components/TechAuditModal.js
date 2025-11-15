import React, { useState } from 'react';
import Modal from 'react-modal';
import BookingCalendar from './BookingCalendar';
import StripePaymentForm from './StripePaymentForm';

export default function TechAuditModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Schedule & Form, 2: Payment, 3: Confirmation
  const [selectedSlot, setSelectedSlot] = useState(null);
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
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setPaymentComplete(false);
    setBookingId(null);
    onClose();
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    console.log('Payment successful:', paymentIntent);
    setPaymentComplete(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tech-audit',
          amount: 300,
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

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tech-audit',
          amount: 300,
          ...formData,
          slot: selectedSlot,
        })
      });

      const data = await response.json();
      if (data.success) {
        setBookingId(data.bookingId);
        setStep(4);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="max-w-3xl mx-auto bg-white rounded-2xl p-8 my-8 max-h-[90vh] overflow-y-auto shadow-2xl"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      {/* Step 1: Schedule & Form */}
      {step === 1 && (
        <div>
          <h2 className="text-3xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent">
            Tech Audit - $300
          </h2>
          <p className="text-textGray mb-4">
            Get a comprehensive audit of your digital systems with a personalized Action Plan.
          </p>
          <div className="bg-pink-light/10 border border-pink-light/30 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">What's Included:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-textGray">
              <li>Deep audit of your website, app, or tech stack</li>
              <li>Performance and integration analysis</li>
              <li>Cost optimization recommendations</li>
              <li>Personalized Action Plan with clear next steps</li>
              <li>30-minute consultation to discuss findings</li>
            </ul>
          </div>

          {/* Calendar */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Schedule Your 30-Minute Consultation:</h3>
            <BookingCalendar
              duration={30}
              onSelectSlot={setSelectedSlot}
              selectedSlot={selectedSlot}
              serviceType="tech-audit"
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
              placeholder="Tell me about your project or system (optional)"
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
              onClick={() => setStep(2)}
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
            Payment - $300
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between mb-4">
              <span className="text-textGray">Tech Audit Service</span>
              <span className="font-semibold">$300.00</span>
            </div>
            <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>$300.00</span>
            </div>
          </div>

          <div className="mb-6">
            <StripePaymentForm
              amount={300}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              buttonText="Pay $300"
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
              <strong>Service:</strong> Tech Audit + 30-min Consultation
            </p>
            <p className="text-sm text-textGray mb-2">
              <strong>Date:</strong> {selectedSlot?.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-sm text-textGray mb-2">
              <strong>Time:</strong> {selectedSlot?.time}
            </p>
            <p className="text-sm text-textGray mb-2">
              <strong>Amount Paid:</strong> $300.00
            </p>
            <p className="text-sm text-textGray">
              <strong>Booking ID:</strong> {bookingId}
            </p>
          </div>

          <p className="text-textGray mb-6">
            A confirmation email has been sent to <strong>{formData.email}</strong> with your booking details and next steps.
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
