import { useState } from "react";

// Dummy session data (replace with real API data later)
const dummySessions = [
  {
    id: "1",
    title: "Advanced JavaScript",
    image: "https://i.ibb.co/BB0WRD5/session1.jpg",
    registrationStart: "2025-07-01",
    registrationEnd: "2025-07-10",
    classStart: "2025-07-15",
    classEnd: "2025-08-15",
    status: "approved",
  },
  {
    id: "2",
    title: "React for Beginners",
    image: "https://i.ibb.co/qdD3FxZ/session2.jpg",
    registrationStart: "2025-07-05",
    registrationEnd: "2025-07-12",
    classStart: "2025-07-20",
    classEnd: "2025-08-10",
    status: "rejected",
  },
  {
    id: "3",
    title: "Node.js Masterclass",
    image: "https://i.ibb.co/tbWwrRw/session3.jpg",
    registrationStart: "2025-07-03",
    registrationEnd: "2025-07-11",
    classStart: "2025-07-18",
    classEnd: "2025-08-12",
    status: "pending",
  },
];

const MySessions = () => {
  const [sessions, setSessions] = useState(dummySessions);

  const handleResubmit = (id) => {
    const updated = sessions.map((session) =>
      session.id === id
        ? { ...session, status: "pending" }
        : session
    );
    setSessions(updated);
    alert("Approval request sent successfully!");
  };

  return (
    <section className="min-h-[70vh]  max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">My Study Sessions</h2>
      <p className="text-gray-600 mb-6">
        View and manage all of your submitted study sessions.
      </p>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-green-600 text-white uppercase">
            <tr>
              <th className="px-6 py-3">Sl No.</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Reg. Dates</th>
              <th className="px-6 py-3">Class Dates</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={session.id} className="border-b border-gray-300">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={session.image}
                    alt={session.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {session.title}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {session.registrationStart} → {session.registrationEnd}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {session.classStart} → {session.classEnd}
                </td>
                <td className="px-6 py-4">
                  {session.status === "approved" && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                      Approved
                    </span>
                  )}
                  {session.status === "rejected" && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs">
                      Rejected
                    </span>
                  )}
                  {session.status === "pending" && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {session.status === "rejected" ? (
                    <button
                      onClick={() => handleResubmit(session.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs"
                    >
                      Send New Request
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs italic">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MySessions;
