import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Registering user:", formData);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    alert("Google login clicked");
  };

  return (
    <div className="min-h-screen  bg-gray-50 py-10">
     <div className="max-w-7xl mx-auto  flex flex-col 
    md:flex-row justify-center items-center">
         {/* Left side: form */}
      <div className="md:w-1/2 p-5  bg-white flex 
      flex-col justify-center max-w-lg mx-auto shadow-md
      rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Join NexLearn Today!
        </h1>
        <p className="mb-8 text-gray-700">
          Start your learning journey with us. Connect, collaborate, and succeed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label htmlFor="photoUrl" className="block text-gray-700 font-semibold mb-1">
              Photo URL (optional)
            </label>
            <input
              type="url"
              name="photoUrl"
              id="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 font-semibold py-3 rounded-md transition duration-300"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                d="M21.805 10.023h-9.43v3.895h5.503c-.236 1.236-1.458 3.627-5.503 3.627-3.306 0-6.002-2.737-6.002-6.108 0-3.371 2.696-6.108 6.002-6.108 1.879 0 3.141.803 3.868 1.5l2.636-2.53C16.585 6.32 14.324 5.5 11.995 5.5 6.952 5.5 3 9.559 3 14.49c0 4.931 3.952 8.991 8.995 8.991 5.19 0 8.637-3.635 8.637-8.754 0-.587-.066-1.034-.159-1.704z"
                fill="#4285F4"
              />
            </svg>
            Sign up with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline font-semibold">
            Login here
          </a>
        </p>
      </div>

      {/* Right side: design/visual */}
      <div className="md:w-1/2  bg-gray-50 flex 
      items-center justify-center ">
        <div className="text-gray-900 max-w-md text-center space-y-6">
          <h2 className="text-3xl font-bold">Welcome to NexLearn!</h2>
          <p className="text-lg">
            Empower your learning journey with expert tutors, flexible study sessions, and a vibrant community. Let’s grow together.
          </p>
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
            alt="Students learning"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </div>
     </div>
    </div>
  );
};

export default Register;
