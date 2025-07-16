import React, { useContext, useEffect, useState } from "react";
import { apiRequiestWithCredentials } from "../../../utilities/handleApis";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../../additionals/Loader";
import { dateFormat } from "../../../utilities/dateFormate";
import { AuthContext } from "../../../controllers/AuthProvider";
import { queryClient } from "../../../utilities/queryclient";
import { getSessionStatus } from "../../../utilities/sessionStatus";
import { Helmet } from "react-helmet";

const SessionDetails = () => {
  // const session = {
  //   _id: "abc123",
  //   title: "Advanced React Study Group",
  //   tutorName: "John Doe",
  //   tutorEmail: "john@example.com",
  //   averageRating: 4.6,
  //   description: "This study session focuses on advanced React concepts including hooks, context, and performance optimization.",
  //   registrationStart: "2025-07-01",
  //   registrationEnd: "2025-07-20",
  //   classStart: "2025-07-21T10:00",
  //   classEnd: "2025-08-21T12:00",
  //   duration: "1 Month",
  //   registrationFee: 0,
  //   image: "https://images.unsplash.com/photo-1701170645257-8345722edf47?crop=entropy&q=80&w=1080",
  //   status: "Ongoing",
  // };

  const {userInfo}=useContext(AuthContext);

  const [session,setSession]=useState(null);
  
  const {id}=useParams();
   
  // set session details
    const { data, isPending, isError, error } = useQuery({
      queryKey: ["tsessions",id],
      queryFn: () => apiRequiestWithCredentials("get", `/sessions/user/${id}`),
      refetchOnWindowFocus: true,
      refetchOnMount: 'always'
    });
  

    // Update state when data changes
        useEffect(() => {
          if (data?.session) {
            setSession(data.session);
          }
        }, [data]);
      
        // Handle error toast outside render
              useEffect(() => {
                if (isError) {
                  toast.error(error?.response?.data?.message || "Failed to fetch sessions");
                }
              }, [isError, error]);

    // get booked session 
    const { data : isBookedData,isPending :bookPending, isError : isErrorBook, error : errorBook} = useQuery({
      queryKey: ["booked",id],
      queryFn: () => apiRequiestWithCredentials("get", `/booked/check/${id}`),
      refetchOnWindowFocus: true,
      refetchOnMount: 'always'
    });

    
  
  

  // Filter reviews for this session
  


  
   const navigate = useNavigate();
   const [bookLoading,setBookLoading]=useState(false);
  const handleBooking = async() => {
    const status = getSessionStatus(session?.registrationStart, session?.registrationEnd);
    if(isBookedData.isBooked && status !== 'Open'){
      return;
    }

    if (session?.fee === 0) {
      setBookLoading(true);
       try {
                     await apiRequiestWithCredentials("post", `/booked/book/${id}`);
                     await queryClient.invalidateQueries({ queryKey: ['booked'] });
                     toast.success("Session Booked.");
                     } catch (err) {
           
                       toast.error("Failed to book session");
                     }finally{
      setBookLoading(false);

                     }
    } else {
      
      navigate(`/checkout/${id}?price=${session?.fee}`)
    }
   
  };

  
  const [reviews, setReviews] = useState([]);
  // get review 
    const { data : reviewData, isPending :isReviewPending, isError : isReviewError, error : reviewError} = useQuery({
      queryKey: ["reviews"],
      queryFn: () => apiRequiestWithCredentials("get", `/reviews/session/${id}`),
      refetchOnWindowFocus: true,
      refetchOnMount: 'always'
    });

    // set reviews
        useEffect(() => {
          if (reviewData?.reviews) {
            setReviews(reviewData?.reviews);
          }
        }, [reviewData]);
    // Review form state
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [postLoading,setPostLoading]=useState('')
  const handleReviewSubmit = async() => {
    const isReviewed = reviews?.find(r => r.student.email === userInfo.email)
    if(isReviewed){
      toast.error('You have reviewed')
      return;
    }
    setPostLoading(true)
try {
              await apiRequiestWithCredentials("post", `/reviews/${id}`, {rating, comment });
              await queryClient.invalidateQueries({ queryKey: ['reviews'] });
                setComment('');
                setRating(0);
                toast.success("Review posted.");
              } catch (err) {
           
                toast.error("Failed to post review.");
              }finally{
                setPostLoading(false)
              }

  }

// load page when data fateching 
  if (isPending || session === null || bookPending || isReviewPending) {
    return <Loader />;
  }
  
  return (
   <> 
   <Helmet>
        <title>NexLearn | Session Details</title>
      </Helmet>
   <section className="min-h-screen bg-gray-50 py-10 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{session?.title}</h1>
          <p className="text-gray-600">Tutor: <span className="font-medium">{session?.tutor?.name}</span></p>
          {/* <p className="text-yellow-500 font-semibold mt-2">⭐ {session.averageRating} / 5</p> */}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* session details */}
          <div className="md:col-span-2">
            <img src={session?.image} alt="Session" className="w-full h-64 object-cover rounded-lg mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{session?.description}</p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Reviews</h2>
            {reviews?.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <div key={i} className="bg-white p-3 
                  rounded-lg shadow-sm border border-gray-100 " >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <img src={review?.student?.avatar} alt="reviewer image" className="w-10" />
                        <div>
                          <p className="font-medium text-gray-800">{review?.student?.name}</p>
                          <p className="text-gray-400 text-xs">{dateFormat(review?.createdAt)}</p>
                        </div>
                      </div>
                      <span className="text-yellow-500 font-semibold">⭐ {review?.rating}</span>
                    </div>
                    <p className="text-gray-600 text-sm  mt-3">{review?.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No reviews yet.</p>
            )}
          </div>

            {/* book session card */}
           <div className="bg-white p-4 rounded-xl shadow-sm border
            border-gray-100 flex flex-col justify-between">
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-bold text-gray-800">Session Info</h3>
              <p>
                <strong>📅 Registration Start:</strong> {dateFormat(session?.registrationStart)}
              </p>
              <p>
                <strong>📅 Registration End:</strong> {dateFormat(session?.registrationEnd)}
              </p>
              <p>
                <strong>🕒 Class Starts:</strong> { dateFormat(session?.classStart).toLocaleString()}
              </p>
              <p>
                <strong>🕓 Class Ends:</strong> {dateFormat(session?.classEnd).toLocaleString()}
              </p>
              <p>
                <strong>⏳ Duration:</strong> {session?.duration}
              </p>
              <p>
                <strong>💰 Fee:</strong> {session?.fee === 0 ? "Free" : `$${session.fee}`}
              </p>
            </div>

           {(()=>{
            const status = getSessionStatus(session?.registrationStart, session?.registrationEnd);
            const {isBooked} = isBookedData;
            return( 
            <button
              disabled={isBooked || userInfo?.role === 'tutor' || userInfo?.role === 'admin' || status === 'Closed' || status === 'Upcoming'}
              onClick={handleBooking}
              className={` w-full py-3 px-4 text-white font-semibold rounded-lg transition
                ${status === 'Open' && userInfo?.role === 'student' ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}
                `}
            >
              {isBooked ? "Already Booked"
                : !isBooked  && status === "Open"  ?  bookLoading ? "Booking..." : "Book Now" : 
                !isBooked  && status === 'Upcoming' ?  "Registration Upcomming "
                : "Registration Closed"}
            </button>
          )})()}

            {/* Show review form only if booked */}
            {isBookedData?.isBooked && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium" htmlFor="rating">
                      Rating
                    </label>
                    <select
                      id="rating"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value={0}>Select rating</option>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your review here"
                    />
                  </div>

                  <button
                    disabled={rating === 0 || comment.trim() === ""}
                    onClick={handleReviewSubmit}
                    className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 ${
                      rating !== 0 && comment.trim() !== ""
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {postLoading ? 'Posting...' : 'Post Review'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </section>
    </>
  );
};

export default SessionDetails;
