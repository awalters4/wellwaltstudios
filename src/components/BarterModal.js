import React, { useState } from "react";

export default function BarterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    serviceRequested: "",
    offeringDescription: "",
    monetaryValue: "",
    portfolio: "",
    timeline: "",
    barterType: "",
    additionalNotes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h3 className="text-2xl font-heading font-bold mb-4 bg-gradient-pink-purple bg-clip-text text-transparent">
            Proposal Submitted
          </h3>
          <p className="text-textGray mb-6">
            Thank you for your submission. If your offer aligns with one of my current needs, you'll receive a follow-up email within 3–5 business days.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
                serviceRequested: "",
                offeringDescription: "",
                monetaryValue: "",
                portfolio: "",
                timeline: "",
                barterType: "",
                additionalNotes: "",
              });
              onClose();
            }}
            className="w-full bg-gradient-pink-purple text-white py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-glow-pink font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <h3 className="text-2xl font-heading font-bold mb-3 text-center bg-gradient-pink-purple bg-clip-text text-transparent">
          Submit a Barter Proposal
        </h3>
        <p className="text-textGray text-sm mb-6 text-center leading-relaxed">
          I accept selective barter arrangements when the value you offer matches the value of the work you're requesting. Fill out the form below with as much detail as possible. If it's a good fit, you'll receive a follow-up email to discuss next steps.
        </p>

        <form
          action="https://formspree.io/f/xovnznyq"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label htmlFor="fullName" className="block mb-1 font-semibold text-sm">
              Full Name / Business Name <span className="text-pink">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="John Doe / Acme Corp"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-sm">
              Email Address <span className="text-pink">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="serviceRequested" className="block mb-1 font-semibold text-sm">
              What service do you want from me? <span className="text-pink">*</span>
            </label>
            <select
              id="serviceRequested"
              name="serviceRequested"
              value={formData.serviceRequested}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink focus:border-transparent"
            >
              <option value="">Choose one</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-app-development">Mobile App Development</option>
              <option value="product-project-maintenance">Product/Project Maintenance</option>
              <option value="technology-consulting">Technology Consulting</option>
              <option value="fractional-cto">Fractional CTO</option>
              <option value="custom-project">Custom Project</option>
            </select>
          </div>

          <div>
            <label htmlFor="offeringDescription" className="block mb-1 font-semibold text-sm">
              What are you offering in exchange? <span className="text-pink">*</span>
            </label>
            <textarea
              id="offeringDescription"
              name="offeringDescription"
              placeholder="Describe the service, product, or resource you want to barter. Be specific about quality, quantity, frequency, or any deliverables."
              value={formData.offeringDescription}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="monetaryValue" className="block mb-1 font-semibold text-sm">
              What is the monetary value of what you're offering? <span className="text-pink">*</span>
            </label>
            <input
              id="monetaryValue"
              type="text"
              name="monetaryValue"
              placeholder="List your estimated value, rates, or price breakdown"
              value={formData.monetaryValue}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink focus:border-transparent"
            />
            <p className="text-xs text-textGray mt-1">This helps determine fairness and feasibility.</p>
          </div>

          <div>
            <label htmlFor="portfolio" className="block mb-1 font-semibold text-sm">
              Portfolio or Proof of Work (Links or Attachments)
            </label>
            <input
              id="portfolio"
              type="text"
              name="portfolio"
              placeholder="Share examples, samples, or evidence of quality"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="timeline" className="block mb-1 font-semibold text-sm">
              Timeline
            </label>
            <input
              id="timeline"
              type="text"
              name="timeline"
              placeholder="When can you start, and what's your expected timeline for your part of the exchange?"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="barterType" className="block mb-1 font-semibold text-sm">
              Is this a full barter or partial barter with cash? <span className="text-pink">*</span>
            </label>
            <select
              id="barterType"
              name="barterType"
              value={formData.barterType}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink focus:border-transparent"
            >
              <option value="">Choose one</option>
              <option value="full-barter">Full barter</option>
              <option value="50-50-hybrid">50/50 hybrid</option>
              <option value="barter-deposit">Barter + deposit</option>
            </select>
          </div>

          <div>
            <label htmlFor="additionalNotes" className="block mb-1 font-semibold text-sm">
              Additional Notes (Optional)
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Anything else I should know?"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink focus:border-transparent"
            />
          </div>

          {/* Terms & Expectations */}
          <div className="bg-bgWarm p-4 rounded-xl border border-pink-light/30 mt-6">
            <h4 className="font-semibold text-sm mb-2">Terms & Expectations</h4>
            <p className="text-xs text-textGray mb-2">By submitting a barter proposal, you acknowledge the following:</p>
            <ul className="text-xs text-textGray space-y-1 list-disc list-inside">
              <li>All accepted barter projects require a signed barter agreement.</li>
              <li>Both sides must deliver equivalent value based on mutually agreed terms.</li>
              <li>Third-party costs (hosting, domain, software fees, etc.) are not included in barter and must be paid by the client.</li>
              <li>I reserve the right to decline proposals that are not a good fit or do not meet the required quality standards.</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-pink-purple text-white py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-glow-pink font-semibold mt-6"
          >
            Submit Proposal
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 text-textGray hover:underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
