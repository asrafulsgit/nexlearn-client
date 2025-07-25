import React, { useContext, useState } from "react";
import { AuthContext } from "../../controllers/AuthProvider";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import { toast } from "react-toastify";
import { queryClient } from "../../utilities/queryclient";
import { Helmet } from "react-helmet";

const CreateSession = () => {
  const {userInfo} = useContext(AuthContext);
  const initFormData = {
    title: "",
    description: "",
    image: "",
    registrationStart: "",
    registrationEnd: "",
    classStart: "",
    classEnd: "",
    duration: "",
    registrationFee: 0,
    status: "Pending",
    tutor :{
      name : userInfo.name,
      email :  userInfo.email
    }  
  }
  const [formData, setFormData] = useState(initFormData);
  const [postLoading,setPostLoading]=useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async(e) => {
    e.preventDefault();
    setPostLoading(true);
    try {
      await apiRequiestWithCredentials('post','/sessions/tutor',formData)
      await queryClient.invalidateQueries({ queryKey: ['tsessions'] });
      setFormData(initFormData)
      toast.success('Session created.')
      } catch (error) {

        toast.error(error?.response?.data?.message)
    }finally{
      setPostLoading(false)
    }
  };

  return (

  <>   
  <Helmet>
          <title>NexLearn | Create Sessions</title>
        </Helmet>
  <div className="min-h-[70vh]  max-w-7xl mx-auto px-4 py-10
       bg-white rounded-lg shadow-lg  z-10 relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Study Session</h2>
        <p className="text-gray-600 mb-8">Fill in the form below to create a new session.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Session Title</label>
            <input
              name="title"
              onChange={handleChange}
              value={formData.title}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Session Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formData.description}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-green-300 h-28"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Session Image URL</label>
            <input
              name="image"
              onChange={handleChange}
              value={formData.image}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Registration Start Date</label>
              <input
                type="date"
                name="registrationStart"
                value={formData?.registrationStart}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Registration End Date</label>
              <input
                type="date"
                name="registrationEnd"
                value={formData?.registrationEnd}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Class Start Date</label>
              <input
                type="date"
                name="classStart"
                value={formData?.classStart}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Class End Date</label>
              <input
                type="date"
                name="classEnd"
                value={formData?.classEnd}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Session Duration</label>
            <input
              type = "text"
              name="duration"
              onChange={handleChange}
              value={formData.duration}
              className="w-full p-3 rounded border border-gray-300"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Registration Fee</label>
              <input
                name="registrationFee"
                value={formData.registrationFee}
                readOnly
                className="w-full p-3 rounded border border-gray-200
                 bg-gray-100 text-gray-600 focus:outline-none"
              />
            </div>
            {/* <div>
              <label className="block font-medium mb-1">Status</label>
              <input
                name="status"
                value={formData.status}
                readOnly
                className="w-full p-3 rounded border focus:outline-none border-gray-200 bg-gray-100 text-gray-600"
              />
            </div> */}
            <div>
              <label className="block font-medium mb-1">Tutor Name</label>
              <input
                name="tutorName"
                value={formData?.tutor?.name}
                readOnly
                className="w-full p-3 rounded border focus:outline-none border-gray-200 bg-gray-100 text-gray-600"
              />
            </div>
            <div>
            <label className="block font-medium mb-1">Tutor Email</label>
            <input
              name="tutorEmail"
              value={formData?.tutor?.email}
              readOnly
              className="w-full focus:outline-none p-3 rounded border border-gray-200 bg-gray-100 text-gray-600"
            />
          </div>
          </div>

          

          <button
            type="submit"
            className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
          >
            {postLoading ? 'Creating...' : 'Create Session'}
          </button>
        </form>
      </div></> 
   
  );
};

export default CreateSession;
