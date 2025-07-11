import { useState } from "react";

const dummyMaterials = [
  {
    id: 1,
    title: "Algebra Basics",
    image: "https://via.placeholder.com/100",
    sessionTitle: "Mathematics - Session 01",
    driveLink: "https://drive.google.com/file/d/abc123/view", // sample link
  },
  {
    id: 2,
    title: "Photosynthesis Notes",
    image: "https://via.placeholder.com/100",
    sessionTitle: "Biology - Session 03",
    driveLink: "https://drive.google.com/file/d/xyz789/view", // sample link
  },
];


const MyMatetials = () => {
  const [materials, setMaterials] = useState(dummyMaterials);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const handleEdit = (id, updatedMaterial) => {
    setMaterials(materials.map(m => (m.id === id ? updatedMaterial : m)));
    setEditing(null);
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
    setDeleting(null);
  };

  return (
    <div className="min-h-[70vh]  max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Uploaded Materials</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-4">Material Image</th>
              <th className="p-4">Material Title</th>
              <th className="p-4">Session Title</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={material.image}
                    alt={material.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="p-4 font-medium">{material.title}</td>
                <td className="p-4">{material.sessionTitle}</td>
                <td className="p-4 text-center space-x-3">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setEditing(material)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => setDeleting(material)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded-lg w-full max-w-md">
    <h2 className="text-xl font-semibold mb-4">Edit Material</h2>

    {/* Title */}
    <input
      type="text"
      value={editing.title}
      onChange={(e) =>
        setEditing({ ...editing, title: e.target.value })
      }
      className="w-full mb-4 border p-2 rounded"
      placeholder="Material Title"
    />

    {/* Image URL */}
    <input
      type="text"
      value={editing.image}
      onChange={(e) =>
        setEditing({ ...editing, image: e.target.value })
      }
      className="w-full mb-4 border p-2 rounded"
      placeholder="Image URL"
    />

    {/* Drive Link */}
    <input
      type="text"
      value={editing.driveLink || ""}
      onChange={(e) =>
        setEditing({ ...editing, driveLink: e.target.value })
      }
      className="w-full mb-4 border p-2 rounded"
      placeholder="Google Drive Link"
    />

    {/* Buttons */}
    <div className="flex justify-end gap-3">
      <button
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => setEditing(null)}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => handleEdit(editing.id, editing)}
      >
        Save
      </button>
    </div>
  </div>
</div>

      )}

      {/* Delete Modal */}
      {deleting && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Are you sure you want to delete “{deleting.title}”? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleting(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(deleting.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMatetials;
