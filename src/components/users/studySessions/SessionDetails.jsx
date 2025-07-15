import React, { useContext, useEffect, useState } from "react";
import { apiRequiestWithCredentials } from "../../../utilities/handleApis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../../additionals/Loader";
import { dateFormat } from "../../../utilities/dateFormate";
import { AuthContext } from "../../../controllers/AuthProvider";
import { queryClient } from "../../../utilities/queryclient";

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
   
  // get all notes created by student
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
    const { data : isBookedData, isError : isErrorBook, error : errorBook} = useQuery({
      queryKey: ["booked",id],
      queryFn: () => apiRequiestWithCredentials("get", `/booked/check/${id}`),
      refetchOnWindowFocus: true,
      refetchOnMount: 'always'
    });

 
  
  const allReviews = [
    {
      sessionId: "abc123",
      student: "Jane Smith",
      rating: 5,
      comment: "Excellent session! Learned a lot.",
      date: "2025-07-05",
    },
    {
      sessionId: "abc123",
      student: "Alex Johnson",
      rating: 4,
      comment: "Very informative and well-organized.",
      date: "2025-07-06",
    },
    {
      sessionId: "xyz789",
      student: "Another Student",
      rating: 3,
      comment: "Different session.",
      date: "2025-07-04",
    },
  ];

  // Filter reviews for this session
  // const reviews = allReviews.filter((review) => review.sessionId === session._id);

  // // Simulate logged-in user
  // const user = {
  //   email: "student@example.com",
  //   role: "student",
  //   isLoggedIn: true,
  //   bookedSessions: ["abc123"], 
  // };

  const handlePayment =()=>{
    console.log('ready to payment')
  }

  // Review form state
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  // const [reviewsState, setReviewsState] = useState(reviews);

  const handleBooking = async() => {
    const status = getSessionStatus(session?.registrationStart, session?.registrationEnd);
    if(isBookedData.isBooked && status !== 'Open'){
      return;
    }

    if (session?.fee === 0) {
       try {
                     await apiRequiestWithCredentials("post", `/booked/book/${id}`);
                     await queryClient.invalidateQueries({ queryKey: ['booked'] });
                       toast.success("Session Booked.");
                     } catch (err) {
                       console.log(err)
                       toast.error("Failed to book session");
                     } 
    } else {
       
    }
   
  };

  // const handleReviewSubmit = () => {
  //   if (rating === 0 || message.trim() === "") return;

  //   const newReview = {
  //     sessionId: session._id,
  //     student: user.email,
  //     rating,
  //     comment: message,
  //     date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
  //   };

  //   setReviewsState((prev) => [newReview, ...prev]);
  //   setRating(0);
  //   setMessage("");
  //   alert("Review submitted successfully");
  // };

// booking status checking 
  const getSessionStatus = (registrationStart, registrationEnd) => {
  const now = new Date();
  const start = new Date(registrationStart);
  const end = new Date(registrationEnd);

  if (now >= start && now <= end) {
    return "Open"  
  } else if (now > end) {
    return "Closed"  
  } else if (now < start) {
    return "Upcoming"  
  }
};

// load page when data fateching 
  if (isPending || session === null) {
    return <Loader />;
  }
  
  return (
    <section className="min-h-screen bg-gray-50 py-10 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{session?.title}</h1>
          <p className="text-gray-600">Tutor: <span className="font-medium">{session?.tutor?.name}</span></p>
          {/* <p className="text-yellow-500 font-semibold mt-2">⭐ {session.averageRating} / 5</p> */}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <img src={session?.image} alt="Session" className="w-full h-64 object-cover rounded-lg mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{session?.description}</p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Reviews</h2>
            {/* {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-gray-800">{review.student}</p>
                      <span className="text-yellow-500 font-semibold">⭐ {review.rating}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                    <p className="text-gray-400 text-xs">Reviewed on {review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No reviews yet.</p>
            )} */}
          </div>

           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between">
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
              disabled={isBooked || status === 'Closed' || status === 'Upcoming'}
              onClick={handleBooking}
              className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 text-center mt-4 ${
                status === 'Open' ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isBooked ? "Already Booked"
                : !isBooked  && status === "Open"  ? "Book Now" : 
                !isBooked  && status === 'Upcoming' ?  "Registration Upcomming "
                : "Registration Closed"}
            </button>
          )})()}

            {/* Show review form only if booked */}
            {/* {isAlreadyBooked && (
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your review here"
                    />
                  </div>

                  <button
                    disabled={rating === 0 || message.trim() === ""}
                    onClick={handleReviewSubmit}
                    className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 ${
                      rating !== 0 && message.trim() !== ""
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default SessionDetails;
