import React, { useState } from "react";
const sessions = [
  {
    title: "Advanced Calculus Review",
    description: "Deep dive into multi-variable calculus and differential equations.",
    image: "https://images.unsplash.com/photo-1701170645257-8345722edf47?crop=entropy&q=80&w=1080",
    status: "Ongoing",
    date: "2024-08-15",
  },
  {
    title: "Introduction to Python Programming",
    description: "Learn the basics of Python for beginners, including data structures.",
    image: "https://images.unsplash.com/photo-1685599504130-9ee12eef06eb?crop=entropy&q=80&w=1080",
    status: "Closed",
    date: "2024-07-01",
  },
  {
    title: "Organic Chemistry Fundamentals",
    description: "Essential concepts for understanding organic reactions and structures.",
    image: "https://images.unsplash.com/photo-1588170645026-dc9e6a4eb215?crop=entropy&q=80&w=1080",
    status: "Ongoing",
    date: "2024-08-20",
  },
  {
    title: "Data Science with R",
    description: "Explore data analysis, visualization, and machine learning with R.",
    image: "https://placehold.co/600x400?text=Data+Science",
    status: "Ongoing",
    date: "2024-09-01",
  },
  {
    title: "Full-Stack Web Development",
    description: "Build dynamic web applications using modern frameworks.",
    image: "https://placehold.co/600x400?text=Web+Development",
    status: "Closed",
    date: "2024-06-10",
  },
  {
    title: "Quantum Physics Explained",
    description: "An accessible introduction to the mysteries of quantum mechanics.",
    image: "https://placehold.co/600x400?text=Physics",
    status: "Ongoing",
    date: "2024-09-15",
  },
];


const StudySessions= () => {
  const [activePage, setActivePage] = useState(1);
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Study Sessions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and join collaborative study sessions that match your interests and schedule.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-12 flex 
      flex-col lg:flex-row lg:justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search sessions..."
          className="w-full lg:w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select className="w-full lg:w-1/4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">Filter by Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions?.map((session, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-md 
          transition overflow-hidden relative flex flex-col h-full">
            <div className="relative">
              <img
                src={session.image}
                alt="Session"
                className="w-full h-48 object-cover"
              />
              {/* Status Badge */}
              <div className={`absolute top-3 right-3 px-3 py-1 text-sm rounded-full font-semibold ${
                session.status === "Ongoing"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {session.status}
              </div>
            </div>
            <div className="flex flex-col justify-between flex-grow p-5">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {session.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {session.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Starts: {session.date}</span>
                <a
                  href="#"
                  className="text-sm text-green-600 hover:text-green-800 font-medium"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-16">
        <nav className="inline-flex items-center space-x-2 text-sm">
          <a href="#" className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
            Previous
          </a>
          {[1, 2, 3].map((page) => (
            <a
              key={page}
              href="#"
              onClick={() => setActivePage(page)}
              className={`px-4 py-2 rounded-md border border-gray-300  ${
                activePage === page ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </a>
          ))}
          <a href="#" className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
            Next
          </a>
        </nav>
      </div>
    </section>
  );
};

export default StudySessions;
