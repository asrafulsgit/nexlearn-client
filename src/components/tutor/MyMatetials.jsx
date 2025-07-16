import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../../additionals/Loader";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import { queryClient } from "../../utilities/queryclient";
import Fetching from "../../additionals/Fetching";
import { Helmet } from "react-helmet";

const MyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Fetch materials
  const { data, isPending, isError, error,isFetching } = useQuery({
    queryKey: ["tmaterials"],
    queryFn: () => apiRequiestWithCredentials("get", "/materials/tutor"),
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
  });
  
  // Update state when data changes
  useEffect(() => {
    if (data?.materials) {
      setMaterials(data.materials);
    }
  }, [data]);

  // Handle error toast outside render
  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || "Failed to fetch materials");
    }
  }, [isError, error]);

  // Edit handler
  const [updateLoading,setUpdateLoading]=useState(false)
  const handleEdit = async(id, updatedMaterial) => {
    setUpdateLoading(true);
    try {
          await apiRequiestWithCredentials("put", `/materials/tutor/${id}`, updatedMaterial);
          await queryClient.invalidateQueries({ queryKey: ['tmaterials'] });
            setEditing(null);
            toast.success("Material updated.");
          } catch (err) {
            console.log(err)
            toast.error("Failed to update material");
          }finally{
            updateLoading(false);
          }
  };

  // Delete handler
  const handleDelete = async(id) => {
    setUpdateLoading(true);
    try {
          await apiRequiestWithCredentials("delete", `/materials/tutor/${id}`);
          await queryClient.invalidateQueries({ queryKey: ['tmaterials'] });
            setDeleting(null);
            toast.success("Material deleted.");
          } catch (err) {
            console.log(err)
            toast.error("Failed to delete material");
          }finally{
            setUpdateLoading(false);
          } 
   
  };

  if (isPending || !data) {
    return <Loader />;
  }

  return (
  <>  
  <Helmet>
        <title>NexLearn | My Materials</title>
      </Helmet>
  <div className="min-h-[70vh] max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Uploaded Materials</h1>

      <div className="overflow-x-auto">
      {isFetching ? <Fetching /> : materials.length > 0 ?  
      <table className="min-w-[900px] w-full  table-auto text-left ">
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
              <tr key={material?._id} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={material?.image}
                    alt={material?.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="p-4 font-medium">{material?.title?.length > 17 ? `${material?.title.slice(0,17)}...` : material?.title}</td>
                <td className="p-4">{material?.session?.title?.length > 20 ? `${material?.session?.title?.slice(0,20)}...` : material?.session?.title}</td>
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
        </table> : 
        <div className="min-h-[10vh] w-full flex justify-center items-center">
          <p className="text-green-600">You have no materials.</p>
        </div>
        }
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Material</h2>

            <input
              type="text"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full mb-4 border p-2 rounded"
              placeholder="Material Title"
            />

            <input
              type="text"
              value={editing.image}
              onChange={(e) => setEditing({ ...editing, image: e.target.value })}
              className="w-full mb-4 border p-2 rounded"
              placeholder="Image URL"
            />

            <input
              type="text"
              value={editing.driveLink || ""}
              onChange={(e) => setEditing({ ...editing, driveLink: e.target.value })}
              className="w-full mb-4 border p-2 rounded"
              placeholder="Google Drive Link"
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleEdit(editing?._id, editing)}
              >
                {updateLoading ? 'Saving..' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleting && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Confirm Deletion</h2>
            <p className="mb-4 text-sm text-gray-600">
              Are you sure you want to delete “{deleting?.title}”? This action cannot be undone.
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
                onClick={() => handleDelete(deleting?._id)}
              >
               {updateLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div></>
  );
};

export default MyMaterials;
