import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaApple, FaGooglePlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import WWSFooter from "./WWSFooter";

export default function Aurova() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://formspree.io/f/xdklvjnk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  // App screenshots
  const screenshots = [
    { id: 1, src: "/screenshot1.jpg", alt: "Aurova Dashboard" },
    { id: 2, src: "/screenshot2.jpg", alt: "Aurova Habit Tracking" },
    { id: 3, src: "/screenshot3.PNG", alt: "Aurova Streak View" },
    { id: 4, src: "/screenshot4.PNG", alt: "Aurova Daily Check-in" },
    { id: 5, src: "/screenshot5.PNG", alt: "Aurova Progress Calendar" },
    { id: 6, src: "/screenshot6.PNG", alt: "Aurova Analytics" },
    { id: 7, src: "/screenshot7.PNG", alt: "Aurova Settings" },
    { id: 8, src: "/screenshot8.jpg", alt: "Aurova Profile" },
  ];

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="font-body bg-bgWarm text-textDark min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 bg-white/80 backdrop-blur-md shadow-glass sticky top-0 z-50 border-b border-pink-light/20">
        <Link to="/" className="flex items-center space-x-4">
          <img
            src="/favicon.ico"
            alt="Well Walt Studios"
            className="h-12 w-12 rounded-full shadow-glow-pink animate-float"
          />
          <span className="text-xl font-heading bg-gradient-pink-gold bg-clip-text text-transparent font-bold">
            Well Walt Studios
          </span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-textGray hover:text-pink transition-colors font-semibold"
          >
            ← Back to Home
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-pink-light/30 px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="/aurova-icon.svg"
                alt="Aurova App"
                className="mx-auto md:mx-0 mb-6 rounded-3xl w-40 md:w-48 shadow-2xl animate-float"
              />
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight text-center md:text-left">
                Aurova
              </h1>
              <p className="text-xl md:text-2xl text-textGray mb-8 leading-relaxed text-center md:text-left">
                The most intuitive habit tracker that helps you build lasting positive habits through visual progress tracking, streak celebrations, and personalized reminders.
              </p>
              <div className="mb-6">
                <p className="text-center md:text-left text-pink font-bold text-xl mb-4">
                  ✨ Now Available!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
                <a
                  href="https://apps.apple.com/us/app/aurova/id6756036236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold text-lg w-full"
                >
                  <FaApple size={24} />
                  App Store
                </a>
                <div title="Coming Soon">
                  <button
                    disabled
                    className="flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl shadow-lg opacity-60 cursor-not-allowed font-semibold text-lg w-full"
                  >
                    <FaGooglePlay size={20} />
                    Google Play
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              {/* Screenshot Carousel */}
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 border-pink-light/30">
                <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center overflow-hidden relative">
                  <img
                    src={screenshots[currentScreenshot].src}
                    alt={screenshots[currentScreenshot].alt}
                    className="w-full h-full object-contain"
                  />

                  {/* Navigation Arrows */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        onClick={prevScreenshot}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                        aria-label="Previous screenshot"
                      >
                        <FaChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextScreenshot}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                        aria-label="Next screenshot"
                      >
                        <FaChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Carousel Indicators */}
                {screenshots.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentScreenshot(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentScreenshot
                            ? 'bg-purple w-6'
                            : 'bg-pink-light/50 hover:bg-pink-light'
                        }`}
                        aria-label={`Go to screenshot ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
            Build habits that last
          </h2>
          <p className="text-xl text-textGray leading-relaxed">
            Aurova is designed to help you monitor habits, mood, and personal challenges with a clean, intuitive interface.
            Track your daily check-ins, celebrate milestones, and visualize your progress over time — all while staying motivated
            with streak tracking and personalized reminders.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-12 text-center bg-gradient-pink-gold bg-clip-text text-transparent">
          Features
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Habit Tracking */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Habit Tracking
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Create unlimited habits with custom emoji support. Check in daily and watch your progress grow with visual calendars and completion stats.
            </p>
          </div>

          {/* Streak System */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Streak Celebrations
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Stay motivated with automatic streak tracking, milestone celebrations, and visual progress indicators. Hit 7, 30, 100+ days and celebrate your wins!
            </p>
          </div>

          {/* Social Features */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Social Features
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Share your progress and connect with friends. Build accountability and celebrate wins together.
            </p>
          </div>

          {/* Integrations */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Integrations
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Connect with Apple Health, Google Fit, and more to sync your fitness and wellness data seamlessly.
            </p>
          </div>

          {/* Smart Reminders */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Smart Reminders
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Set custom reminder times for each habit. Get gentle nudges when it's time to check in, helping you stay consistent without feeling overwhelmed.
            </p>
          </div>

          {/* Daily Reflections */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Daily Notes
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Capture thoughts, reflections, and wins with daily notes. Look back on your journey and see how far you've come.
            </p>
          </div>

          {/* Custom Themes */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🌈</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Custom Themes
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Personalize your experience with custom color themes and visual styles that match your vibe.
            </p>
          </div>

          {/* Wearable Support */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">⌚</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Wearable Support
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Track habits on the go with Apple Watch and Wear OS apps, bringing your habits to your wrist.
            </p>
          </div>

          {/* Advanced Analytics */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Advanced Analytics
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Get deep insights into your habit patterns with detailed analytics, completion trends, and progress reports.
            </p>
          </div>

          {/* Achievement Badges */}
          <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30 hover:border-pink-light hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-2xl font-heading font-semibold mb-4 relative z-10">
              Achievement Badges
            </h3>
            <p className="text-textGray leading-relaxed relative z-10">
              Earn badges and celebrate milestones as you complete challenges and build consistent habits.
            </p>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-primary via-secondary to-pink-light/30 p-12 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6 text-textDark">
              Be the first to know when Aurova launches
            </h2>
            <p className="text-lg text-textGray mb-8">
              Join our email list to get early access, launch updates, and exclusive tips for building habits that stick.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="w-full px-6 py-4 rounded-xl border-2 border-pink-light/30 focus:border-purple focus:outline-none transition-colors text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-pink-purple text-white px-8 py-4 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-glow-gold transition-all duration-300 font-semibold text-lg"
                >
                  Join the Waitlist
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto bg-white/90 p-8 rounded-xl">
                <p className="text-xl text-green-600 font-semibold mb-4">
                  You're on the list! 🎉
                </p>
                <p className="text-textGray text-lg">
                  We'll send you updates as we get closer to launch.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <WWSFooter />
    </div>
  );
}
