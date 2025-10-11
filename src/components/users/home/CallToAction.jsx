import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section
      id="call-to-action"
      className="max-w-7xl mx-auto py-16 bg-green-600 text-white text-center 
      relative overflow-hidden border-b border-green-400
      "
    >
      <div className="absolute inset-0 opacity-15">
        <img
          src="https://images.unsplash.com/photo-1600456899121-68eda5705257?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3R1ZGVudHMlMjUyMGFjaGlldmluZyUyNTIwZ29hbHN8ZW58MXwwfHx8MTc1MjA4NTk2N3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
          alt="Abstract background pattern"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 leading-tight">
          Ready to take your learning to the next level?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-4 border 
            border-transparent text-base font-medium rounded-md text-green-600 bg-white
             hover:bg-green-100 transition-colors duration-300 shadow-sm"
          >
            Join Now
          </Link>
          <Link
            to="/study-sessions"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white 
            text-base font-medium rounded-md text-white hover:bg-white hover:text-green-600 
            transition-colors duration-300  shadow-sm"
          >
            Browse Sessions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
