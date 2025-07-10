import React from "react";

 const  Footer =()=> {
  return (
     <footer className="bg-green-600 text-gray-100 pt-12 pb-6 px-4 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">NexLearn</h2>
          <p className="text-sm leading-relaxed">
            NexLearn connects students and tutors in a collaborative environment
            to enhance learning through structured sessions and shared resources.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/sessions" className="hover:text-white transition">Study Sessions</a></li>
            <li><a href="/tutors" className="hover:text-white transition">Tutors</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="/accessibility" className="hover:text-white transition">Accessibility</a></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Connect with Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-white transition" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current text-gray-200 hover:text-white" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07C2 17.1 5.66 21.28 10.44 22v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33V22C18.34 21.28 22 17.1 22 12.07z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current text-gray-200 hover:text-white" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 001.88-2.35 8.55 8.55 0 01-2.7 1.03A4.26 4.26 0 0015.5 4c-2.37 0-4.29 1.92-4.29 4.3 0 .34.03.68.1 1A12.08 12.08 0 013 5.15a4.29 4.29 0 001.32 5.72A4.2 4.2 0 012.8 10v.05c0 2.06 1.47 3.78 3.42 4.17a4.26 4.26 0 01-1.94.07c.55 1.7 2.12 2.94 3.99 2.98A8.56 8.56 0 012 19.54a12.06 12.06 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68v-.53A8.36 8.36 0 0022.46 6z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-current text-gray-200 hover:text-white" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8.34 19H5.66V9h2.68v10zM7 7.65C6.09 7.65 5.34 6.9 5.34 6S6.09 4.35 7 4.35s1.66.75 1.66 1.65S7.91 7.65 7 7.65zM19 19h-2.68v-5.37c0-1.28-.03-2.93-1.79-2.93-1.8 0-2.08 1.4-2.08 2.84V19h-2.68V9h2.57v1.37h.04c.36-.68 1.25-1.39 2.57-1.39 2.75 0 3.26 1.81 3.26 4.17V19z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition" aria-label="YouTube">
              <svg className="w-5 h-5 fill-current text-gray-200 hover:text-white" viewBox="0 0 24 24">
                <path d="M19.6 3.2H4.4C3.08 3.2 2 4.28 2 5.6v12.8c0 1.32 1.08 2.4 2.4 2.4h15.2c1.32 0 2.4-1.08 2.4-2.4V5.6c0-1.32-1.08-2.4-2.4-2.4zM10 16V8l6 4-6 4z"/>
              </svg>
            </a>
          </div>
          <p className="text-sm">📧 support@nexlearn.com</p>
        </div>
      </div>

      <div className="border-t border-green-500 pt-6 text-center text-sm text-green-100">
        © 2025 NexLearn. All rights reserved. &nbsp; | &nbsp; Made with 💚 by Asraful
      </div>
    </footer>
  );
}

export default Footer;