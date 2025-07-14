import { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink,  useNavigate } from "react-router";

import "./navbar.css";
import logoImage1 from "../../../assets/logo1.png";
import { AuthContext } from "../../../controllers/AuthProvider";
import { apiRequiestWithCredentials } from "../../../utilities/handleApis";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo,setLoading,setUserInfo,setIsLoggedIn } = useContext(AuthContext);
  

  const [isOpen, setIsOpen] = useState(false);

  const showSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleLogout = async()=>{
      setLoading(true)
        try {
          await apiRequiestWithCredentials('get','/user/logout');
          setUserInfo(null)
          setIsLoggedIn(false)
          toast.success('User logout successfull')
         navigate('/', { replace: true });
          setLoading(false)
        } catch (error) {
          toast.error(error?.response?.data?.message)
          setLoading(false)
        }
    }

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // dropdown settings
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //dropdown items
  const getDashboardLinks = () => {
    if (userInfo?.role === "student") return student;
    if (userInfo?.role === "tutor") return tutor;
    if (userInfo?.role === "admin") return admin;
    return [];
  };
  const student = [
    {
      name: "Booked sessions",
      path: "booked-sessions",
    },
    {
      name: "Create note",
      path: "create-note",
    },
    {
      name: "Manage notes",
      path: "manage-notes",
    },
    {
      name: "Study materials",
      path: "study-materials",
    },
  ];
  const tutor = [
    {
      name: "Create session",
      path: "create-session",
    },
    {
      name: "My sessions",
      path: "my-sessions",
    },
    {
      name: "Upload materials",
      path: "upload-materials",
    },
    {
      name: "Materials",
      path: "materials",
    },
  ];

  const admin = [
    {
      name: "Manage users",
      path: "manage-users",
    },
    {
      name: "Manage sessions",
      path: "manage-sessions",
    },
    {
      name: "Manage materials",
      path: "manage-materials",
    },
  ];

  return (
    <nav
      className="navbar-section bg-white shadow-sm sticky 
    top-0 z-40 border-b border-neutral-200/20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex cursor-pointer items-center 
              justify-center p-2 rounded-md text-neutral-400
               hover:text-white hover:bg-neutral-700 focus:outline-none 
               focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img className="h-15 w-auto" src={logoImage1} alt="NexLearn Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
            {[
              "home",
              "tutors",
              "study-sessions",
              "about-us",
              "contact",
              "faqs",
            ].map((id) => (
              <NavLink
                key={id}
                to={id === "home" ? `/` : `/${id}`}
                onClick={() => showSection(id)}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500
                 hover:text-gray-900 
                  transition-colors duration-200"
              >
                {id
                  .split("-")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </NavLink>
            ))}
          </div>

          {/* Desktop Buttons */}
          {/* <div className="ml-6 flex items-center">
            {!user ? (
              <>
                <Link to="login">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Login
                  </button>
                </Link>
                <Link to="register">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border 
              border-transparent rounded-md shadow-sm text-sm font-medium text-white
               bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogout}
                  className="text-sm px-4 py-2 cursor-pointer bg-gray-400 text-white rounded-md 
  hover:bg-gray-500 transition duration-300  
  focus:outline-none"
                >
                  Logout
                </button>

                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-9 h-9 cursor-pointer rounded-full object-cover border border-green-500"
                />
              </div>
            )}
          </div> */}

          <div className="relative ml-6 flex items-center" ref={dropdownRef}>
            {!isLoggedIn ? (
              <>
                <Link to="login">
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center
                     px-4 py-2 border border-gray-300 rounded-md 
                     shadow-sm text-sm font-medium text-gray-700
                      bg-white hover:bg-gray-50 focus:outline-none 
                       transition-colors duration-200"
                  >
                    Login
                  </button>
                </Link>
                <Link to="register">
                  <button
                    type="button"
                    className="ml-3 cursor-pointer inline-flex items-center px-4 py-2 border 
              border-transparent rounded-md shadow-sm text-sm font-medium text-white
               bg-green-500 hover:bg-green-600 focus:outline-none  transition-colors duration-200"
                  >
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="mr-2.5 text-sm px-4 py-2 cursor-pointer bg-gray-400 text-white rounded-md 
  hover:bg-gray-500 transition duration-300  
  focus:outline-none"
                >
                  Logout
                </button>
                <img
                  src={userInfo.avatar || 'https://i.ibb.co/hRGTZWdX/download.jpg'}
                  alt={userInfo.name }
                  className="w-9 h-9 cursor-pointer rounded-full object-cover border border-green-500"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                {isDropdownOpen && (
                  <div
                    className={`absolute right-0 ${
                      userInfo?.role === "admin" ? "mt-43" : "mt-50"
                    } w-48 bg-white rounded-md 
            shadow-lg ring-1 ring-green-700 ring-opacity-5 z-50`}
                  >
                    <div className="px-4 py-2">
                      {getDashboardLinks()?.map((item, index) => (
                        <NavLink
                          key={index}
                          to={`/${item.path}`}
                          className=" inline-flex items-center p-1 text-sm font-medium text-gray-500
                 hover:text-gray-900 transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden absolute inset-x-0 top-16 z-30 p-2 origin-top-right">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-neutral-800/80 backdrop-blur-lg divide-y divide-neutral-700">
            
              <div className="space-y-1">
                {[
                  "home",
                  "tutors",
                  "study-sessions",
                  "about-us",
                  "contact",
                  "faqs",
                ].map((item) => (
                  <NavLink
                    key={item}
                    to={item === 'home' ? '/' : `/${item}`}
                    onClick={() => showSection(item)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-neutral-700"
                  >
                    {item
                      .split("-")
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(" ")}
                  </NavLink>
                ))}
              </div>
             
           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
