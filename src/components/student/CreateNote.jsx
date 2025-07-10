import { useContext, useState } from "react";

const CreateNote = () => {
const user = {
    name: "Asraful",
    photoURL: "https://i.ibb.co/xhh9JGM/user-avatar.png",
    email : 'asraful@gmail.com'
  };
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!note.title || !note.description) {
      return setMessage("All fields are required.");
    }

    // Placeholder for saving note to backend
    console.log({
      email: user?.email,
      title: note.title,
      description: note.description,
    });

    setMessage("✅ Note saved successfully!");
    setNote({ title: "", description: "" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 min-h-screen bg-gray-50  py-10 ">
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
              value={user?.email || ""}
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
              name="description"
              value={note.description}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
              placeholder="Write your note here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Save Note
          </button>

          {message && (
            <p className="text-center text-sm text-green-600 mt-2">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default CreateNote;
