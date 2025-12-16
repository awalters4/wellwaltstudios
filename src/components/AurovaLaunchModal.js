import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

export default function AurovaLaunchModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Launch date: December 19, 2025 at 12:22 PM CST
  const launchDate = new Date('2025-12-19T12:22:00-06:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://formspree.io/f/xdklvjnk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail('');
    sessionStorage.setItem('hasSeenAurovaModal', 'true');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="max-w-2xl mx-auto bg-white rounded-2xl p-8 my-8 max-h-[90vh] overflow-y-auto shadow-2xl"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="text-center">
        <img
          src="/aurova-icon.svg"
          alt="Aurova"
          className="mx-auto mb-6 rounded-2xl w-24 h-24 shadow-lg animate-float"
        />
        <h2 className="text-3xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent">
          Aurova is Launching Soon!
        </h2>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-pink-gold rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{timeLeft.days}</div>
            <div className="text-sm text-white/80">Days</div>
          </div>
          <div className="bg-gradient-pink-purple rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
            <div className="text-sm text-white/80">Hours</div>
          </div>
          <div className="bg-gradient-pink-gold rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
            <div className="text-sm text-white/80">Minutes</div>
          </div>
          <div className="bg-gradient-pink-purple rounded-xl p-4">
            <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
            <div className="text-sm text-white/80">Seconds</div>
          </div>
        </div>


        {/* Stay in the know */}
        <div className="bg-gradient-to-br from-primary via-secondary to-pink-light/30 p-8 rounded-2xl mb-6">
          <h3 className="text-2xl font-heading font-bold mb-4 text-textDark">
            Stay in the know!
          </h3>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full px-6 py-3 rounded-xl border-2 border-pink-light/30 focus:border-purple focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-pink-purple text-white px-8 py-3 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-glow-gold transition-all duration-300 font-semibold"
              >
                Join the Waitlist
              </button>
            </form>
          ) : (
            <div className="bg-white/90 p-6 rounded-xl mb-4">
              <p className="text-xl text-green-600 font-semibold mb-2">
                You're on the list! 🎉
              </p>
              <p className="text-textGray">
                We'll send you updates as we get closer to launch.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <Link
            to="/behind-the-build/why-i-built-aurova"
            onClick={handleClose}
            className="inline-block bg-gradient-pink-gold text-textDark font-semibold px-8 py-3 rounded-xl shadow-glow-gold hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Read Behind the Build
          </Link>
          <Link
            to="/projects/aurova"
            onClick={handleClose}
            className="inline-block bg-white border-2 border-purple text-purple font-semibold px-8 py-3 rounded-xl hover:bg-purple hover:text-white transition-all duration-300"
          >
            Learn More About Aurova
          </Link>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-textGray mb-2 font-semibold">Download the App</p>
            <p className="text-xs text-textGray">Coming Soon - Available Dec 19, 2025</p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="text-textGray hover:text-pink transition-colors font-semibold"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
