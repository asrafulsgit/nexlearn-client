import { useState } from "react";

const ManageSessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: "Math Basics",
      tutor: "Alice Johnson",
      status: "pending",
      fee: 0,
    },
    {
      id: 2,
      title: "English Writing",
      tutor: "John Smith",
      status: "approved",
      fee: 10,
    },
  ]);

  const [selectedSession, setSelectedSession] = useState(null);
  const [approvalModal, setApprovalModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [fee, setFee] = useState("");
  const [editData, setEditData] = useState({
    title: "",
    tutor: "",
    fee: 0,
  });

  const handleApprove = (session) => {
    setSelectedSession(session);
    setFee(session.fee || 0);
    setApprovalModal(true);
  };

  const confirmApprove = () => {
    const updated = sessions.map((s) =>
      s.id === selectedSession.id
        ? { ...s, status: "approved", fee: parseFloat(fee) || 0 }
        : s
    );
    setSessions(updated);
    setApprovalModal(false);
    setSelectedSession(null);
    setFee("");
  };

  const handleReject = (id) => {
    const filtered = sessions.filter((s) => s.id !== id);
    setSessions(filtered);
  };

  const handleDelete = (id) => {
    const filtered = sessions.filter((s) => s.id !== id);
    setSessions(filtered);
  };

  const handleEdit = (session) => {
    setEditData({
      title: session.title,
      tutor: session.tutor,
      fee: session.fee,
    });
    setSelectedSession(session);
    setEditModal(true);
  };

  const confirmEdit = () => {
    const updated = sessions.map((s) =>
      s.id === selectedSession.id
        ? {
            ...s,
            title: editData.title,
            tutor: editData.tutor,
            fee: parseFloat(editData.fee),
          }
        : s
    );
    setSessions(updated);
    setEditModal(false);
    setSelectedSession(null);
  };

  return (
  <> 
  <div className="max-w-7xl mx-auto px-4 min-h-[70vh]">
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-1">Manage Study Sessions</h2>
        <p className="text-gray-500 ">
          Approve, reject, update, or delete sessions.
        </p>
      </div>
      {/* sessions table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-md 
        overflow-hidden ">
          <thead className="bg-green-100 text-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Tutor</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Fee</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{session.title}</td>
                <td className="px-4 py-3">{session.tutor}</td>
                <td className="px-4 py-3 capitalize">{session.status}</td>
                <td className="px-4 py-3">
                  {session.fee === 0 ? "Free" : `$${session.fee}`}
                </td>
                <td className="px-4 py-3 space-x-2">
                  {session.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(session)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(session.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(session)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(session.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      {/* Approval Modal */}
      {approvalModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Set Session Fee</h3>
            <label className="block text-sm text-gray-700 mb-2">
              Is this session free or paid? (0 = Free)
            </label>
            <input
              type="number"
              min="0"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="Enter fee amount"
              className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setApprovalModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={confirmApprove}
              >
                Confirm Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Session</h3>
            <input
              type="number"
              min="0"
              value={editData.fee}
              onChange={(e) =>
                setEditData({ ...editData, fee: e.target.value })
              }
              placeholder="Fee (0 = Free)"
              className="w-full mb-4 border px-4 py-2 rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={confirmEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    
    </>
  );
};

export default ManageSessions;
