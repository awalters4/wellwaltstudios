import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaFilePdf, FaApple, FaAndroid, FaDownload, FaGlobe } from "react-icons/fa";
import WorkWithMeModal from "./WorkWithMeModal";
import TechAuditModal from "./components/TechAuditModal";
import HourlyConsultingModal from "./components/HourlyConsultingModal";
import DepositBookingModal from "./components/DepositBookingModal";
import WWSFooter from "./WWSFooter";

Modal.setAppElement("#root");

export default function WellWaltStudios() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [techAuditModalOpen, setTechAuditModalOpen] = useState(false);
  const [hourlyModalOpen, setHourlyModalOpen] = useState(false);
  const [fractionalCTOModalOpen, setFractionalCTOModalOpen] = useState(false);
  const [developmentModalOpen, setDevelopmentModalOpen] = useState(false);
  const [openDownloadMenu, setOpenDownloadMenu] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateStart: "",
    dateEnd: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      dateStart: "",
      dateEnd: "",
      notes: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="font-body bg-bgWarm text-textDark">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 bg-white/80 backdrop-blur-md shadow-glass sticky top-0 z-50 border-b border-pink-light/20">
        <div className="flex items-center space-x-4">
          <img
            src="/favicon.ico"
            alt="Well Walt Studios"
            className="h-12 w-12 rounded-full shadow-glow-pink animate-float"
          />
          <span className="text-xl font-heading bg-gradient-pink-gold bg-clip-text text-transparent font-bold">Well Walt Studios</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-textGray hover:text-pink transition-colors">Services</a>
          <a href="#projects" className="text-textGray hover:text-pink transition-colors">Projects</a>
          <a
            href="/resume.pdf"
            className="text-textGray hover:text-pink transition-colors"
          >
            <FaFilePdf size={20} />
          </a>
          <a
            href="https://github.com/awalters4"
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
          <button
            className="bg-gradient-pink-purple text-white px-6 py-2 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-glow-gold transition-all duration-300"
            onClick={openModal}
          >
            Let's Talk
          </button>
        </nav>
        <div className="flex md:hidden items-center space-x-4">
          <a
            href="/resume.pdf"
            className="text-textGray hover:text-pink"
          >
            <FaFilePdf size={20} />
          </a>
          <a
            href="https://github.com/awalters44"
            className="text-textGray hover:text-pink"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://instagram.com/wellwaltstudios"
            className="text-textGray hover:text-pink"
          >
            <FaInstagram size={20} />
          </a>
          <button
            className="bg-gradient-pink-purple text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
            onClick={openModal}
          >
            Let's Talk
          </button>
        </div>
      </header>

      {/* Hero Section */}
<section className="relative bg-gradient-to-br from-primary via-secondary to-pink-light/30 text-textDark flex flex-col md:flex-row items-center justify-between px-8 py-20 rounded-b-3xl overflow-hidden">
  <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
  <div className="md:w-1/2 mb-10 md:mb-0 relative z-10">
    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
      <span className="bg-gradient-pink-purple bg-clip-text text-transparent">Well Walt Studios</span>
    </h1>
    <p className="text-lg md:text-xl mb-4 text-textGray leading-relaxed">
      Well Walt Studios is my personal software studio, where I design and build digital products driven by curiosity, experimentation, and real-world use.
    </p>
    <p className="text-lg md:text-xl mb-4 text-textGray leading-relaxed">
      I'm a software engineer by trade, but at my core, I'm a problem-solver. I build tools around productivity, habits, and decision-making—especially where technology can reduce mental load instead of adding to it. That means AI-assisted tools that feel human, systems that are simple by design, and products that respect people's time and attention.
    </p>
    <p className="text-lg md:text-xl mb-4 text-textGray leading-relaxed">
      Alongside my own products, I take on a small number of consulting and development projects each year. I'm selective on purpose. I work best with founders and teams who care about clarity, long-term thinking, and building things that actually get used.
    </p>
    <p className="text-lg md:text-xl mb-8 text-textGray leading-relaxed">
      Well Walt Studios isn't an agency chasing volume. It's a studio focused on thoughtful software, built with intention.
    </p>
    <div className="flex flex-wrap gap-4">
      <Link
        to="/behind-the-build"
        className="inline-block bg-gradient-pink-gold text-textDark font-semibold px-8 py-3 rounded-xl shadow-glow-gold hover:scale-105 hover:shadow-xl transition-all duration-300"
      >
        Behind the Build
      </Link>
      <Link
        to="/springspecial2026"
        className="inline-block bg-gradient-pink-purple text-white font-semibold px-8 py-3 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-xl transition-all duration-300"
      >
        Spring Special
      </Link>
    </div>
  </div>
  <div className="md:w-1/2 flex justify-center relative z-10">
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-pink-purple rounded-3xl blur-3xl opacity-20 animate-glow"></div>
      <img
        src="/main.png"
        alt="Ariel Walters"
        className="rounded-3xl shadow-2xl w-72 md:w-96 relative z-10 border-4 border-white/80 object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  </div>
</section>


      {/* Projects Section */}
      <section id="projects" className="relative bg-bgWarm text-textDark px-8 py-20 overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-4 text-center bg-gradient-pink-purple bg-clip-text text-transparent">
              Projects
            </h2>
            <p className="text-center text-textGray mb-8">Building the future, one app at a time.</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Aurova */}
              <div className="group relative bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-glass border border-pink-light/30 text-center hover:scale-105 hover:shadow-glow-pink transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDownloadMenu(openDownloadMenu === 'aurova' ? null : 'aurova');
                    }}
                    className="bg-white/90 p-2 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <FaDownload className="text-pink" size={16} />
                  </button>
                  {openDownloadMenu === 'aurova' && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-pink-light/30 p-2 min-w-[120px]">
                      <a
                        href="https://apps.apple.com/us/app/aurova/id6449732442"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-pink-light/10 rounded transition-colors"
                      >
                        <FaApple size={20} />
                        <span className="text-sm">App Store</span>
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.wws.aurova"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-pink-light/10 rounded transition-colors"
                      >
                        <FaAndroid size={20} />
                        <span className="text-sm">Google Play</span>
                      </a>
                    </div>
                  )}
                </div>
                <Link
                  to="/projects/aurova"
                  className="relative z-10 block"
                >
                  <img
                    src="/aurova-icon.svg"
                    alt="Aurova App"
                    className="mx-auto mb-4 rounded-xl w-28 shadow-md group-hover:shadow-glow-gold transition-shadow duration-300"
                  />
                  <h3 className="text-xl font-heading font-semibold mb-2 relative z-10">Aurova</h3>
                  <p className="text-sm text-textGray relative z-10">
                    The ultimate habit tracking and productivity app.
                  </p>
                  <p className="text-sm font-semibold mt-3 relative z-10 text-pink">
                    Now Available!
                  </p>
                </Link>
              </div>

              {/* Gypsy */}
              <div className="group relative bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-glass border border-pink-light/30 text-center hover:scale-105 hover:shadow-glow-pink transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDownloadMenu(openDownloadMenu === 'gypsy' ? null : 'gypsy');
                    }}
                    className="bg-white/90 p-2 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <FaDownload className="text-pink" size={16} />
                  </button>
                  {openDownloadMenu === 'gypsy' && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-pink-light/30 p-2 min-w-[140px]">
                      <a
                        href="https://gypsy-xi.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-pink-light/10 rounded transition-colors"
                      >
                        <FaGlobe size={20} />
                        <span className="text-sm">Web App</span>
                      </a>
                      <div className="flex items-center gap-2 px-3 py-2 text-textGray cursor-not-allowed opacity-50">
                        <FaApple size={20} />
                        <span className="text-sm">Coming Soon</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 text-textGray cursor-not-allowed opacity-50">
                        <FaAndroid size={20} />
                        <span className="text-sm">Coming Soon</span>
                      </div>
                    </div>
                  )}
                </div>
                <a
                  href="https://gypsy-xi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 block"
                >
                  <div className="mx-auto mb-4 rounded-xl w-28 h-28 bg-gradient-pink-purple flex items-center justify-center shadow-md group-hover:shadow-glow-gold transition-shadow duration-300">
                    <span className="text-4xl">🔮</span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2 relative z-10">Gypsy</h3>
                  <p className="text-sm text-textGray relative z-10">
                    AI-powered tarot card reader with custom spreads and personalized interpretations.
                  </p>
                  <p className="text-sm font-semibold mt-3 relative z-10 text-pink">
                    Now Available!
                  </p>
                </a>
              </div>

              {/* BlueTree */}
              <div className="group relative bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-glass border border-pink-light/30 text-center hover:scale-105 hover:shadow-glow-pink transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDownloadMenu(openDownloadMenu === 'bluetree' ? null : 'bluetree');
                    }}
                    className="bg-white/90 p-2 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <FaDownload className="text-pink" size={16} />
                  </button>
                  {openDownloadMenu === 'bluetree' && (
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-pink-light/30 p-2 min-w-[120px]">
                      <a
                        href="https://apps.apple.com/us/app/bluetree/id6754655436"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-pink-light/10 rounded transition-colors"
                      >
                        <FaApple size={20} />
                        <span className="text-sm">App Store</span>
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.bluetree"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-pink-light/10 rounded transition-colors"
                      >
                        <FaAndroid size={20} />
                        <span className="text-sm">Google Play</span>
                      </a>
                    </div>
                  )}
                </div>
                <div className="relative z-10">
                  <img
                    src="/bluetree-logo.jpg"
                    alt="BlueTree"
                    className="mx-auto mb-4 w-32 h-auto object-contain shadow-md group-hover:shadow-glow-gold transition-shadow duration-300"
                    style={{maxHeight: '112px'}}
                  />
                  <h3 className="text-xl font-heading font-semibold mb-2 relative z-10">BlueTree*</h3>
                  <p className="text-sm text-textGray relative z-10">
                    College and university marketplace platform connecting students with products and services.
                  </p>
                  <p className="text-sm font-semibold mt-3 relative z-10 text-pink">
                    Now Available!
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-textGray text-center mt-4">
              *client-project
            </p>

            {/* Wanna be next? */}
            <div className="text-center mt-12 bg-white/60 backdrop-blur-md p-8 rounded-2xl max-w-2xl mx-auto shadow-glass border border-gold-light/30">
              <h3 className="text-2xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
                Wanna be next?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setHourlyModalOpen(true)}
                  className="inline-block bg-gradient-pink-gold text-textDark font-semibold px-8 py-3 rounded-xl shadow-glow-gold hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Ready to talk?
                </button>
                <button
                  onClick={() => setDevelopmentModalOpen(true)}
                  className="inline-block bg-gradient-pink-purple text-white font-semibold px-8 py-3 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Ready to work?
                </button>
              </div>
            </div>

            {/* Services */}
            <div id="services" className="mt-20">
              <h3 className="text-2xl font-heading font-bold mb-12 text-center bg-gradient-pink-purple bg-clip-text text-transparent">
                Services
              </h3>

              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Fractional CTO Services */}
                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-transparent hover:border-pink-light hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
                  <h4 className="text-2xl font-heading font-semibold mb-4 relative z-10">
                    Fractional CTO Services
                  </h4>
                  <p className="mb-4 text-textGray leading-relaxed">
                    I help with tech stack decisions, product roadmaps, team direction, and overall system architecture.
                  </p>
                  <p className="mb-4 text-textGray leading-relaxed">
                    Packages can range from light advisory (a few hours/month) to deeper engagement (weekly check-ins, code reviews, or sprint planning).
                  </p>
                  <p className="mb-6 text-textGray leading-relaxed">
                    <strong>Perfect for:</strong> Solo founders who need a technical co-pilot, early-stage startups building their first product, or established small businesses (up to 20 people) who want expert guidance without hiring a full-time CTO.
                  </p>
                  <button
                    onClick={() => setFractionalCTOModalOpen(true)}
                    className="block w-full text-center bg-gradient-pink-purple text-white px-6 py-3 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-glow-gold transition-all duration-300 relative z-10"
                  >
                    Get Started with Fractional CTO
                  </button>
                </div>

                {/* Development */}
                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-transparent hover:border-pink-light hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
                  <h4 className="text-2xl font-heading font-semibold mb-4 relative z-10">
                    Development
                  </h4>
                  <p className="mb-4 text-textGray leading-relaxed">
                    Custom web and app development services through Well Walt Studios.
                  </p>
                  <p className="mb-4 text-textGray leading-relaxed">
                    Focus on small-to-mid sized projects: MVPs, automation tools, client dashboards, and digital product builds.
                  </p>
                  <p className="mb-4 text-textGray leading-relaxed">
                    <strong>Stack:</strong> React, React Native, Supabase, AWS, and Tailwind.
                  </p>
                  <p className="mb-4 text-textGray leading-relaxed">
                    Each build includes discovery, design, development, and launch support. I'm not just a developer — I design solutions that solve real problems.
                  </p>
                  <p className="mb-6 text-textGray leading-relaxed">
                    <strong>Timeline:</strong> Most projects range from 4 weeks to 12 months depending on scope.
                  </p>
                  <button
                    onClick={() => setDevelopmentModalOpen(true)}
                    className="block w-full text-center bg-gradient-pink-purple text-white px-6 py-3 rounded-xl shadow-glow-pink hover:scale-105 hover:shadow-glow-gold transition-all duration-300 relative z-10"
                  >
                    Start a Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <WorkWithMeModal isOpen={modalIsOpen} onClose={closeModal} />
      <TechAuditModal isOpen={techAuditModalOpen} onClose={() => setTechAuditModalOpen(false)} />
      <HourlyConsultingModal isOpen={hourlyModalOpen} onClose={() => setHourlyModalOpen(false)} />
      <DepositBookingModal
        isOpen={fractionalCTOModalOpen}
        onClose={() => setFractionalCTOModalOpen(false)}
        serviceType="fractional-cto"
      />
      <DepositBookingModal
        isOpen={developmentModalOpen}
        onClose={() => setDevelopmentModalOpen(false)}
        serviceType="development"
      />

      <WWSFooter />
    </div>
  );
}
