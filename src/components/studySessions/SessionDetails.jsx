import React, { useState } from "react";

const SessionDetailsPage = () => {
  const session = {
    _id: "abc123",
    title: "Advanced React Study Group",
    tutorName: "John Doe",
    tutorEmail: "john@example.com",
    averageRating: 4.6,
    description: "This study session focuses on advanced React concepts including hooks, context, and performance optimization.",
    registrationStart: "2025-07-01",
    registrationEnd: "2025-07-20",
    classStart: "2025-07-21T10:00",
    classEnd: "2025-08-21T12:00",
    duration: "1 Month",
    registrationFee: 0,
    image: "https://images.unsplash.com/photo-1701170645257-8345722edf47?crop=entropy&q=80&w=1080",
    status: "Ongoing",
  };

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
  const reviews = allReviews.filter((review) => review.sessionId === session._id);

  // Simulate logged-in user
  const user = {
    email: "student@example.com",
    role: "student",
    isLoggedIn: true,
    bookedSessions: ["abc123"], // session already booked
  };

  const isRegistrationOpen = new Date() < new Date(session.registrationEnd);
  const canBook =
    user.isLoggedIn && user.role === "student" && isRegistrationOpen && !user.bookedSessions.includes(session._id);
  const isAlreadyBooked = user.bookedSessions.includes(session._id);

  // Review form state
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [reviewsState, setReviewsState] = useState(reviews);

  const handleBooking = () => {
    if (!canBook) return;
    if (session.registrationFee === 0) {
      alert("Free session booked successfully");
    } else {
      alert("Redirect to payment page");
    }
    // Simulate booking by adding session to bookedSessions (in real app, update backend)
    user.bookedSessions.push(session._id);
  };

  const handleReviewSubmit = () => {
    if (rating === 0 || message.trim() === "") return;

    const newReview = {
      sessionId: session._id,
      student: user.email,
      rating,
      comment: message,
      date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
    };

    setReviewsState((prev) => [newReview, ...prev]);
    setRating(0);
    setMessage("");
    alert("Review submitted successfully");
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{session.title}</h1>
          <p className="text-gray-600">Tutor: <span className="font-medium">{session.tutorName}</span></p>
          <p className="text-yellow-500 font-semibold mt-2">⭐ {session.averageRating} / 5</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <img src={session.image} alt="Session" className="w-full h-64 object-cover rounded-lg mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{session.description}</p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Reviews</h2>
            {reviews.length > 0 ? (
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
            )}
          </div>

           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between">
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-bold text-gray-800">Session Info</h3>
              <p>
                <strong>📅 Registration Start:</strong> {session.registrationStart}
              </p>
              <p>
                <strong>📅 Registration End:</strong> {session.registrationEnd}
              </p>
              <p>
                <strong>🕒 Class Starts:</strong> {new Date(session.classStart).toLocaleString()}
              </p>
              <p>
                <strong>🕓 Class Ends:</strong> {new Date(session.classEnd).toLocaleString()}
              </p>
              <p>
                <strong>⏳ Duration:</strong> {session.duration}
              </p>
              <p>
                <strong>💰 Fee:</strong> {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}
              </p>
            </div>

            <button
              disabled={!canBook}
              onClick={handleBooking}
              className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 text-center mt-4 ${
                canBook ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isAlreadyBooked
                ? "Already Booked"
                : isRegistrationOpen
                ? canBook
                  ? "Book Now"
                  : "Not Eligible to Book"
                : "Registration Closed"}
            </button>

            {/* Show review form only if booked */}
            {isAlreadyBooked && (
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
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default SessionDetailsPage;
