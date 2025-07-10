import React from "react";

const StudySessions= () => {
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
      <div className="bg-white rounded-lg shadow p-6 mb-12 flex flex-col lg:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search sessions..."
          className="w-full lg:w-2/5 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select className="w-full lg:w-1/4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">Filter by Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            <img
              src="https://source.unsplash.com/random/400x200?study"
              alt="Session"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Session Title {index + 1}</h3>
              <p className="text-sm text-gray-600 mb-4">
                A brief description of the session goes here. It gives users an idea of what to expect.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800">
                  Ongoing
                </span>
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
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
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
