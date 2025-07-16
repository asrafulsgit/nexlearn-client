import { useEffect, useState } from "react";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../../additionals/Loader";
import { Link } from "react-router";
import { dateFormat } from "../../utilities/dateFormate";
import Fetching from "../../additionals/Fetching";



const BookedSessions = () => {
  const [bookedSessions, setBookedSessions] = useState([]);

   // get all notes created by student
  const { data, isPending, isError, error,isFetching } = useQuery({
    queryKey: ["booked"],
    queryFn: () => apiRequiestWithCredentials("get", "/booked/my-bookings"),
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
  });



  // Update state when data changes
    useEffect(() => {
      if (data?.bookings) {
        setBookedSessions(data.bookings);
      }
    }, [data]);
   
    // Handle error toast outside render
      useEffect(() => {
        if (isError) {
          toast.error(error?.response?.data?.message || "Failed to fetch notes");
        }
      }, [isError, error]);


// load page when data fateching 
  if (isPending || !data) {
    return <Loader />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 min-h-screen
     bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Booked Sessions</h1>
      <p className="text-gray-500 mb-6">
        View and manage all your enrolled study sessions.
      </p>

     {isFetching ? <Fetching /> : bookedSessions.length === 0 ? (
      <div className="w-full flex justify-center items-center">
        <p className="text-gray-600 mt-10">You haven’t booked any sessions yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-[900px] w-full  table-auto text-left ">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Tutor</th>
                <th className="px-6 py-4 font-semibold">Fee</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookedSessions.map((book) =>{
                  return (
                
                  <tr key={book?._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={book?.session?.image}
                      alt={book?.session?.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{book?.session?.title}</td>
                  <td className="px-6 py-4 text-gray-700">{dateFormat(book?.session?.classStart)}</td>
                  <td className="px-6 py-4 text-gray-700">{book?.session?.tutor?.name}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {book?.session?.fee === 0 ? "Free" : `$${book?.session?.fee}`}
                  </td>
                  <td className="px-6 py-4">
                   <Link to={`/session/${book?.session?._id}`}> <button
                      className="text-white cursor-pointer bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                      View Details
                    </button></Link>
                  </td> 
                  </tr>
                )
                 
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default BookedSessions;
