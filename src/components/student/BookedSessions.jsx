import { useEffect, useState } from "react";

const dummySessions = [
  {
    id: "1",
    title: "React Basics",
    date: "2025-07-22",
    tutor: "John Carter",
    fee: 0,
    image: "https://i.ibb.co/KD9kTGN/react.jpg"
  },
  {
    id: "2",
    title: "Advanced Python",
    date: "2025-07-28",
    tutor: "Jane Smith",
    fee: 25,
    image: "https://i.ibb.co/qmMb0GN/python.jpg"
  },
  {
    id: "3",
    title: "Web Security Essentials",
    date: "2025-08-01",
    tutor: "Alice Monroe",
    fee: 15,
    image: "https://i.ibb.co/mq1x57S/security.jpg"
  }
];

const BookedSessions = () => {
  const [bookedSessions, setBookedSessions] = useState([]);

  useEffect(() => {
    setBookedSessions(dummySessions);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 min-h-screen
     bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Booked Sessions</h1>
      <p className="text-gray-500 mb-6">
        View and manage all your enrolled study sessions.
      </p>

      {bookedSessions.length === 0 ? (
        <p className="text-gray-600 mt-10">You haven’t booked any sessions yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-[850px] w-full  table-auto text-left text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Tutor</th>
                <th className="px-6 py-4 font-semibold">Fee</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookedSessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{session.title}</td>
                  <td className="px-6 py-4 text-gray-700">{session.date}</td>
                  <td className="px-6 py-4 text-gray-700">{session.tutor}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {session.fee === 0 ? "Free" : `$${session.fee}`}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition"
                      onClick={() => alert(`Viewing details for ${session.title}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default BookedSessions;
