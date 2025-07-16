import { useContext, useState } from "react";
import { AuthContext } from "../../controllers/AuthProvider";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import { queryClient } from "../../utilities/queryclient";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const CreateNote = () => {
  const {userInfo}=useContext(AuthContext);
  const initNote = {
    title: "",
    content: "",
  }
  const [note, setNote] = useState(initNote);
  const [postLoading,setPostLoading]=useState(false)

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!note.title || !note.content) {
      toast.error("Please fillup required fields.");
      return;
    }
    setPostLoading(true)
    try {
          await apiRequiestWithCredentials('post','/notes/student',note)
          await queryClient.invalidateQueries({ queryKey: ['snotes'] });
          setNote(initNote)
          toast.success('Note saved successfully!')
          } catch (error) {

            toast.error(error?.response?.data?.message)
        }finally{
          setPostLoading(false)
        }

  };

  return (
  <>
  <Helmet>
        <title>NexLearn | Create Session</title>
      </Helmet>  <section className="max-w-7xl mx-auto px-4 min-h-screen bg-gray-50  py-10 ">
      <div className=" bg-white shadow-md rounded-lg py-8 px-5">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Create a New Note
        </h2>
        <p className="text-gray-500 mb-6">
          Write and save your personal study notes securely.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={userInfo?.email || ""}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 
              outlite-none focus:outline-none
              rounded-lg bg-gray-100 text-gray-600 
              cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={note.title}
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
              placeholder="Enter note title"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={note.content}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
              placeholder="Write your note here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {postLoading ? 'Saving...' : 'Save Note'}
          </button>

          
        </form>
      </div>
    </section></>
  );
};

export default CreateNote;
