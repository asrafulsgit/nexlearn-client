// pages/PrivacyPolicy.jsx

import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
  <> <Helmet>
        <title>NexLearn | Privacy Policy</title>
      </Helmet>  <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At <strong>NextLearn</strong>, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Personal information (name, email, avatar) during registration</li>
        <li>Session participation and booking history</li>
        <li>Feedback, reviews, and learning interactions</li>
        <li>Cookies for session management and analytics</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>To provide access to courses and study sessions</li>
        <li>To improve learning recommendations and user experience</li>
        <li>To manage payments and access control</li>
        <li>To send updates or administrative notices</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
      <p className="mb-4">
        We implement appropriate security measures to protect your data against unauthorized access, disclosure, or destruction.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
      <p className="mb-4">
        You can request access, correction, or deletion of your data by contacting our support team at <a href="mailto:support@nextlearn.com" className="text-green-600">support@nextlearn.com</a>.
      </p>

      <p className="text-sm text-gray-600 mt-8">Last updated: July 2025</p>
    </section></> 
  );
};

export default PrivacyPolicy;
