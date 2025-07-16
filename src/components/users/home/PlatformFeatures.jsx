const features = [
  {
    title: "Schedule Study Sessions",
    description: "Easily find and book study sessions with peers and tutors.",
    iconBg: "bg-blue-500",
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Share & Access Resources",
    description: "Upload and download study materials, notes, and guides.",
    iconBg: "bg-green-500",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
  title: "Group Collaboration",
  description: "Work together on projects and assignments in real-time.",
  iconBg: "bg-purple-500",
  iconPath:
    "M7 8h10M7 12h6m-2 8a9 9 0 100-18 9 9 0 000 18zm0 0v-2m0-4h.01",
},
  {
  title: "Connect with Tutors",
  description: "Find and connect with verified tutors for personalized help.",
  iconBg: "bg-red-500",
  iconPath:
    "M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M16 7a4 4 0 11-8 0 4 4 0 018 0z",
},
  {
    title: "Secure & Managed Access",
    description: "Enjoy a safe and well-managed learning environment.",
    iconBg: "bg-yellow-500",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c0 2.873.99 5.51 2.66 7.534L12 22.944l6.396-3.41A12.001 12.001 0 0021.056 12c0-2.873-.99-5.51-2.66-7.534z",
  },
  {
    title: "Track Learning Progress",
    description: "Monitor your achievements and identify areas for improvement.",
    iconBg: "bg-teal-500",
    iconPath:
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];


const PlatformFeatures = () => {
  return (
    <section id="features" className="py-10 max-w-7xl mx-auto px-4 bg-white">
      <div className="">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
          What You Can Do with NexLearn
        </h2>
        <p className="text-lg text-center leading-6 text-gray-500 mb-12">
          Explore the powerful features designed to enhance your learning experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors duration-300"
            >
              <div
                className={`flex items-center justify-center h-12 w-12 rounded-md text-white mb-4 ${feature.iconBg}`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Sections with images and descriptions */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1701170645257-8345722edf47?crop=entropy&q=80&w=1080"
              alt="Students collaborating online"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:order-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Enhanced Collaboration</h3>
            <p className="text-gray-700 mb-4">
              NexLearn provides a seamless environment for students to connect, share, and learn together...
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Interactive whiteboards for shared problem-solving.</li>
              <li>Integrated chat and video conferencing.</li>
              <li>Version control for collaborative editing.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1606479067834-db5efd9f2fe9?crop=entropy&q=80&w=1080"
              alt="People sitting on yellow chairs"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:order-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Access to Quality Resources</h3>
            <p className="text-gray-700 mb-4">
              Our platform centralizes your study materials, making it easy to find, share, and organize.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Library of user-contributed and verified resources.</li>
              <li>Search and filter to find materials.</li>
              <li>Secure storage and sharing.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1650525217641-891e936d3486?crop=entropy&q=80&w=1080"
              alt="Students studying together"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:order-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Learning Paths</h3>
            <p className="text-gray-700 mb-4">
              NexLearn helps you tailor your learning journey. Connect with tutors who specialize in your needs.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Personalized recommendations for study groups.</li>
              <li>Progress reports and performance analytics.</li>
              <li>Goal setting and achievement tracking.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
