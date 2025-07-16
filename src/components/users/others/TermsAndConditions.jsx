// pages/TermsAndConditions.jsx

import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4">
        These Terms & Conditions ("Terms") govern your use of the <strong>NextLearn</strong> platform. By using our services, you agree to comply with these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. User Accounts</h2>
      <p className="mb-4">
        You must register to access our content. You are responsible for maintaining the confidentiality of your login credentials.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Acceptable Use</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>You must not misuse the platform for unlawful or harmful activities</li>
        <li>Content you submit must be your own and not violate any third-party rights</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Payments and Refunds</h2>
      <p className="mb-4">
        Paid sessions are non-refundable once confirmed, unless canceled by the tutor or admin.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Account Suspension</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate accounts that violate our policies or misuse the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms at any time. Continued use after changes implies your acceptance.
      </p>

      <p className="text-sm text-gray-600 mt-8">Last updated: July 2025</p>
    </section>
  );
};

export default TermsAndConditions;
