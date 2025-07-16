import { useEffect, useState } from "react";
import Loader from "../../additionals/Loader";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import { queryClient } from "../../utilities/queryclient";
import Fetching from "../../additionals/Fetching";




const ManageMaterials = () => {
  const [materials, setMaterials] = useState([]);

  // get all pending sessions
  const {data, isPending, isError, error,isFetching} = useQuery({
    queryKey: ['tmaterials'],
    queryFn: () => apiRequiestWithCredentials('get', '/materials/admin'),
   refetchOnMount: 'always'
  });
  useEffect(() => {
    if (data?.materials) {
      setMaterials(data.materials);
    }
  }, [data]);




  const [deleteModal, setDeleteModal] = useState(null);
  const [viewMaterial, setViewMaterial] = useState(null);
  const [deleteLoading,setDeleteLoading] =useState(false)
  const handleDelete = async(id) => {
    setDeleteLoading(true);
     try {
             await apiRequiestWithCredentials("delete", `/materials/admin/${id}`);
             await queryClient.invalidateQueries({ queryKey: ['tmaterials'] });
             setDeleteModal(null);
             toast.success("Material deleted.");
           } catch (err) {
             console.log(err)
             toast.error("Failed to delete material.");
           }finally{
            setDeleteLoading(false);
           }
 
  };


  if(isPending){
    return <Loader />;
  }
  if(isError){
    return toast.error(error?.response?.data?.message);
  }
  return (
  <> 
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[70vh]">
      <div className="">
      <h2 className="text-2xl font-bold mb-1">Manage Study Materials</h2>
      <p className="text-gray-500 ">
        Admin can view and remove outdated or inappropriate materials uploaded by tutors.
      </p>
</div>
      <div className={`overflow-x-auto ${isFetching && 'mt-10'}`}>
      {isFetching ? <Fetching />  :  materials.length !== 0 ? 
      <table className="min-w-[950px] w-full mt-10 text-sm bg-white rounded shadow">
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
              <tr key={mat?._id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img src={mat?.image} alt={mat?.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-4 py-3">{mat?.title.length > 20 ? `${mat?.title.slice(0,20)}...` : mat?.title}</td>
                <td className="px-4 py-3">{ mat?.session?.title.length > 20 ? `${mat?.session?.title.slice(0,20)}...` : mat?.session?.title}</td>
                <td className="px-4 py-3">{mat?.tutor?.email}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => setViewMaterial(mat)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setDeleteModal(mat?._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        :
        <div className="min-h-[10vh] w-full flex justify-center items-center">
          <p className="text-green-600">No materials available</p>
        </div>
        } 
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
              {deleteLoading ? 'Deleting...' :  'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    
    </> 
  );
};

export default ManageMaterials;
