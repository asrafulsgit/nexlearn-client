import React from "react";
import booksImage from '../../../assets/books.jpg'
const WhyNexLearn = () => {
  const features = [
    {
      iconBg: "bg-blue-500",
      title: "Real-time Collaboration",
      desc: "Work together seamlessly with integrated tools for instant interaction.",
      svg: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      iconBg: "bg-green-500",
      title: "Verified Tutors",
      desc: "Access a network of qualified and experienced educators.",
      svg: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c0 2.873.99 5.51 2.66 7.534L12 22.944l6.396-3.41A12.001 12.001 0 0021.056 12c0-2.873-.99-5.51-2.66-7.534z" />
        </svg>
      ),
    },
    {
      iconBg: "bg-purple-500",
      title: "Resource Library",
      desc: "A comprehensive collection of study materials at your fingertips.",
      svg: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      iconBg: "bg-red-500",
      title: "Easy Access for Students",
      desc: "Intuitive design ensures a smooth and accessible learning experience.",
      svg: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="why-nexlearn" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Why Choose NexLearn?</h2>
        <p className="mt-4 text-lg text-gray-600 text-center mb-12">Discover the advantages that set us apart.</p>
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          <div className="lg:w-1/2 space-y-8 mb-12 lg:mb-0">
            {features.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md text-white ${item.iconBg}`}>
                  {item.svg}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/2">
            <img
              src={booksImage}
              alt="Students collaborating"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNexLearn;