const howItWorksSteps = [
  {
    title: "Sign Up",
    description: "Create your free account in minutes to get started.",
    iconBg: "bg-blue-100 text-blue-600",
    image: "https://images.unsplash.com/photo-1701170645257-8345722edf47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7" />
      </svg>
    ),
  },
  {
    title: "Explore Sessions",
    description: "Browse available study sessions and resources by topic.",
    iconBg: "bg-green-100 text-green-600",
    image: "https://images.unsplash.com/photo-1664188613064-7eea761238f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z" />
      </svg>
    ),
  },
  {
    title: "Join & Collaborate",
    description: "Participate in sessions and collaborate with your peers.",
    iconBg: "bg-purple-100 text-purple-600",
    image: "https://images.unsplash.com/photo-1659080907097-6153cd4ff69d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M2 20h15m-13-2v-2a3 3 0 015.356-1.857M13 10V4a1 1 0 00-1-1H8a1 1 0 00-1 1v6m-2 0h8" />
      </svg>
    ),
  },
  {
    title: "Track Your Progress",
    description: "Monitor your learning journey and achievements.",
    iconBg: "bg-red-100 text-red-600",
    image: "https://placehold.co/600x400?text=Track+Progress",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17h2a2 2 0 002-2V9a2 2 0 00-2-2H3m6 10h2a2 2 0 002-2V5a2 2 0 00-2-2H9m6 18h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
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
