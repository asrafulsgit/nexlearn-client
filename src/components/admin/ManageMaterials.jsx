import { useState } from "react";

const initMetials =[
    {
      id: 1,
      title: "Algebra Basics",
      image: "https://via.placeholder.com/100",
      sessionTitle: "Mathematics - Session 01",
      tutorEmail: "tutor1@example.com",
    },
    {
      id: 2,
      title: "Photosynthesis Notes",
      image: "https://via.placeholder.com/100",
      sessionTitle: "Biology - Session 03",
      tutorEmail: "tutor2@example.com",
    },
  ]


const ManageMaterials = () => {
  const [materials, setMaterials] = useState(initMetials);

  const [deleteModal, setDeleteModal] = useState(null);
    const [viewMaterial, setViewMaterial] = useState(null);
  const handleDelete = (id) => {
    setMaterials((prev) => prev.filter((mat) => mat.id !== id));
    setDeleteModal(null);
  };

  return (
  <> 
    <div className="max-w-7xl mx-auto px-4 min-h-[70vh]">
      <div className="my-8">
      <h2 className="text-2xl font-bold mb-1">Manage Study Materials</h2>
      <p className="text-gray-500 ">
        Admin can view and remove outdated or inappropriate materials uploaded by tutors.
      </p>
</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded shadow">
          <thead className="bg-green-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Session title</th>
              <th className="px-4 py-3 text-left">Tutor Email</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((mat) => (
              <tr key={mat.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img src={mat.image} alt={mat.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-4 py-3">{mat.title}</td>
                <td className="px-4 py-3">{mat.sessionTitle}</td>
                <td className="px-4 py-3">{mat.tutorEmail}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => setViewMaterial(mat)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setDeleteModal(mat.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

      {/* View Modal */}
      {viewMaterial && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Material Details</h3>
            <img src={viewMaterial.image} alt={viewMaterial.title} className="w-full h-48 object-cover mb-4 rounded" />
            <p className="mb-2"><strong>Title:</strong> {viewMaterial.title}</p>
            <p className="mb-4">
              <strong>Drive Link:</strong>{" "}
              <a href={viewMaterial.driveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View Resource
              </a>
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setViewMaterial(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this material?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    
    </> 
  );
};

export default ManageMaterials;
