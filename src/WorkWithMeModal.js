import React, { useState } from "react";

export default function WorkWithMeModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send formData to backend or email service
    alert("Form submitted!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-bgLight p-8 rounded-2xl shadow-xl max-w-md w-full">
        {/* Modal Header */}
        <h3 className="text-2xl font-heading font-bold mb-6 text-center">
          Work With Me
        </h3>

        <form
          action="https://formspree.io/f/xovnznyq"
          method="POST"
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-semibold">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="(555) 555-5555"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            />
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label htmlFor="startDate" className="block mb-1 font-semibold">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-xl"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="endDate" className="block mb-1 font-semibold">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block mb-1 font-semibold">
              Project Details
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Tell me about your project..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-textDark text-bgLight py-2 rounded-xl hover:scale-105 transition-transform"
          >
            Submit
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
