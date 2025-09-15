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
        <h3 className="text-2xl font-heading mb-6 text-center">Work With Me</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
          />
          <div className="flex gap-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-1/2 p-2 border rounded-xl"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-1/2 p-2 border rounded-xl"
            />
          </div>
          <textarea
            name="notes"
            placeholder="Project Details"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
          />
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
