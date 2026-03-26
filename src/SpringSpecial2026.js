import React, { useState } from "react";
import { Link } from "react-router-dom";
import WWSFooter from "./WWSFooter";

export default function SpringSpecial2026() {
  const [showComingSoon, setShowComingSoon] = useState(false);

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
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            Spring Special 2026
          </h1>
          <p className="text-xl md:text-2xl text-textGray mb-8 leading-relaxed">
            Limited-time offerings to help you build or optimize your digital presence
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        {!showComingSoon ? (
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-glass border-2 border-pink-light/30">
              <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
                Exciting Offerings Coming Soon!
              </h2>
              <p className="text-xl text-textGray mb-8">
                We're preparing something special for you. Check back soon to see our limited-time spring offerings.
              </p>
              <button
                onClick={() => setShowComingSoon(true)}
                className="bg-gradient-pink-purple text-white px-8 py-4 rounded-xl shadow-glow-pink hover:scale-105 transition-all duration-300 font-semibold"
              >
                Notify Me
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-glass border-2 border-pink-light/30">
              <div className="text-8xl mb-6">🌸</div>
              <h2 className="text-4xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
                Coming Soon
              </h2>
              <p className="text-xl text-textGray mb-4">
                Thank you for your interest!
              </p>
              <p className="text-lg text-textGray mb-8">
                Our spring special offerings will be available soon. Follow us on social media or check back here for updates.
              </p>
              <Link
                to="/"
                className="inline-block bg-gradient-pink-purple text-white px-8 py-3 rounded-xl shadow-glow-pink hover:scale-105 transition-all duration-300"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </section>

      <WWSFooter />
    </div>
  );
}
