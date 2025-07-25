import React, { useContext, useState } from "react";
import loginImage from '../../../assets/login.jpg'
import { apiRequiestWithCredentials } from "../../../utilities/handleApis";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../../controllers/AuthProvider";
import { Helmet } from "react-helmet";
const Login = () => {
  const navigate = useNavigate();
  const {setIsLoggedIn, setLoading,setUserInfo,handleLoginWithGoogle}=useContext(AuthContext);
  const initForm = { email: "", password: "" };
  const [formData, setFormData] = useState(initForm);

  const handleChange = (e) =>{
     const {name,value}=e.target;
    setFormData({ ...formData, [name] : value });
  }
    
const [registerLoading,setRegisterLoading]=useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();
    setRegisterLoading(true)
    try {
          const data = await apiRequiestWithCredentials('post','/user/login',formData);
          setUserInfo(data?.user);
          setIsLoggedIn(true);
          navigate('/', { replace: true })
          toast.success('Login successfull');
          setFormData(initForm);
        } catch (error) {

          toast.error(error?.response?.data?.message);
        }finally{
          setRegisterLoading(true)
        }
  };

  const handleGoogleLogin = async() => {
   const isRegister = await handleLoginWithGoogle();
           if(isRegister){
             setIsLoggedIn(true)
            
             navigate('/')
             toast.success('Login successfull')
           }else{
             toast.error('Login failed while google login.')
           } 
  };

  return (
  <> <Helmet>
          <title>NexLearn | Login</title>
        </Helmet> <div className="min-h-screen  bg-gray-50 py-10 max-w-7xl px-4 mx-auto">
      <div className="  flex flex-col gap-10 md:gap-0
    md:flex-row justify-center items-center ">
        {/* Left Side Design */}
      <div className="hidden md:w-1/2 lg:flex items-center 
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
      <div className="lg:w-1/2 flex flex-col items-center justify-center   bg-white">
        <div className="w-full  space-y-6">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-11">
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
              className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300"
            >
              {registerLoading ? 'Login...' : 'Login'}
            </button>
          </form>

          <div className="text-center">
            <span className="text-sm text-gray-500">or</span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full cursor-pointer flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-md hover:border-green-600 hover:text-green-600 transition duration-300"
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
            Continue with Google
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:underline font-semibold"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div></>
  );
};

export default Login;
