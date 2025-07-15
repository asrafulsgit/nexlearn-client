import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { apiRequiest } from "../../../utilities/handleApis";
import { toast } from "react-toastify";

// const tutorsData = [
//   {
//     id: 1,
//     name: "Emma Watson",
//     subject: "Mathematics",
//     rating: 4.8,
//     bio: "Experienced math tutor with a passion for helping students grasp difficult concepts.",
//     image: "https://randomuser.me/api/portraits/women/65.jpg"
//   },
//   {
//     id: 2,
//     name: "Liam Brown",
//     subject: "Physics",
//     rating: 4.6,
//     bio: "Physics expert who simplifies complex topics with real-world examples.",
//     image: "https://randomuser.me/api/portraits/men/44.jpg"
//   },
//   {
//     id: 3,
//     name: "Olivia Green",
//     subject: "English Literature",
//     rating: 4.9,
//     bio: "Helping students fall in love with literature through interactive lessons.",
//     image: "https://randomuser.me/api/portraits/women/68.jpg"
//   },
//   {
//     id: 4,
//     name: "Noah Smith",
//     subject: "Chemistry",
//     rating: 4.5,
//     bio: "Chemistry tutor focused on building strong foundational knowledge.",
//     image: "https://randomuser.me/api/portraits/men/33.jpg"
//   }
// ];

const Tutors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const [tutors,setTutors]=useState([])
   // get all available sessions
    const { data, isPending, isError, error,refetch } = useQuery({
      queryKey: ["tutors"],
      queryFn: () => apiRequiest("get", "/tutors"),
      refetchOnWindowFocus: true,
      refetchOnMount: 'always'
    });
  
    // Update state when data changes
      useEffect(() => {
        if (data?.tutors) {
          setTutors(data.tutors);
        }
      }, [data]);
     
      // Handle error toast outside render
        useEffect(() => {
          if (isError) {
            toast.error(error?.response?.data?.message || "Failed to fetch sessions");
          }
        }, [isError, error]);

        const uniqueSubjects = []


        // search tutors fucntionality

         const refetchFunction = async()=>{
        const result = await refetch(); 
        
           
            if (result.data?.tutors) {
              setTutors(result.data.tutors);
            }
        }
          const handleSearch = (value)=>{
              setSearchTerm(value)
              searchFunctionality(value.trim())
            }
          
            const [filterLoading,setFilterLoading] = useState(false);
          
            let interval;
               const searchFunctionality=async(searchValue)=>{ 
                clearTimeout(interval)
                if (!searchValue) {
                  refetchFunction()
                  return;
                }
                 setFilterLoading(true)
            
                   interval = setTimeout(async() => {
                    
                   try {
                     const data = await apiRequiest('get',`/tutors/search?name=${searchValue}`)
                    
                     setTutors(data?.tutors)
              
                     } catch (error) {
                       setTutors([])
                       toast.error(error?.response?.data?.message)
                       
                     }finally{
                      setFilterLoading(false)
                     }
                  }, 1000); 
               }

  return (
    <section className="min-h-screen bg-gray-50 py-10  ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Our Tutors</h1>
          <p className="text-gray-600">Connect with qualified tutors to guide your learning journey.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-12 flex flex-col lg:flex-row lg:justify-between items-center gap-4">
          <div className="relative w-full lg:w-2/3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name or subject..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700 placeholder-gray-400"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"></path>
              </svg>
            </div>
          </div>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Filter by Subject</option>
            {uniqueSubjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Tutors Grid */}
        {!filterLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tutors?.map((tutor) => (
            <div
              key={tutor?._id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition"
            >
              <img
                src={tutor?.avatar}
                alt={tutor?.name}
                className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-center text-gray-800">{tutor?.name}</h3>
              <p className="text-sm text-center text-gray-500 mb-1">{tutor?.email}</p>
              {/* <p className="text-sm text-center text-gray-500 mb-1">{tutor.subject}</p> */}
              {/* <p className="text-sm text-center text-yellow-500 font-semibold">⭐ {tutor.rating}</p> */}
              {/* <p className="text-gray-600 text-sm mt-4 text-center">{tutor.bio}</p> */}
              {/* <div className="mt-6 text-center">
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg text-sm font-medium transition">View Profile</button>
              </div> */}
            </div>
          ))}
        </div> : 
        <div className="min-h-[10vh] w-full flex justify-center items-center">
          <p className="text-green-600">Loading...</p>
      </div>
        }

      </div>
    </section>
  );
};

export default Tutors;


// upgrade feature
/*
<div
              key={tutor.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition"
            >
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-center text-gray-800">{tutor.name}</h3>
              <p className="text-sm text-center text-gray-500 mb-1">{tutor.subject}</p>
              <p className="text-sm text-center text-yellow-500 font-semibold">⭐ {tutor.rating}</p>
              <p className="text-gray-600 text-sm mt-4 text-center">{tutor.bio}</p>
              <div className="mt-6 text-center">
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg text-sm font-medium transition">View Profile</button>
              </div>
            </div>
*/
