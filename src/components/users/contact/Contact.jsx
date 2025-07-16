import React, { useState } from "react";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Message:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
  <> 
  <Helmet>
        <title>NexLearn | Contact</title>
      </Helmet>
  
  <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600">We'd love to hear from you! Reach out with any questions, feedback, or inquiries.</p>
        </div>

        {/* Contact Info and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Contact Details</h2>
            <p className="text-gray-600"><strong>📍 Address:</strong> 123 NexLearn Avenue, Dhaka, Bangladesh</p>
            <p className="text-gray-600"><strong>📞 Phone:</strong> +880 123 456 789</p>
            <p className="text-gray-600"><strong>📧 Email:</strong> support@nexlearn.com</p>
            <p className="text-gray-600">Feel free to visit us or drop us an email any time. We are here to help!</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Our Location</h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="NexLearn Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9023883049623!2d90.39123541538474!3d23.750903794653373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8940dd948c7%3A0x9e390ba6b25a7e5b!2sDhaka%20University!5e0!3m2!1sen!2sbd!4v1600000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section></>
  );
};

export default Contact;
