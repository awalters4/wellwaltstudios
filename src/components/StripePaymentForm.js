import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PaymentForm({ amount, onSuccess, onError, buttonText }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        setError(submitError.message);
        onError(submitError);
      } else {
        // Payment succeeded
        const paymentIntent = await stripe.retrievePaymentIntent(
          elements._commonOptions.clientSecret
        );
        onSuccess(paymentIntent.paymentIntent);
      }
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
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="mb-6">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-pink-purple text-white px-6 py-4 rounded-lg shadow-glow-pink hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      >
        {loading ? 'Processing...' : buttonText}
      </button>

      <p className="text-xs text-center text-textGray mt-4">
        🔒 Secure payment processed by Stripe
      </p>
    </form>
  );
}

export default function StripePaymentForm({ amount, onSuccess, onError, buttonText = 'Pay Now' }) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Create payment intent on mount
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            description: 'Well Walt Studios Booking',
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error || 'Failed to initialize payment');
        }
      } catch (err) {
        console.error('Payment initialization error:', err);
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple"></div>
        <p className="mt-4 text-textGray">Initializing payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#C239B3',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm
        amount={amount}
        onSuccess={onSuccess}
        onError={onError}
        buttonText={buttonText}
      />
    </Elements>
  );
}
