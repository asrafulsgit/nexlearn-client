const howItWorksSteps = [
  {
    title: "Sign Up",
    description: "Create your free account in minutes to get started.",
    iconBg: "bg-blue-100 text-blue-600",
    image: "https://images.unsplash.com/photo-1701170645257-8345722edf47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3R1ZGVudCUyNTIwYXBwJTI1MjBpbnRlcmFjdGlvbnxlbnwxfDB8fHwxNzUyMTI3NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14c-1.49 0-2.92.357-4.21.997M12 14c1.49 0 2.92.357 4.21.997M12 14v7m0-7h-4m4 0h4" />
      </svg>
    ),
  },
  {
    title: "Explore Sessions",
    description: "Browse available study sessions and resources by topic.",
    iconBg: "bg-green-100 text-green-600",
    image: "https://images.unsplash.com/photo-1664188613064-7eea761238f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3R1ZGVudCUyNTIwYXBwJTI1MjBpbnRlcmFjdGlvbnxlbnwxfDB8fHwxNzUyMTI3NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Join & Collaborate",
    description: "Participate in sessions and collaborate with your peers.",
    iconBg: "bg-purple-100 text-purple-600",
    image: "https://images.unsplash.com/photo-1659080907097-6153cd4ff69d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8c3R1ZGVudCUyNTIwYXBwJTI1MjBpbnRlcmFjdGlvbnxlbnwxfDB8fHwxNzUyMTI3NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14c-1.49 0-2.92.357-4.21.997M12 14c1.49 0 2.92.357 4.21.997M12 14v7m0-7h-4m4 0h4" />
      </svg>
    ),
  },
  {
    title: "Track Your Progress",
    description: "Monitor your learning journey and achievements.",
    iconBg: "bg-red-100 text-red-600",
    image: "https://placehold.co/600x400?text=Track+Progress",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 text-center mb-12">Learn how our platform helps you achieve your goals.</p>

        <div className="relative flex flex-col lg:flex-row justify-between items-center lg:space-x-8 space-y-8 lg:space-y-0">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 flex-1"
            >
              <div className={`flex items-center justify-center h-16 w-16 rounded-full mb-4 ${step.iconBg}`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <img
                src={step.image}
                alt={`${step.title} illustration`}
                className="mt-4 rounded-lg w-full h-32 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
