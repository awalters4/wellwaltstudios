import React from "react";
import { FaGithub, FaInstagram, FaFilePdf, FaArrowLeft } from "react-icons/fa";
import WWSFooter from "./WWSFooter";

export default function Blog() {
  return (
    <div className="font-body bg-bgWarm text-textDark min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 bg-white/80 backdrop-blur-md shadow-glass sticky top-0 z-50 border-b border-pink-light/20">
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <img
              src="/favicon.ico"
              alt="Well Walt Studios"
              className="h-12 w-12 rounded-full shadow-glow-pink animate-float"
            />
            <span className="text-xl font-heading bg-gradient-pink-gold bg-clip-text text-transparent font-bold">
              Well Walt Studios
            </span>
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/#projects" className="text-textGray hover:text-pink transition-colors">
            Projects
          </a>
          <a href="/resume.pdf" className="text-textGray hover:text-pink transition-colors">
            <FaFilePdf size={20} />
          </a>
          <a
            href="https://github.com/awells4"
            className="text-textGray hover:text-pink transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://instagram.com/wellwaltstudios"
            className="text-textGray hover:text-pink transition-colors"
          >
            <FaInstagram size={20} />
          </a>
        </nav>
      </header>

      {/* Blog Content */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-textGray hover:text-pink transition-colors mb-8"
        >
          <FaArrowLeft /> Back to Home
        </a>

        <article className="bg-white/70 backdrop-blur-sm p-10 rounded-3xl shadow-glass border border-pink-light/30">
          <h1 className="text-4xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
            My Story
          </h1>

          <div className="prose prose-lg max-w-none text-textGray leading-relaxed space-y-6">
            <p className="text-xl font-semibold text-textDark">
              From 6th grade hacker to full-stack engineer building thoughtful software.
            </p>

            <h2 className="text-2xl font-heading font-bold text-textDark mt-8 mb-4">
              The Beginning
            </h2>
            <p>
              I started coding in 6th grade when I learned how to hack. What began as curiosity turned into a lifelong passion for building, creating, and solving problems with technology.
            </p>

            <h2 className="text-2xl font-heading font-bold text-textDark mt-8 mb-4">
              Education & Career
            </h2>
            <p>
              I earned my Computer Engineering degree from Jackson State University, a historically Black university that shaped not just my technical skills but my perspective on creating technology that serves underrepresented communities.
            </p>
            <p>
              Over the past 13 years, I've built a career as a full-stack software engineer, working across startups, enterprises, and everything in between. I've touched every part of the stack — from frontend to backend, mobile to web, infrastructure to AI.
            </p>

            <h2 className="text-2xl font-heading font-bold text-textDark mt-8 mb-4">
              About Well Walt Studios
            </h2>
            <p>
              As a 34-year-old Black woman from New Orleans, I know what it's like to navigate spaces where I'm often the only one who looks like me. That experience drove my mission with Well Walt Studios: to build technology that's simple by design and respects people's time and attention.
            </p>
            <p>
              Well Walt Studios was my personal software studio where I designed and built digital products driven by curiosity, experimentation, and real-world use.
            </p>

            <h2 className="text-2xl font-heading font-bold text-textDark mt-8 mb-4">
              What I Believe
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Great tech shouldn't feel complicated</li>
              <li>Strategy matters as much as execution</li>
              <li>Building with intention creates better outcomes</li>
              <li>AI-assisted tools should feel human, not robotic</li>
            </ul>

            <h2 className="text-2xl font-heading font-bold text-textDark mt-8 mb-4">
              What I Built
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Aurova</strong> — an AI-powered habit tracker and productivity app
              </li>
              <li>
                <strong>Gypsy</strong> — an AI tarot card reader with custom spreads
              </li>
            </ul>
          </div>
        </article>
      </section>

      <WWSFooter />
    </div>
  );
}
