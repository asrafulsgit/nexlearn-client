import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import Loader from "../../additionals/Loader";
import { toast } from "react-toastify";
import { queryClient } from "../../utilities/queryclient";
import Fetching from "../../additionals/Fetching";
import { Helmet } from "react-helmet";

const ManageSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [fee, setFee] = useState("");

  const [activePage, setActivePage] = useState(1);
  const [totalPages,setTotalPages]=useState(0);
  const [limit,setLimit]=useState(5);

  // get all pending sessions
  const {data, isPending, isError, error,isFetching} = useQuery({
    queryKey: ['tsessions',activePage],
    queryFn: () => apiRequiestWithCredentials('get', `/sessions/admin?page=${activePage}&limit=${limit}`),
   refetchOnMount: 'always'
  });
  useEffect(() => {
    if (data?.sessions) {
      setSessions(data.sessions);
      setTotalPages(data?.totalPages || 0);
    }
  }, [data]);

  console.log(data)

  // handle page change 
  const handlePageChange = async(page) => {
    setActivePage(page);
    if (page >= 1 && page <= totalPages && page !== activePage) {
      setActivePage(page);
    }
  };
  
   // approve  setting
   const [approvalModal, setApprovalModal] = useState(false);
   const [approveLoading,setApproveLoading]=useState(false);
  
  const handleApprove = (session) => {
    setSelectedSession(session);
    setFee(session.fee || 0);
    setApprovalModal(true);
  };
  // console.log(data?.sessions)
  const confirmApprove = async() => {
    setApproveLoading(true);
    try {
        await apiRequiestWithCredentials("put", `/sessions/admin/approve/${selectedSession._id}`,{fee});
        setSelectedSession(null);
        setFee("");
        await queryClient.invalidateQueries({ queryKey: ['tsessions'] });
        toast.success("Session approved.");
        setApprovalModal(false);
      } catch (err) {
        toast.error("Failed to approve session.");
      }finally{
        setApproveLoading(false);
      } 

  };

  // rejection  setting
  const [rejectionModal, setRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionFeedback, setRejectionFeedback] = useState("");
  const handleReject = (session) => {
    setSelectedSession(session);
    setRejectionModal(true);
  };

  const confirmReject = async(e) => {
    e.preventDefault();
    if(!rejectionReason.trim()){
      toast.error("Rejection reason required.");
      return;
    }
    setApproveLoading(true)
    try {
        await apiRequiestWithCredentials("put", `/sessions/admin/reject/${selectedSession._id}`,{rejectionReason,rejectionFeedback});
        setSelectedSession(null);
        setRejectionReason("");
        setRejectionFeedback("");
        await queryClient.invalidateQueries({ queryKey: ['tsessions'] });
        toast.success("Session rejected.");
        setRejectionModal(false);
      } catch (err) {
        toast.error("Failed to reject session.");
      }finally{
        setApproveLoading(false);
      } 
  };
  // delete model setting
  const handleDelete = async(id) => {
     try {
        await apiRequiestWithCredentials("delete", `/sessions/admin/${id}`);
        await queryClient.invalidateQueries({ queryKey: ['tsessions'] });
        toast.success("Session deleted.");
      } catch (err) {
        console.log(err)
        toast.error("Failed to delete session.");
      } 
   
  };

  // edit model setting
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ fee: 0 });
  const handleEdit = (session) => {
    setEditData({ fee: session.fee });
    setSelectedSession(session);
    setEditModal(true);
  };

  const confirmEdit = async() => {
    setApproveLoading(true)
    try {
        await apiRequiestWithCredentials("put", `/sessions/admin/${selectedSession._id}`,editData);
        setEditModal(false);
        setSelectedSession(null);
        await queryClient.invalidateQueries({ queryKey: ['tsessions'] });
        toast.success("Session updated.");
        setRejectionModal(false);
      } catch (err) {
        console.log(err)
        toast.error("Failed to update session.");
      }finally{
    setApproveLoading(false)
        
      }
    
  };


    
if(isPending || !data){
    return <Loader />;
  }
  if(isError){
    return toast.error(error?.response?.data?.message);
  }

  return (
    <>
    <Helmet>
        <title>NexLearn |  Manage Sessions</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 min-h-[70vh] pb-20">
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-1">Manage Study Sessions</h2>
          <p className="text-gray-500">Approve, reject, update, or delete sessions.</p>
        </div>

      {isFetching ? <Fetching />  :  
      <>
      <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full  text-sm bg-white rounded shadow">
            <thead className="bg-green-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Tutor</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Fee</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
                
             { sessions.map((session) => (
                <tr key={session?._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">{session?.title}</td>
                  <td className="px-4 py-3">{session?.tutor?.name}</td>
                  <td className="px-4 py-3 capitalize">{session?.status}</td>
                  <td className="px-4 py-3">
                    {session?.fee === 0 ? "Free" : `$${session?.fee}`}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {session?.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(session)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(session)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    ) : session?.status === "approved" ? (
                      <>
                        <button
                          onClick={() => handleEdit(session)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(session?._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    ) : '-'}
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>

      {/* pagination   */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-16">
          <nav className="inline-flex items-center space-x-2 text-sm">
            <button
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
              className="px-4 cursor-pointer py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 cursor-pointer py-2 rounded-md border ${
                    activePage === page
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              className="px-4 cursor-pointer py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
      
      </>
      }




      </div>

      {/* Approval Modal */}
      {approvalModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Set Session Fee</h3>
            <label className="block text-sm text-gray-700 mb-2">
              Is this session free or paid? (0 = Free)
            </label>
            <input
              type="number"
              min="0"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="Enter fee amount"
              className="w-full border px-4 py-2 rounded mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setApprovalModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={confirmApprove}
              >
              {approveLoading ? 'Approving...' :  'Confirm Approve'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Session Fee</h3>
            <input
              type="number"
              min="0"
              value={editData.fee}
              onChange={(e) =>
                setEditData({ ...editData, fee: e.target.value })
              }
              placeholder="Fee (0 = Free)"
              className="w-full mb-4 border px-4 py-2 rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={confirmEdit}
              >
             {approveLoading ? 'Saving...' :   'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Reject Session</h3>
            <form action="" onSubmit={confirmReject}> 
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rejection Reason
            </label>
            <input
              type="text"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason"
              className="w-full mb-4 border px-4 py-2 rounded"
              required
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback (Optional)
            </label>
            <textarea
              rows="3"
              value={rejectionFeedback}
              onChange={(e) => setRejectionFeedback(e.target.value)}
              placeholder="Provide helpful feedback..."
              className="w-full mb-4 border px-4 py-2 rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setRejectionModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                
              >
              {approveLoading ? 'Rejecting' :  'Confirm Reject'}
              </button>
            </div>
            </form>
          </div>
        </div>
      )}

      
    </>
  );
};

export default ManageSessions;
