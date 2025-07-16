import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import Loader from "../../additionals/Loader";
import { toast } from "react-toastify";
import { queryClient } from "../../utilities/queryclient";
import Fetching from "../../additionals/Fetching";



const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editNote, setEditNote] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);


  // get all notes created by student
  const { data, isPending, isError, error,isFetching } = useQuery({
    queryKey: ["snotes"],
    queryFn: () => apiRequiestWithCredentials("get", "/notes/student"),
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
  });

  // Update state when data changes
    useEffect(() => {
      if (data?.notes) {
        setNotes(data.notes);
      }
    }, [data]);
   
    // Handle error toast outside render
      useEffect(() => {
        if (isError) {
          toast.error(error?.response?.data?.message || "Failed to fetch notes");
        }
      }, [isError, error]);



  // update note settings
  const [updaleLoading,setUpdateLoading]=useState(false)
  const handleUpdate = async(id) => {
    setUpdateLoading(true)
     try {
              await apiRequiestWithCredentials("put", `/notes/student/${id}`, editNote);
              await queryClient.invalidateQueries({ queryKey: ['snotes'] });
                setEditNote(null);
                toast.success("Note updated.");
                setShowEdit(false);
              } catch (err) {
                console.log(err)
                toast.error("Failed to update note");
              }finally{
setUpdateLoading(false)
              }
    
  };

  
  const handleDelete = async() => {
    setUpdateLoading(true)
     try {
          await apiRequiestWithCredentials("delete", `/notes/student/${deleteId}`);
          await queryClient.invalidateQueries({ queryKey: ['snotes'] });
          setDeleteId(null);
          toast.success("Note deleted.");
          setShowDelete(false);
          } catch (err) {
            console.log(err)
            toast.error("Failed to delete note");
          }finally{
            setUpdateLoading(false)
          }


  };



  // load page when data fateching 
  if (isPending || !data) {
    return <Loader />;
  }
  return (
    <section className="min-h-screen  max-w-7xl mx-auto px-4  py-10 bg-gray-50">
      <div className="">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Your Notes</h2>
       {isFetching ? <Fetching />  :   notes.length > 0 ? <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-[700px] w-full table-auto">
            <thead className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
              {notes.map((note) => (
                <tr key={note?._id}>
                  <td className="px-6 py-4 font-medium">{note?.title}</td>
                  <td className="px-6 py-4">
                    {note?.content?.length > 40
                      ? note?.content?.slice(0, 40) + "..."
                      : note?.content}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedNote(note);
                        setShowView(true);
                      }}
                      className="cursor-pointer text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setEditNote({ ...note });
                        setShowEdit(true);
                      }}
                      className="cursor-pointer text-green-600 hover:underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(note?._id);
                        setShowDelete(true);
                      }}
                      className="cursor-pointer text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> : 
        <div className="min-h-[10vh] w-full flex justify-center items-center">
          <p className="text-green-600">You have no notes.</p>
        </div>
        }

        {/* View Modal */}
        {showView && selectedNote && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-lg shadow p-6 animate-fadeIn">
              <h3 className="text-xl font-semibold mb-4">{selectedNote?.title}</h3>
              <p className="text-gray-700">{selectedNote?.content}</p>
              <button
                onClick={() => setShowView(false)}
                className="cursor-pointer mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEdit && editNote && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-lg shadow p-6 animate-fadeIn">
              <h3 className="text-xl font-semibold mb-4">Update Note</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editNote.title}
                  onChange={(e) =>
                    setEditNote({ ...editNote, title: e.target.value })
                  }
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Title"
                />
                <textarea
                  value={editNote.content}
                  onChange={(e) =>
                    setEditNote({ ...editNote, content: e.target.value })
                  }
                  rows="5"
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEdit(false)}
                  className="cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={()=>handleUpdate(editNote?._id)}
                  className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {updaleLoading ?'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDelete && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-sm rounded-lg shadow p-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-red-600 mb-4">Delete Note</h3>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this note? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDelete(false)}
                  className="cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  {updaleLoading ? 'Deleting...': 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageNotes;
