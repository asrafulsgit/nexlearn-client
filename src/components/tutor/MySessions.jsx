import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import Loader from "../../additionals/Loader";
import { toast } from "react-toastify";
import { dateFormat } from "../../utilities/dateFormate";
import { queryClient } from "../../utilities/queryclient";
import Fetching from "../../additionals/Fetching";



const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null);
   
  const {data, isPending, isError, error,isFetching} = useQuery({
    queryKey: ['tsessions'],
    queryFn: () => apiRequiestWithCredentials('get', '/sessions/tutor'),
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
  });
  useEffect(() => {
  if (data?.sessions) {
    setSessions(data.sessions);
  }
}, [data]);

  if(isPending || !data){
    return  <Loader />;
  }
  
  if(isError){
    toast.error(error?.response?.data?.message)
  }
// sessions/tutor/re-submit/:sessionId
  const handleResubmit = async(id) => {

     try {
         await apiRequiestWithCredentials("put", `/sessions/tutor/re-submit/${id}`);
         await queryClient.invalidateQueries({ queryKey: ['tsessions'] });
         toast.success("Approval request sent successfully!");
       } catch (err) {
        console.log(err)
        toast.error("Failed to Approval request");
       } 
  };


 
  return (
    <section className="min-h-[70vh] max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">My Study Sessions</h2>
      <p className="text-gray-600 mb-6">View and manage all of your submitted study sessions.</p>

      {isFetching ? <Fetching /> : sessions.length > 0 ? 
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-[950px] w-full bg-white text-sm text-left">
          <thead className="bg-green-600 text-white uppercase">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Reg. Dates</th>
              <th className="px-6 py-3">Class Dates</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions?.map((session, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-6 py-4">
                  <img
                    src={session?.image || ''}
                    alt={session?.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{session?.title}</td>
                <td className="px-6 py-4 text-gray-700">
                  {dateFormat(session?.registrationStart)} → {dateFormat(session?.registrationEnd)}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {dateFormat(session?.classStart)  } → {dateFormat(session?.classEnd)}
                </td>
                <td className="px-6 py-4">
                  {session?.status === "approved" && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                      Approved
                    </span>
                  )}
                  {session.status === "rejected" && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs">
                      Rejected
                    </span>
                  )}
                  {session?.status === "pending" && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 space-x-2">
                  {session?.status === "rejected" ? (
                    <>
                      <button
                        onClick={() => handleResubmit(session?._id)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs"
                      >
                        Send New Request
                      </button>
                      <button
                        onClick={() => setSelectedReason(session)}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-xs"
                      >
                        Reason
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-xs italic">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : 
      <div className="min-h-[10vh] w-full flex justify-center items-center">
          <p className="text-green-600">You have no Sessions.</p>
        </div>}

      {/* Reason Modal */}
      {selectedReason && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Rejection Details</h3>
            <p className="mb-2">
              <strong>Reason:</strong> {selectedReason.rejectionReason || "Not specified"}
            </p>
            <p className="mb-4">
              <strong>Feedback:</strong> {selectedReason.feedback || "No feedback provided"}
            </p>
            <div className="text-right">
              <button
                onClick={() => setSelectedReason(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MySessions;
