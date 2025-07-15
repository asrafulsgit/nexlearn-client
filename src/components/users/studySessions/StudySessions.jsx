import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { apiRequiest } from "../../../utilities/handleApis";
import { toast } from "react-toastify";
import Loader from "../../../additionals/Loader";
import { Link } from "react-router";
import { dateFormat } from "../../../utilities/dateFormate";
import { getSessionStatus } from "../../../utilities/sessionStatus";


const StudySessions= () => {
  const [sessions, setSessions] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages,setTotalPages]=useState(0);
  const [limit,setLimit]=useState(3);
  const [search,setSearch]=useState('');

   // get all notes created by student
  const { data, isPending, isError, error,refetch } = useQuery({
    queryKey: ["tsessions",activePage],
    queryFn: () => apiRequiest("get", `/sessions/user?page=${activePage}&limit=${limit}`),
    refetchOnWindowFocus: true,
    refetchOnMount: 'always'
  });
    
  // Update state when data changes
    useEffect(() => {
      if (data?.sessions) {
        setSessions(data.sessions);
        setTotalPages(data?.totalPages || 0);
      }
    }, [data]);
   
    // Handle error toast outside render
      useEffect(() => {
        if (isError) {
          toast.error(error?.response?.data?.message || "Failed to fetch sessions");
        }
      }, [isError, error]);



const handlePageChange = async(page) => {
    setActivePage(page);
    if (page >= 1 && page <= totalPages && page !== activePage) {
      setActivePage(page);
    }
  };


  // search functionality
  const refetchFunction = async()=>{
const result = await refetch(); 

   
    if (result.data?.sessions) {
      setSessions(result.data.sessions);
    }
}
  const handleSearch = (value)=>{
      setSearch(value)
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
             const data = await apiRequiest('get',`/sessions/user/search?name=${searchValue}`)
             console.log(data)
             setSessions(data?.sessions)
      
             } catch (error) {
               setSessions([])
               toast.error(error?.response?.data?.message)
               
             }finally{
              setFilterLoading(false)
             }
          }, 1000); 
       }




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
          value={search}
          onChange={(e)=> handleSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-full lg:w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {/* <select className="w-full lg:w-1/4 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">Filter by Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="closed">Closed</option>
        </select> */}
      </div>

      {/* Sessions Grid */}
    {!filterLoading ?  
    
    <> 
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
      )} </>

      :

      <div className="min-h-[10vh] w-full flex justify-center items-center">
          <p className="text-green-600">Loading...</p>
      </div>
      
    }


    </section>
  );
};

export default StudySessions;
