import React, { useState } from "react";

const faqsData = [
  {
    question: "How do I register on the platform?",
    answer:
      "You can register by clicking the Sign Up button on the top right corner and filling out the registration form.",
  },
  {
    question: "How can I book a study session?",
    answer:
      "Browse available sessions, select one, and click the Book Now button if registration is open.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, debit cards, and online payment platforms for paid sessions.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel or reschedule your booking up to 24 hours before the session starts via your dashboard.",
  },
  {
    question: "Is there a fee for joining study sessions?",
    answer:
      "Some sessions are free while others have a registration fee which will be clearly indicated.",
  },
  {
    question: "How do I become a tutor?",
    answer:
      "Click on the Become a Tutor link and fill out the application form. Our team will review your application.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Use the Forgot Password link on the login page to receive instructions to reset your password via email.",
  },
  {
    question: "Can I access study materials offline?",
    answer:
      "Currently, study materials are available only online through the platform.",
  },
  {
    question: "What should I do if I encounter technical issues?",
    answer:
      "Contact our support team via the Contact page or email support@nexlearn.com for assistance.",
  },
  {
    question: "Are sessions recorded for later viewing?",
    answer:
      "Some sessions are recorded and available for replay. Check session details to confirm.",
  },
  {
    question: "How is my personal information protected?",
    answer:
      "We use industry-standard security measures to protect your data and never share it without consent.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via the Contact page or email at support@nexlearn.com.",
  },
];

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="border-b border-gray-300 py-4">
      <button
        className="w-full text-left flex justify-between items-center text-lg font-semibold text-gray-800 focus:outline-none"
        onClick={toggle}
      >
        {faq.question}
        <span className="ml-2 text-green-600">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isOpen ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    </div>
  );
};


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto p-6 my-12 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Frequently Asked Questions
      </h1>
      <div>
        {faqsData.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            toggle={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
