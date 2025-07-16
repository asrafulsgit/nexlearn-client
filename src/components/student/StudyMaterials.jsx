import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import { toast } from "react-toastify";
import Loader from "../../additionals/Loader";
import { Link } from "react-router";
import Fetching from "../../additionals/Fetching";
import { Helmet } from "react-helmet";

const StudyMaterials = () => {
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [bookedSessions, setBookedSessions] = useState([]);

  // Query bookings
  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["materials"],
    queryFn: () => apiRequiestWithCredentials("get", "/booked/my-bookings"),
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  // Set bookings when data changes
  useEffect(() => {
    if (data?.bookings) {
      setBookedSessions(data.bookings);
    }
  }, [data]);

  // Show error toast
  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || "Failed to fetch bookings");
    }
  }, [isError, error]);

  // Handle session selection
  const handleMaterials = (sessionId) => {
    setActiveSessionId(sessionId);
  };

  // Show loader only on cold start
  if (isPending && !data) {
    return <Loader />;
  }

  return (
  <><Helmet>
        <title>NexLearn | Study Materials </title>
      </Helmet>  <section className="max-w-7xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <div className="">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Study Materials</h2>
        <p className="text-gray-600 mb-8">
          Select one of your booked sessions to view its study materials.
        </p>
      
        {isFetching ? <Fetching /> : bookedSessions.length === 0 ? (
          <div className=" w-full flex justify-center items-center">
            <p className="text-gray-600 mt-10">You haven’t booked any sessions yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {bookedSessions.map((book) => (
              <div
                key={book?.session?._id}
                className={`bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition h-full flex flex-col ${
                  activeSessionId === book?.session?._id ? "ring-2 ring-green-500" : ""
                }`}
              >
                <img
                  src={book?.session?.image}
                  alt={book?.session?.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {book?.session?.title}
                </h3>
                <Link
                  to={`/my-study-materials/${book?.session?._id}`} className="mt-auto"
                  state={book?.session?.title}
                >
                  <button
                    onClick={() => handleMaterials(book?.session?._id)}
                    className="mt-3 text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
                  >
                    View Materials
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section></>
  );
};

export default StudyMaterials;
