import React, { useContext } from "react";
import { AuthContext } from "../../../controllers/AuthProvider";
import { Link } from "react-router";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const {isLoggedIn}=useContext(AuthContext);
  return (
   <> 
   <Helmet>
        <title>NexLearn | About Us</title>
      </Helmet>
   <section className="min-h-screen bg-gray-50 py-10 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About NexLearn</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how NexLearn is revolutionizing the way students and tutors collaborate.
          </p>
        </div>

        {/* Section 1: Mission */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At NexLearn, our mission is to empower students through accessible and high-quality collaborative learning experiences.
            We connect learners with skilled tutors, provide structured study sessions, and foster a community of mutual growth and success.
          </p>
        </div>

        {/* Section 2: What We Offer */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">What We Offer</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Expert-led study sessions on a variety of subjects</li>
            <li>Structured session scheduling with real-time availability</li>
            <li>Interactive tools for better engagement and feedback</li>
            <li>Secure booking and transparent payment system</li>
            <li>Review and rating system to ensure quality</li>
          </ul>
        </div>

        {/* Section 3: Why Choose Us */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Why NexLearn?</h2>
          <p className="text-gray-600 leading-relaxed">
            NexLearn isn't just another tutoring platform. We are a collaborative study environment built for flexibility, accessibility,
            and growth. Whether you're a student seeking help, or a tutor ready to share knowledge, NexLearn provides the tools and
            support to make it happen.
          </p>
        </div>

        {/* Section 4: Join Our Community */}
        {!isLoggedIn && <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Ready to take the next step in your learning journey? Join NexLearn and experience a modern, engaging, and collaborative approach to education.
          </p>
          <Link
            to="/register"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Get Started
          </Link>
        </div>}
      </div>
    </section></>
  );
};

export default AboutUs;
