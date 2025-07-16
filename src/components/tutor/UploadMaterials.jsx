import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import Loader from "../../additionals/Loader";
import { dateFormat } from "../../utilities/dateFormate";
import { queryClient } from "../../utilities/queryclient";
import { toast } from "react-toastify";
import Fetching from "../../additionals/Fetching";
import { Helmet } from "react-helmet";


const UploadMaterials = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const initFormData = {
    title: "",
    image: "",
    driveLink: "",
  }
  const [formData, setFormData] = useState(initFormData);

  const [sessions,setSessions]=useState([])
  
  // get sessions
  const {data, isPending, isError, error,isFetching} = useQuery({
    queryKey: ['tsessions'],
    queryFn: () => apiRequiestWithCredentials('get', '/sessions/tutor/approve'),
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
  });
  useEffect(() => {
  if (data?.sessions) {
    setSessions(data.sessions);
  }
}, [data]);

  if(isPending || !data){
    return  <Loader />;
  }
  
  if(isError){
    toast.error(error?.response?.data?.message)
  }


  // model settings
  const openModal = (session) => {
    setSelectedSession(session);
    setFormData({ title: "", image: "", driveLink: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSession(null);
  };
  
  // update settings
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [uploadLoading,setUploadLoading]=useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();
    setUploadLoading(true)
     try {
      await apiRequiestWithCredentials("post", `/materials/tutor/${selectedSession._id}`, formData);
      await queryClient.invalidateQueries({ queryKey: ['tmaterials'] });
        setSelectedSession(null);
        setFormData(initFormData);
        toast.success("Material uploaded.");
        closeModal();
      } catch (err) {

        toast.error("Failed to upload material");
      }finally{
        setUploadLoading(false);
      }
  };

  return (
  <> 
  <Helmet>
        <title>NexLearn | Upload Materials</title>
      </Helmet>
  <div className="min-h-[70vh]  max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Upload Study Materials</h1>
      <p className="text-gray-700 mb-8">
        Add images and Google Drive links for your approved study sessions.
      </p>

     <div className="overflow-x-auto">
      {isFetching ? <Fetching /> :  sessions.length > 0 ? 
     <table className="min-w-[900px] w-full  table-auto text-left">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="text-left px-4 py-3">Image</th>
            <th className="text-left px-4 py-3">Session Title</th>
            <th className="text-left px-4 py-3">Start Date</th>
            <th className="text-left px-4 py-3">End Date</th>
            <th className="px-4 py-3">Upload Materials</th>
          </tr>
        </thead>
        <tbody>
          {sessions?.map((session) => (
            <tr
              key={session?._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
               <td className="px-4 py-3">
                  <img
                    src={session?.image}
                    alt={session?.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
              <td className="px-4 py-3">{session?.title}</td>
              <td className="px-4 py-3">{dateFormat(session?.classStart)}</td>
              <td className="px-4 py-3">{dateFormat(session?.classEnd)}</td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => openModal(session)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Upload Materials
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : 
        <div className="min-h-[10vh] w-full flex justify-center items-center">
          <p className="text-green-600">You have no approved session to upload materials.</p>
        </div>
      }
     </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0  bg-black/40 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white max-h-[500px] overflow-y-auto rounded-lg 
          shadow-lg max-w-md w-full p-6 mt-15 relative">
            <button
              onClick={closeModal}
              className="cursor-pointer absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Close modal"
            >
              &#x2715;
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Upload Material for: {selectedSession.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Material Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste image URL here"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label
                  htmlFor="driveLink"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Google Drive Link
                </label>
                <input
                  type="text"
                  id="driveLink"
                  name="driveLink"
                  value={formData.driveLink}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

                <div>
                <label
                  htmlFor="sessionId"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Study Session ID
                </label>
                <input
                  type="text"
                  id="sessionId"
                  name="sessionId"
                  value={selectedSession?._id}
                  readOnly
                  className="focus:outline-none text-gray-600 w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label
                  htmlFor="tutorEmail"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Tutor Email
                </label>
                <input
                  type="email"
                  id="tutorEmail"
                  name="tutorEmail"
                  value={selectedSession?.tutor?.email}
                  readOnly
                  className="focus:outline-none w-full bg-gray-100 border text-gray-600
                  border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                  {uploadLoading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div></> 
  );
};

export default UploadMaterials;
