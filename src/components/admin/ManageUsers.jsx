import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiRequiestWithCredentials } from "../../utilities/handleApis";
import Loader from "../../additionals/Loader";
import { toast } from "react-toastify";
import { queryClient } from "../../utilities/queryclient";
import Fetching from "../../additionals/Fetching";
import { Helmet } from "react-helmet";



const ManageUsers = () => {
  
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const {data, isPending, isError, error, refetch,isFetching} = useQuery({
    queryKey: ['users'],
    queryFn: () => apiRequiestWithCredentials('get', '/admin/users'),
    refetchOnMount: 'always'
  });

  
 

  const handleRoleChange = (user, role) => {
  setSelectedUser(user);
  setNewRole(role);
  setIsModalOpen(true);
};


const confirmRoleChange = async() => { 
   try {
    await apiRequiestWithCredentials("put", `/admin/user/${selectedUser._id}/role`, {
      newRole
    });
    setSelectedUser(null);
    setNewRole('')
    await queryClient.invalidateQueries({ queryKey: ['users'] });
    toast.success("Role updated");
    setIsModalOpen(false);
  } catch (err) {
    toast.error("Failed to update role");
  } 
   
};


const refetchFunction = async()=>{
const result = await refetch(); 

   
    if (result.data?.users) {
      setUsers(result.data.users);
    }
}

// search functionality  
  const [searchTerm, setSearchTerm] = useState("");
  

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
           const data = await apiRequiestWithCredentials('get',`/admin/users/search?name=${searchValue}`)
           setUsers(data?.users)
    
           } catch (error) {
             setUsers([])
             toast.error(error?.response?.data?.message)
             
           }finally{
            setFilterLoading(false)
           }
        }, 1000); 
     }

//  filter functionality
const [filter,setFilter]=useState('');
const handleFilter = async(value)=>{
  setFilter(value);

  if(!value.trim()){
    refetchFunction();
    return;
  }
  setFilterLoading(true)
  try {
           const data = await apiRequiestWithCredentials('get',`/admin/users/filter?role=${value}`)
           setUsers(data?.users)
          
           } catch (error) {
             setUsers([])
             toast.error(error?.response?.data?.message)
             
           }finally{
            setFilterLoading(false)
           }
}

// others
  useEffect(() => {
  if (data?.users) {
    setUsers(data.users);
  }
}, [data]);
  
if(isPending || !data){
    return <Loader />;
  }
  if(isError){
    return toast.error(error?.response?.data?.message);
  }
  return (
   <> 
   <Helmet>
        <title>NexLearn |  Manage Users</title>
      </Helmet>
   <div className="max-w-7xl mx-auto px-4 min-h-[80vh] pb-15">
      
      <div className="my-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Manage Users</h1>
      <p className="text-gray-600 ">
        View all users and update their roles (Student, Tutor, Admin) as needed.
      </p>
    </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-12 flex flex-col lg:flex-row lg:justify-between items-center gap-4">
          <div className="relative w-full lg:w-2/3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name..."
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
            value={filter}
            onChange={(e) => handleFilter(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>Filter by role</option>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
            <option value="">All</option>
          </select>
        </div>

      {/* Users Table */}
    {isFetching ? <Fetching />  : !filterLoading ? 
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-[700px] w-full table-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="text-left px-4 py-3">Image</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
  {  
  users.map((user) => (
    <tr key={user._id || user.id} className="border-b border-gray-200">
      <td className="px-4 py-3">
        <img
          src={user.avatar || "https://via.placeholder.com/40"}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
      </td>
      <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
      <td className="px-4 py-3 text-gray-600">{user.email}</td>
      <td className="px-4 py-3">
        <select
          value={user.role}
          onChange={(e) => handleRoleChange(user, e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="admin">Admin</option>
        </select>
      </td>
    </tr>
  )) }
</tbody>

        </table>
      </div> 
    : 
      <div className="min-h-[10vh] w-full flex justify-center items-center">
          <p className="text-green-600">Loading...</p>
      </div> 
      }
    </div>


    {isModalOpen && selectedUser && (
  <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Role Change</h3>
      <p className="mb-6 text-gray-700">
        Are you sure you want to change <strong>{selectedUser.name}</strong>'s role to <strong>{newRole}</strong>?
      </p>
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={confirmRoleChange}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

    
    </>
  );
};

export default ManageUsers;
