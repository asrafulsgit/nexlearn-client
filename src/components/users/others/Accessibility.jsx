// pages/Accessibility.jsx

import React from "react";
import { Helmet } from "react-helmet";

const Accessibility = () => {
  return (
  <> 
  <Helmet>
        <title>NexLearn | Accessibility</title>
      </Helmet> 
  <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>
      <p className="mb-4">
        <strong>NextLearn</strong> is committed to providing an inclusive and accessible learning environment for all users, regardless of ability or technology.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our Accessibility Goals</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Support screen readers and assistive technologies</li>
        <li>Use sufficient color contrast and text alternatives</li>
        <li>Ensure keyboard navigation throughout the platform</li>
        <li>Maintain responsive and mobile-friendly layout</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Feedback</h2>
      <p className="mb-4">
        If you encounter accessibility issues, please contact us at <a href="mailto:support@nextlearn.com" className="text-green-600">support@nextlearn.com</a>. We are continuously improving our accessibility features.
      </p>

      <p className="text-sm text-gray-600 mt-8">Last updated: July 2025</p>
    </section>
    
    </>
  );
};

export default Accessibility;
