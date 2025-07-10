import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import './navbar.css'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

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

  return (
    <nav className="navbar-section bg-white shadow-sm sticky top-0 z-40 border-b border-neutral-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link  to='/' className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://images.unsplash.com/photo-1663813064379-e35ad59c486d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8TmV4TGVhcm4lMjUyMGxvZ298ZW58MXwwfHx8MTc1MjEyMzMzMXww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                alt="NexLearn Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">NexLearn</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
            {["home", "tutors", "study-sessions", "about-us", "contact", "faqs"].map((id) => (
              <NavLink
                key={id}
                to={id === 'home' ? `/` : `/${id}`}
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
          <div className="hidden lg:ml-6 lg:flex lg:items-center">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Login
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border 
              border-transparent rounded-md shadow-sm text-sm font-medium text-white
               bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden absolute inset-x-0 top-16 z-30 p-2 origin-top-right">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-neutral-800/80 backdrop-blur-lg divide-y divide-neutral-700">
            <div className="pt-5 pb-6 px-5">
              <div className="space-y-1">
                {["home", "tutors", "study-sessions", "about-us", "contact", "faqs"].map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => showSection(id)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-neutral-700"
                  >
                    {id
                      .split("-")
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(" ")}
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600">
                  Register
                </button>
                <p className="mt-6 text-center text-base font-medium text-gray-300">
                  Existing user?
                  <button className="text-green-400 hover:text-green-300 ml-1">Login</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
