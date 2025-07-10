import React from "react";

// Example session data (replace with API data)
const sessions = [
  {
    id: 1,
    title: "JavaScript Basics Study Group",
    description: "Learn the fundamentals of JavaScript with peers.",
    registrationDeadline: "2025-07-15T23:59:59Z",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Deep dive into React hooks, context, and performance.",
    registrationDeadline: "2025-06-30T23:59:59Z",
  },
  // ...more sessions
];

// Helper to check if registration is open
const isOngoing = (deadline) => new Date(deadline) > new Date();

const StudySessions = ()=> {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Study Sessions</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map(({ id, title, description, registrationDeadline }) => {
          const ongoing = isOngoing(registrationDeadline);
          return (
            <div
              key={id}
              className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-700 mb-4">{description}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  ongoing
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {ongoing ? "Ongoing" : "Closed"}
              </span>
              <button className="text-nexlearn-primary hover:underline font-semibold">
                Read More →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default StudySessions;