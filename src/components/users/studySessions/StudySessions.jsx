import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { apiRequiest } from "../../../utilities/handleApis";
import { toast } from "react-toastify";
import Loader from "../../../additionals/Loader";
import { Link } from "react-router";
import { dateFormat } from "../../../utilities/dateFormate";
import { getSessionStatus } from "../../../utilities/sessionStatus";


const StudySessions= () => {
  const [activePage, setActivePage] = useState(1);
  const [sessions, setSessions] = useState([]);


   // get all notes created by student
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tsessions"],
    queryFn: () => apiRequiest("get", "/sessions/user"),
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
  });
    
  // Update state when data changes
    useEffect(() => {
      if (data?.sessions) {
        setSessions(data.sessions);
      }
    }, [data]);
   
    // Handle error toast outside render
      useEffect(() => {
        if (isError) {
          toast.error(error?.response?.data?.message || "Failed to fetch sessions");
        }
      }, [isError, error]);








// load page when data fateching 
  if (isPending) {
    return <Loader />;
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 ">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Study Sessions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and join collaborative study sessions that match your interests and schedule.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-12 flex 
      flex-col lg:flex-row lg:justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search sessions..."
          className="w-full lg:w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select className="w-full lg:w-1/4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">Filter by Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Sessions Grid */}
      {sessions.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions?.map((session, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-md 
          transition overflow-hidden relative flex flex-col h-full">
            <div className="relative">
              <img
                src={session?.image}
                alt="Session image"
                className="w-full h-48 object-cover"
              />
              {/* Status Badge */}
              {(() => {
  const status = getSessionStatus(session?.registrationStart, session?.registrationEnd);
  const statusStyles = {
    Open: "bg-green-100 text-green-800",
    Closed: "bg-red-100 text-red-800",
    Upcoming: "bg-yellow-100 text-yellow-800",
  };
  return (
    <div
      className={`absolute top-3 right-3 px-3 py-1 text-sm rounded-full font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </div>
  );
})()}


            </div>
            <div className="flex flex-col justify-between flex-grow p-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {session?.title.length > 23 ? `${session?.title.slice(0,23)}...` : session?.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {session?.description.length > 80 ? `${session?.description.slice(0,80)}...` : session?.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Starts: {dateFormat(session?.classStart)}</span>
                <Link
                  to={`/session/${session?._id}`}
                  className="text-sm text-green-600 hover:text-green-800 font-medium"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div> : 
      <div className="min-h-[10vh] w-full flex justify-center items-center">
          <p className="text-green-600">No session available for now.</p>
        </div>
      
      }

      {/* Pagination */}
      <div className="flex justify-center mt-16">
        <nav className="inline-flex items-center space-x-2 text-sm">
          <a href="#" className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
            Previous
          </a>
          {[1, 2, 3].map((page) => (
            <a
              key={page}
              href="#"
              onClick={() => setActivePage(page)}
              className={`px-4 py-2 rounded-md border border-gray-300  ${
                activePage === page ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </a>
          ))}
          <a href="#" className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
            Next
          </a>
        </nav>
      </div>
    </section>
  );
};

export default StudySessions;
