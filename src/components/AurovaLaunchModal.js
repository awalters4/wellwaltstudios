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
          <a
            href="https://apps.apple.com/us/app/aurova/id6756036236"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
            </svg>
            Download on the App Store
          </a>
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
