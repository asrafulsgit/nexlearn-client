import React, { useState } from "react";
import loginImage from '../../assets/login.jpg'
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic here
    console.log("Logging in with:", formData);
  };

  const handleGoogleLogin = () => {
    // TODO: Add Google login logic
    alert("Google login clicked");
  };

  return (
    <div className="min-h-screen  bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto  flex flex-col gap-10 md:gap-0
    md:flex-row justify-center items-center">
        {/* Left Side Design */}
      <div className="md:w-1/2 flex items-center 
      justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back to NexLearn!
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Your learning journey continues. Let’s achieve more together.
          </p>
         <img
  src={loginImage}
  alt="Education Illustration"
  className="rounded-lg shadow-lg mx-auto"
/>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="md:w-1/2 flex items-center justify-center   bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Login to Your Account
            </h1>
            <p className="text-gray-600">Access your study sessions easily</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="text-center">
            <span className="text-sm text-gray-500">or</span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-md hover:border-green-600 hover:text-green-600 transition duration-300"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M21.805 10.023h-9.43v3.895h5.503c-.236 1.236-1.458 3.627-5.503 3.627-3.306 0-6.002-2.737-6.002-6.108 0-3.371 2.696-6.108 6.002-6.108 1.879 0 3.141.803 3.868 1.5l2.636-2.53C16.585 6.32 14.324 5.5 11.995 5.5 6.952 5.5 3 9.559 3 14.49c0 4.931 3.952 8.991 8.995 8.991 5.19 0 8.637-3.635 8.637-8.754 0-.587-.066-1.034-.159-1.704z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-green-600 hover:underline font-semibold"
            >
              Register now
            </a>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
