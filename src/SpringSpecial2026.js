import React, { useState } from "react";
import { Link } from "react-router-dom";
import WWSFooter from "./WWSFooter";
import StripePaymentForm from "./components/StripePaymentForm";
import BookingCalendar from "./components/BookingCalendar";

export default function SpringSpecial2026() {
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [step, setStep] = useState(1); // 1: Select, 2: Form, 3: Payment

  // Form states for offering 1 (4-page site)
  const [siteFormData, setSiteFormData] = useState({
    contactInfo: "",
    domainName: "",
    projectDetails: "",
    files: null,
    rushFee: false,
  });

  // Form states for offering 2 (tech audit)
  const [auditFormData, setAuditFormData] = useState({
    contactInfo: "",
    auditType: "",
    techDetails: "",
    desiredOutcome: "",
    rushFee: false,
  });

  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const calculateTotal = () => {
    if (selectedOffering === 1) {
      return siteFormData.rushFee ? 1000 : 500;
    } else if (selectedOffering === 2) {
      return auditFormData.rushFee ? 500 : 300;
    }
    return 0;
  };

  const handleSiteFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setSiteFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value
    }));
  };

  const handleAuditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAuditFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form based on selected offering
    if (selectedOffering === 1) {
      if (!siteFormData.contactInfo || !siteFormData.domainName || !siteFormData.projectDetails) {
        alert("Please fill in all required fields");
        return;
      }
    } else if (selectedOffering === 2) {
      if (!auditFormData.contactInfo || !auditFormData.auditType || !auditFormData.techDetails || !auditFormData.desiredOutcome) {
        alert("Please fill in all required fields");
        return;
      }
    }

    setStep(3); // Move to payment
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Send email notification
      const emailData = selectedOffering === 1 ? {
        offering: "4-Page Website Development",
        contactInfo: siteFormData.contactInfo,
        domainName: siteFormData.domainName,
        projectDetails: siteFormData.projectDetails,
        rushFee: siteFormData.rushFee,
        total: calculateTotal(),
        paymentId: paymentIntent.id,
      } : {
        offering: "Tech Audit",
        contactInfo: auditFormData.contactInfo,
        auditType: auditFormData.auditType,
        techDetails: auditFormData.techDetails,
        desiredOutcome: auditFormData.desiredOutcome,
        rushFee: auditFormData.rushFee,
        total: calculateTotal(),
        paymentId: paymentIntent.id,
      };

      await fetch('/api/spring-special-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });

      setPaymentSuccess(true);
    } catch (error) {
      console.error('Error sending email:', error);
      // Still show success since payment went through
      setPaymentSuccess(true);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
  };

  if (paymentSuccess) {
    return (
      <div className="font-body bg-bgWarm text-textDark min-h-screen">
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

        <section className="px-8 py-20 max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-glass border-2 border-pink-light/30">
            <div className="text-6xl mb-6">✓</div>
            <h1 className="text-4xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
              Payment Successful!
            </h1>
            <p className="text-xl text-textGray mb-8">
              Thank you for your purchase! You'll receive a confirmation email at the address you provided shortly.
            </p>
            {showBookingCalendar ? (
              <div className="mt-8">
                <BookingCalendar type="tech-audit" />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setShowBookingCalendar(true)}
                  className="bg-gradient-pink-purple text-white px-8 py-3 rounded-xl shadow-glow-pink hover:scale-105 transition-all duration-300"
                >
                  Schedule Consultation
                </button>
                <Link
                  to="/"
                  className="text-purple hover:text-pink transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            )}
          </div>
        </section>

        <WWSFooter />
      </div>
    );
  }

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
      <section className="px-8 py-12 max-w-6xl mx-auto">
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Offering 1: 4-Page Site */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-transparent hover:border-pink-light hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
              <h2 className="text-3xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent">
                4-Page Website
              </h2>
              <div className="text-4xl font-bold text-purple mb-4">$500</div>
              <ul className="space-y-3 mb-6 text-textGray">
                <li className="flex items-start">
                  <span className="text-pink mr-2">✓</span>
                  <span>Custom 4-page site (Contact, Portfolio/Scheduling, About, Services)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink mr-2">✓</span>
                  <span>Purchased domain included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink mr-2">✓</span>
                  <span>One month turnaround</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink mr-2">+</span>
                  <span>$500 rush fee for 2-week turnaround</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setSelectedOffering(1);
                  setStep(2);
                }}
                className="w-full bg-gradient-pink-purple text-white px-6 py-3 rounded-xl shadow-glow-pink hover:scale-105 transition-all duration-300"
              >
                Select This Offering
              </button>
            </div>

            {/* Offering 2: Tech Audit */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-transparent hover:border-pink-light hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-pink-gold opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
              <h2 className="text-3xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent">
                Tech Audit
              </h2>
              <div className="text-4xl font-bold text-purple mb-4">$300</div>
              <ul className="space-y-3 mb-6 text-textGray">
                <li className="flex items-start">
                  <span className="text-pink mr-2">✓</span>
                  <span>Comprehensive review of website, app, or services suite</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink mr-2">✓</span>
                  <span>Detailed improvement & scalability suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink mr-2">✓</span>
                  <span>UI/UX recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink mr-2">+</span>
                  <span>$200 rush fee for 2-week turnaround</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setSelectedOffering(2);
                  setStep(2);
                }}
                className="w-full bg-gradient-pink-purple text-white px-6 py-3 rounded-xl shadow-glow-pink hover:scale-105 transition-all duration-300"
              >
                Select This Offering
              </button>
            </div>
          </div>
        )}

        {step === 2 && selectedOffering === 1 && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => {
                setStep(1);
                setSelectedOffering(null);
              }}
              className="mb-6 text-purple hover:text-pink transition-colors"
            >
              ← Back to Offerings
            </button>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30">
              <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
                4-Page Website Details
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Contact Information (Name, Email, Phone) *
                  </label>
                  <textarea
                    name="contactInfo"
                    value={siteFormData.contactInfo}
                    onChange={handleSiteFormChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-pink-light/30 rounded-lg focus:border-purple focus:outline-none"
                    placeholder="Your name, email, and phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Desired Domain Name *
                  </label>
                  <input
                    type="text"
                    name="domainName"
                    value={siteFormData.domainName}
                    onChange={handleSiteFormChange}
                    required
                    className="w-full px-4 py-3 border-2 border-pink-light/30 rounded-lg focus:border-purple focus:outline-none"
                    placeholder="example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="projectDetails"
                    value={siteFormData.projectDetails}
                    onChange={handleSiteFormChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-pink-light/30 rounded-lg focus:border-purple focus:outline-none"
                    placeholder="Tell me about your project, target audience, design preferences, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Upload Files (Optional)
                  </label>
                  <input
                    type="file"
                    name="files"
                    onChange={handleSiteFormChange}
                    className="w-full px-4 py-3 border-2 border-pink-light/30 rounded-lg focus:border-purple focus:outline-none"
                    accept=".pdf,.doc,.docx,.jpg,.png,.zip"
                  />
                  <p className="text-xs text-textGray mt-1">
                    Accepted formats: PDF, DOC, DOCX, JPG, PNG, ZIP
                  </p>
                </div>

                <div className="bg-pink-light/10 p-4 rounded-lg">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="rushFee"
                      checked={siteFormData.rushFee}
                      onChange={handleSiteFormChange}
                      className="mt-1 mr-3"
                    />
                    <span>
                      <span className="font-semibold">Add Rush Fee (+$500)</span>
                      <br />
                      <span className="text-sm text-textGray">2-week turnaround instead of 1 month</span>
                    </span>
                  </label>
                </div>

                <div className="border-t-2 border-pink-light/30 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold">Total:</span>
                    <span className="text-4xl font-bold text-purple">${calculateTotal()}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-pink-purple text-white px-6 py-4 rounded-xl shadow-glow-pink hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {step === 2 && selectedOffering === 2 && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => {
                setStep(1);
                setSelectedOffering(null);
              }}
              className="mb-6 text-purple hover:text-pink transition-colors"
            >
              ← Back to Offerings
            </button>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30">
              <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent">
                Tech Audit Details
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Contact Information (Name, Email, Phone) *
                  </label>
                  <textarea
                    name="contactInfo"
                    value={auditFormData.contactInfo}
                    onChange={handleAuditFormChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-pink-light/30 rounded-lg focus:border-purple focus:outline-none"
                    placeholder="Your name, email, and phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Audit Type *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer p-3 border-2 border-pink-light/30 rounded-lg hover:border-purple transition-colors">
                      <input
                        type="radio"
                        name="auditType"
                        value="site-revamp"
                        checked={auditFormData.auditType === "site-revamp"}
                        onChange={handleAuditFormChange}
                        className="mr-3"
                      />
                      <span>Website Revamp</span>
                    </label>
                    <label className="flex items-center cursor-pointer p-3 border-2 border-pink-light/30 rounded-lg hover:border-purple transition-colors">
                      <input
                        type="radio"
                        name="auditType"
                        value="app-revamp"
                        checked={auditFormData.auditType === "app-revamp"}
                        onChange={handleAuditFormChange}
                        className="mr-3"
                      />
                      <span>App Revamp</span>
                    </label>
                    <label className="flex items-center cursor-pointer p-3 border-2 border-pink-light/30 rounded-lg hover:border-purple transition-colors">
                      <input
                        type="radio"
                        name="auditType"
                        value="services-audit"
                        checked={auditFormData.auditType === "services-audit"}
                        onChange={handleAuditFormChange}
                        className="mr-3"
                      />
                      <span>Services Audit (up to 3 providers)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Tech Details *
                  </label>
                  <textarea
                    name="techDetails"
                    value={auditFormData.techDetails}
                    onChange={handleAuditFormChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-pink-light/30 rounded-lg focus:border-purple focus:outline-none"
                    placeholder="Describe your website, app, or services. Include URLs, tech stack if known, and current challenges."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Desired Outcome *
                  </label>
                  <textarea
                    name="desiredOutcome"
                    value={auditFormData.desiredOutcome}
                    onChange={handleAuditFormChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-pink-light/30 rounded-lg focus:border-purple focus:outline-none"
                    placeholder="What are you hoping to achieve with this audit? What problems do you want to solve?"
                  />
                </div>

                <div className="bg-pink-light/10 p-4 rounded-lg">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="rushFee"
                      checked={auditFormData.rushFee}
                      onChange={handleAuditFormChange}
                      className="mt-1 mr-3"
                    />
                    <span>
                      <span className="font-semibold">Add Rush Fee (+$200)</span>
                      <br />
                      <span className="text-sm text-textGray">2-week turnaround</span>
                    </span>
                  </label>
                </div>

                <div className="border-t-2 border-pink-light/30 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold">Total:</span>
                    <span className="text-4xl font-bold text-purple">${calculateTotal()}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-pink-purple text-white px-6 py-4 rounded-xl shadow-glow-pink hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setStep(2)}
              className="mb-6 text-purple hover:text-pink transition-colors"
            >
              ← Back to Form
            </button>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-glass border-2 border-pink-light/30">
              <h2 className="text-3xl font-heading font-bold mb-6 bg-gradient-pink-purple bg-clip-text text-transparent text-center">
                Complete Payment
              </h2>
              <div className="mb-6 p-4 bg-pink-light/10 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">
                    {selectedOffering === 1 ? "4-Page Website" : "Tech Audit"}
                    {(selectedOffering === 1 && siteFormData.rushFee) || (selectedOffering === 2 && auditFormData.rushFee) ? " (with Rush)" : ""}
                  </span>
                  <span className="text-3xl font-bold text-purple">${calculateTotal()}</span>
                </div>
              </div>
              <StripePaymentForm
                amount={calculateTotal()}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                buttonText={`Pay $${calculateTotal()}`}
              />
            </div>
          </div>
        )}
      </section>

      <WWSFooter />
    </div>
  );
}
