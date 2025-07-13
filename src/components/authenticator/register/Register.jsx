import React, { useContext, useState } from "react";
import { apiRequiest } from "../../../utilities/handleApis";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../controllers/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  const {handleLoginWithGoogle,setIsLoggedIn} = useContext(AuthContext);
  const initForm = {
    name: "",
    email: "",
    avatar: "",
    password: "",
  }
  const [formData, setFormData] = useState(initForm);

  const handleChange = (e) => {
    const {name,value}=e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.avatar.trim().length){
      formData.avatar = 'https://i.ibb.co/hRGTZWdX/download.jpg'
    }
    try {
      await apiRequiest('post','/user/register',formData);
      navigate('/login');
      setFormData(initForm);
      toast.success('Register successfull');
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message);
    }

  };

  const handleGoogleLogin = async() => {
    const isRegister = await handleLoginWithGoogle();
        if(isRegister){
          setIsLoggedIn(true)
          navigate('/')
          toast.success('Register successfull')
        }else{
          toast.error('Register failed while google register.')
        } 
  };

  return (
    <div className="min-h-screen  bg-gray-50 py-10">
     <div className="max-w-7xl px-5 mx-auto  flex flex-col 
    md:flex-row justify-center items-center gap-15">
         {/* Left side: form */}
      <div className="w-4/6 lg:w-1/2 p-5  bg-white flex 
      flex-col justify-center  mx-auto shadow-md
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
            <label htmlFor="email" className="block text-gray-700 
            font-semibold mb-1">
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
            <label htmlFor="avatar" className="block text-gray-700 font-semibold mb-1">
              Photo URL (optional)
            </label>
            <input
              type="text"
              name="avatar"
              id="avatar"
              value={formData.avatar}
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
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full cursor-pointer flex items-center justify-center gap-2 border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 font-semibold py-3 rounded-md transition duration-300"
          >
            <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            Register with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>

      {/* Right side: design/visual */}
      <div className="hidden md:w-1/2  bg-gray-50 lg:flex 
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
