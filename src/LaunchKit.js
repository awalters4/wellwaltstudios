import React, { useState } from "react";
import { Link } from "react-router-dom";
import WWSFooter from "./WWSFooter";

export default function LaunchKit() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with ConvertKit, Gumroad, or Lemon Squeezy
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  const scrollToEmail = () => {
    document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' });
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
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-pink-light/30 px-8 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            Build your first website without fear.
          </h1>
          <p className="text-xl md:text-2xl text-textGray mb-10 leading-relaxed">
            A streamlined starter kit built by a software engineer with 13+ years of experience — so you can stop overthinking and start creating.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToEmail}
              className="bg-gradient-pink-purple text-white px-8 py-4 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-glow-gold transition-all duration-300 font-semibold text-lg"
            >
              🚀 Get the Launch Kit
            </button>
            <button
              onClick={() => document.getElementById('whats-inside')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/80 backdrop-blur-sm border-2 border-pink-light/50 text-textDark px-8 py-4 rounded-xl shadow-glass hover:scale-105 hover:border-purple transition-all duration-300 font-semibold text-lg"
            >
              👀 See what's inside
            </button>
          </div>
        </div>
      </section>

      {/* Section 1 — The Problem */}
      <section className="px-8 py-20 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-glass border border-pink-light/30">
          <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
            Tech shouldn't feel like a locked door.
          </h2>
          <p className="text-lg text-textGray leading-relaxed mb-4">
            You've got ideas — a business, a project, something you want to put out into the world — but the tech part feels like a wall.
          </p>
          <p className="text-lg text-textGray leading-relaxed mb-4">
            Buying domains, figuring out hosting, dealing with files and frameworks... it's a lot.
          </p>
          <p className="text-lg text-textGray leading-relaxed">
            The Launch Kit strips all that down to what actually matters: getting your site live, fast, and done right.
          </p>
        </div>
      </section>

      {/* Section 2 — What's Inside */}
      <section id="whats-inside" className="px-8 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-6 text-center bg-gradient-pink-gold bg-clip-text text-transparent">
            Everything you need to go from idea → live site.
          </h2>
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-bgWarm/50 border border-pink-light/20 hover:border-pink-light/50 transition-all">
              <span className="text-3xl">🧩</span>
              <div>
                <h4 className="font-heading font-semibold text-lg mb-2">Prebuilt, clean starter code</h4>
                <p className="text-textGray">Next.js or HTML/CSS version</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-bgWarm/50 border border-pink-light/20 hover:border-pink-light/50 transition-all">
              <span className="text-3xl">⚙️</span>
              <div>
                <h4 className="font-heading font-semibold text-lg mb-2">Step-by-step setup guide</h4>
                <p className="text-textGray">Domain → hosting → deployment</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-bgWarm/50 border border-pink-light/20 hover:border-pink-light/50 transition-all">
              <span className="text-3xl">📸</span>
              <div>
                <h4 className="font-heading font-semibold text-lg mb-2">Screenshots and sample assets</h4>
                <p className="text-textGray">Customize fast</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-bgWarm/50 border border-pink-light/20 hover:border-pink-light/50 transition-all">
              <span className="text-3xl">🧠</span>
              <div>
                <h4 className="font-heading font-semibold text-lg mb-2">Bonus: Quick fixes for common beginner errors</h4>
                <p className="text-textGray">Save hours of debugging</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-bgWarm/50 border border-pink-light/20 hover:border-pink-light/50 transition-all">
              <span className="text-3xl">🔗</span>
              <div>
                <h4 className="font-heading font-semibold text-lg mb-2">Resource list of tools I actually use</h4>
                <p className="text-textGray">Hosting, images, fonts, colors</p>
              </div>
            </div>
          </div>
          <p className="text-center text-textGray italic text-lg">
            No clutter, no filler — just the pieces you actually need to ship something.
          </p>
        </div>
      </section>

      {/* Section 3 — Who It's For */}
      <section className="px-8 py-20 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-10 rounded-2xl border border-pink-light/20">
          <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
            Built for creators, founders, and doers.
          </h2>
          <p className="text-lg text-textGray leading-relaxed mb-4">
            Whether you're launching a portfolio, testing an idea, or finally starting that side project — this kit gives you the foundation to make it real.
          </p>
          <p className="text-lg text-textGray leading-relaxed">
            It's built by someone who's worked on everything from fighter jets to startups, but still remembers how overwhelming it felt to start from zero.
          </p>
        </div>
      </section>

      {/* Section 4 — About the Creator */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-glass border border-pink-light/30">
          <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-pink-gold bg-clip-text text-transparent">
            From Fighter Jets to Founder
          </h2>
          <p className="text-lg text-textGray leading-relaxed mb-4">
            I'm Ariel Deres Walters — a computer engineer with over 13 years of experience building complex systems in defense, ed tech, and startups.
          </p>
          <p className="text-lg text-textGray leading-relaxed mb-4">
            I founded Well Walt Studios to make technology more human and more accessible.
          </p>
          <p className="text-lg text-textGray leading-relaxed mb-6">
            This kit is part of that mission — to give you the tools and clarity to build without hesitation.
          </p>
          <Link
            to="/blog"
            className="inline-block text-purple hover:text-pink font-semibold transition-colors text-lg"
          >
            Read more on my blog →
          </Link>
        </div>
      </section>

      {/* Section 5 — The Offer */}
      <section id="email-capture" className="px-8 py-20 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary via-secondary to-pink-light/30 p-12 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-6 text-textDark">
            Start building today.
          </h2>
          <p className="text-lg text-textGray mb-8 max-w-2xl mx-auto">
            The Launch Kit is available as a digital download. You'll get instant access to the repo, the setup guide, and every resource you need to launch confidently.
          </p>

          {!submitted ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-6 py-4 rounded-xl border-2 border-pink-light/30 focus:border-purple focus:outline-none transition-colors text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-pink-purple text-white px-8 py-4 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-glow-gold transition-all duration-300 font-semibold text-lg"
                >
                  💾 Get the Launch Kit
                </button>
              </form>
              <button
                onClick={() => alert('Free Starter Pack coming soon!')}
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-pink-light/50 text-textDark px-8 py-3 rounded-xl shadow-glass hover:scale-105 hover:border-purple transition-all duration-300 font-semibold"
              >
                🧠 Grab the Free Starter Pack
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white/90 p-8 rounded-xl">
              <p className="text-xl text-green-600 font-semibold mb-4">
                Thanks for signing up!
              </p>
              <p className="text-textGray text-lg">
                Check your inbox for your Launch Kit details.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center bg-gradient-pink-purple bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-bgWarm/50 p-6 rounded-xl border border-pink-light/20">
              <h3 className="font-heading font-semibold text-xl mb-3 text-textDark">
                Do I need to know how to code?
              </h3>
              <p className="text-textGray text-lg">
                Basic familiarity helps, but the guide walks you through every step.
              </p>
            </div>
            <div className="bg-bgWarm/50 p-6 rounded-xl border border-pink-light/20">
              <h3 className="font-heading font-semibold text-xl mb-3 text-textDark">
                Can I use this for clients?
              </h3>
              <p className="text-textGray text-lg">
                Yes — use it to build sites for yourself or others.
              </p>
            </div>
            <div className="bg-bgWarm/50 p-6 rounded-xl border border-pink-light/20">
              <h3 className="font-heading font-semibold text-xl mb-3 text-textDark">
                Where do I host my site?
              </h3>
              <p className="text-textGray text-lg">
                The guide shows you how to set it up on Vercel or Netlify — free and fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-8 py-20 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary via-secondary to-pink-light/30 p-12 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-textDark">
            Ready to stop overthinking and start building?
          </h2>
          <button
            onClick={scrollToEmail}
            className="bg-gradient-pink-purple text-white px-10 py-5 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-glow-gold transition-all duration-300 font-semibold text-xl"
          >
            🚀 Download the Launch Kit
          </button>
        </div>
      </section>

      <WWSFooter />
    </div>
  );
}
