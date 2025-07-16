import { useQuery } from "@tanstack/react-query";
import { apiRequiest } from "../../../utilities/handleApis";
import { useEffect, useState } from "react";
import { getSessionStatus } from "../../../utilities/sessionStatus";
import { dateFormat } from "../../../utilities/dateFormate";
import { Link } from "react-router";
import { toast } from "react-toastify";


const AvailableStudySession = () => {
  const [sessions,setSessions]=useState([])
   // get all available sessions
    const { data, isPending, isError, error } = useQuery({
      queryKey: ["tsessions"],
      queryFn: () => apiRequiest("get", "/sessions/user/available"),
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
  return (
    <section
      id="study-sessions"
      className="page-section py-10  bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 ">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Available Study Sessions
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Browse upcoming and ongoing sessions to expand your knowledge and collaborate with peers.
        </p>

       {isPending ? <div className="min-h-[10vh]">
      <p>Loading...</p>
    </div> : 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {sessions?.map((session, index) => (
    <div
      key={index}
      className="bg-white border border-neutral-200/30 hover:border-neutral-200/40 
        rounded-lg overflow-hidden transition-all duration-300 ease-in-out h-full flex flex-col"
    >
      <img
        className="w-full h-48 object-cover"
        src={session?.image}
        alt={session?.title}
      />
      <div className="p-2 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {session?.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{session?.description}</p>

        {(() => {
          const status = getSessionStatus(session?.registrationStart, session?.registrationEnd);

          return (
            <>
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                    status === "Open"
                      ? "bg-green-100 text-green-800"
                      : status === "Closed"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {status}
                </span>
                <span className="text-sm text-gray-500">
                  Starts: {dateFormat(session?.registrationStart)}
                </span>
              </div>
              <Link to={`/session/${session?._id}`} className="mt-auto">
                <button
                  className="w-full cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 
                    bg-green-500 hover:bg-green-600 "
                >
                  Read More
                </button>
              </Link>
            </>
          );
        })()}
      </div>
    </div>
  ))}
</div>
}
      </div>
    </section>
  );
};

export default AvailableStudySession;
