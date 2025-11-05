import React, { useState } from 'react';

export default function StripePaymentForm({ amount, onSuccess, onError, buttonText = 'Pay Now' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For now, simulate successful payment
      // TODO: Implement real Stripe payment when keys are configured in Vercel

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock payment intent
      const mockPaymentIntent = {
        id: 'pi_mock_' + Math.random().toString(36).substr(2, 9),
        status: 'succeeded',
        amount: amount * 100,
      };

      onSuccess(mockPaymentIntent);
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-payment-form">
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
        <strong>Demo Mode:</strong> Payments are simulated. Configure Stripe keys in Vercel to enable real payments.
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="mb-4 p-3 bg-gray-50 rounded-lg flex justify-between items-center">
        <span className="text-sm text-textGray">Total Amount:</span>
        <span className="text-xl font-bold text-textDark">${amount.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-pink-purple text-white px-6 py-4 rounded-lg shadow-glow-pink hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      >
        {loading ? 'Processing...' : buttonText}
      </button>

      <p className="text-xs text-center text-textGray mt-4">
        🔒 Click to simulate payment. Real Stripe integration activates when deployed.
      </p>
    </form>
  );
}
