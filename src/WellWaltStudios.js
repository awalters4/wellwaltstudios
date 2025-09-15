import React, { useState } from "react";
import Modal from "react-modal";
import { FaGithub, FaInstagram, FaFilePdf } from "react-icons/fa";

Modal.setAppElement("#root");

export default function WellWaltStudios() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="font-body bg-bgWarm text-textDark">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 bg-bgLight shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Well Walt Studios" className="h-12 w-12 rounded-full" />
          <span className="text-xl font-heading">Well Walt Studios</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/resume.pdf" className="text-textGray hover:text-textDark"><FaFilePdf size={20} /></a>
          <a href="https://github.com/awells4" className="text-textGray hover:text-textDark"><FaGithub size={20} /></a>
          <a href="https://instagram.com/yourhandle" className="text-textGray hover:text-textDark"><FaInstagram size={20} /></a>
          <button
            className="bg-primary text-textDark px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
            onClick={openModal}
          >
            Work With Me
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-textDark flex flex-col md:flex-row items-center justify-between px-8 py-20 rounded-b-3xl">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Hi, I’m Ariel.</h1>
          <p className="text-lg md:text-xl">
            I bridge technology, strategy, and storytelling to help businesses and entrepreneurs scale effectively.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/me.jpg" alt="Ariel Walters" className="rounded-3xl shadow-xl w-72 md:w-96" />
        </div>
      </section>

      {/* Current Projects Section*/}
      <section className="bg-secondary px-8 py-20">
  <h2 className="text-3xl font-heading font-bold mb-12 text-center">Current Projects</h2>
  <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
    {/* Aurova */}
    <div className="bg-bgLight p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
      <a href="https://aurovabyaw.com" target="_blank" rel="noopener noreferrer">
        <img src="/aurova-icon.svg" alt="Aurova App" className="mx-auto mb-4 rounded-xl w-36" />
      </a>
      <h3 className="text-xl font-heading font-semibold mb-2">Aurova</h3>
      <p>AI-powered habit tracking and productivity app launching <strong>October 2025</strong>.</p>
    </div>

    {/* NBFJA */}
    <div className="bg-bgLight p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
      <a href="https://blackfoodjustice.org/food-map-director" target="_blank" rel="noopener noreferrer">
        <img src="/nbfja-app.png" alt="NBFJA App" className="mx-auto mb-4 rounded-xl w-36" />
      </a>
      <h3 className="text-xl font-heading font-semibold mb-2">NBFJA Organizations App</h3>
      <p>Interactive map with search, images/videos, and the ability to find your favorite farmer or co-op across the US.</p>
    </div>
  </div>
</section>

      {/* About Section */}
      <section className="bg-bgLight text-textDark px-8 py-20">
        <h2 className="text-3xl font-heading font-bold mb-6 text-center">About Well Walt Studios</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-center text-textGray">
       Well Walt Studios combines technology, strategy, and storytelling to deliver meaningful outcomes
    for businesses and entrepreneurs. We specialize in tech consulting, web/app development, and AI-powered productivity solutions.
        </p>
      </section>


      {/* Services Section */}
      <section className="bg-secondary px-8 py-20">
  <h2 className="text-3xl font-heading font-bold mb-12 text-center">Services</h2>
  <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
    {/* Tech Consulting */}
    <div className="bg-bgLight p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
      <h3 className="text-xl font-heading font-semibold mb-2">Tech Consulting</h3>
      <p>IT audits, automation, and strategic tech solutions for small businesses and entrepreneurs.</p>
    </div>

    {/* Web/App Development */}
    <div className="bg-bgLight p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform">
      <h3 className="text-xl font-heading font-semibold mb-2">Web & App Development</h3>
      <p>build or maintain web, mobile, database tools, and/or internal tool development to bring ideas to life.</p>
    </div>
  </div>

  {/* Schedule a Consultation - Square Appointments */}
  <div className="text-center mt-12">
    <a
      href="https://app.squareup.com/appointments/book/1us1ykx3aktri0/LFTMYHAESXCX5/start"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-textDark text-bgLight px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
    >
      Schedule a Consultation
    </a>
  </div>
</section>
</div>
  );
}
