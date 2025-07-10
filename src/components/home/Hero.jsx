const Hero = () => {
  return (
    <section
      id="banner"
      className="relative bg-gray-900 text-white py-30 overflow-hidden page-section"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1650525217641-891e936d3486?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3R1ZGVudHMlMjUyMGNvbGxhYm9yYXRpbmclMjUyMHN0dWR5aW5nfGVufDF8MHx8fDE3NTIxMjAxMjJ8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
          alt="Students collaborating online"
          className="w-full h-full object-cover opacity-25"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl 
        font-extrabold leading-tight mb-6">
          Collaborate, Learn, Succeed Together
        </h1>
        <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto">
          Connect with students, tutors, and administrators to streamline study sessions,
          share resources, and manage your educational journey effectively.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
            Find a Study Session
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
            Become a Tutor
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
