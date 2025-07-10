const Hero = () => {
  return (
    <section
  id="banner"
  className="relative bg-gray-900 text-white py-24 sm:py-20 overflow-hidden page-section"
>
  {/* Background Image with Dark Gradient Overlay */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1650525217641-891e936d3486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3R1ZGVudHMlMjUyMGNvbGxhYm9yYXRpbmclMjUyMHN0dWR5aW5nfGVufDF8MHx8fDE3NTIxMjAxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      alt="Students collaborating online"
      className="w-full h-full object-cover"
      style={{ filter: "brightness(0.35)" }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
      Collaborate, Learn, Succeed Together
    </h1>
    <p className="text-lg sm:text-xl mb-12 max-w-3xl mx-auto drop-shadow-md">
      Connect with students, tutors, and administrators to streamline study sessions,
      share resources, and manage your educational journey effectively.
    </p>
    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
      <button
        className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 focus:outline-none text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out shadow-md"
        aria-label="Find a Study Session"
      >
        Find a Study Session
      </button>
      <button
        className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 focus:ring-4 focus:ring-white focus:outline-none text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out shadow-md"
        aria-label="Become a Tutor"
      >
        Become a Tutor
      </button>
    </div>
  </div>
</section>

  );
};

export default Hero;
