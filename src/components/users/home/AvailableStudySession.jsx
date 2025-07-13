import { useQuery } from "@tanstack/react-query";
import { apiRequiest } from "../../../utilities/handleApis";

const sessions = [
  {
    title: "Advanced Calculus Review",
    description: "Deep dive into multi-variable calculus and differential equations.",
    image: "https://images.unsplash.com/photo-1701170645257-8345722edf47?crop=entropy&q=80&w=1080",
    status: "Ongoing",
    date: "2024-08-15",
  },
  {
    title: "Introduction to Python Programming",
    description: "Learn the basics of Python for beginners, including data structures.",
    image: "https://images.unsplash.com/photo-1685599504130-9ee12eef06eb?crop=entropy&q=80&w=1080",
    status: "Closed",
    date: "2024-07-01",
  },
  {
    title: "Organic Chemistry Fundamentals",
    description: "Essential concepts for understanding organic reactions and structures.",
    image: "https://images.unsplash.com/photo-1588170645026-dc9e6a4eb215?crop=entropy&q=80&w=1080",
    status: "Ongoing",
    date: "2024-08-20",
  },
  {
    title: "Data Science with R",
    description: "Explore data analysis, visualization, and machine learning with R.",
    image: "https://placehold.co/600x400?text=Data+Science",
    status: "Ongoing",
    date: "2024-09-01",
  },
  {
    title: "Full-Stack Web Development",
    description: "Build dynamic web applications using modern frameworks.",
    image: "https://placehold.co/600x400?text=Web+Development",
    status: "Closed",
    date: "2024-06-10",
  },
  {
    title: "Quantum Physics Explained",
    description: "An accessible introduction to the mysteries of quantum mechanics.",
    image: "https://placehold.co/600x400?text=Physics",
    status: "Ongoing",
    date: "2024-09-15",
  },
];

const AvailableStudySession = () => {
  // const {data, isPending, isError, error} = useQuery({
  //   queryKey: ['users'],
  //   queryFn: () => apiRequiest('get', '/gardener/active'),
  // });
  // console.log(data)
  return (
    <section
      id="study-sessions"
      className="page-section py-10  bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Available Study Sessions
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Browse upcoming and ongoing sessions to expand your knowledge and collaborate with peers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="bg-white border border-neutral-200/30 hover:border-neutral-200/40 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
            >
              <img
                className="w-full h-48 object-cover"
                src={session.image}
                alt={session.title}
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {session.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{session.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                      session.status === "Ongoing"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {session.status}
                  </span>
                  <span className="text-sm text-gray-500">Starts: {session.date}</span>
                </div>
                <button
                  className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 ${
                    session.status === "Ongoing"
                      ? "bg-[#4CAF50] hover:bg-green-600 focus:ring-green-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={session.status === "Closed"}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableStudySession;
