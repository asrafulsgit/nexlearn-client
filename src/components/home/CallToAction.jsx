const CallToAction = () => {
  return (
    <section id="call-to-action" className="py-16 bg-blue-600 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
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
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-300 shadow-lg"
          >
            Join Now
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-300 shadow-lg"
          >
            Browse Sessions
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
