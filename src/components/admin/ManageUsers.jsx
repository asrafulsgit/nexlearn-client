import { useState } from "react";

const dummyUsers = [
  {
    id: 1,
    name: "Ayesha Rahman",
    email: "ayesha@student.com",
    image: "https://i.pravatar.cc/100?img=1",
    role: "student",
  },
  {
    id: 2,
    name: "Tariq Hossain",
    email: "tariq@tutor.com",
    image: "https://i.pravatar.cc/100?img=2",
    role: "tutor",
  },
  {
    id: 3,
    name: "Nadia Islam",
    email: "nadia@admin.com",
    image: "https://i.pravatar.cc/100?img=3",
    role: "admin",
  },
];

const ManageUsers = () => {
  
  const [users, setUsers] = useState(dummyUsers);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRoleChange = (user, role) => {
  setSelectedUser(user);
  setNewRole(role);
  setIsModalOpen(true);
};

const confirmRoleChange = () => {
  const updatedUsers = users.map((u) =>
    u.id === selectedUser.id ? { ...u, role: newRole } : u
  );
  setUsers(updatedUsers);
  setIsModalOpen(false);
   
};


// search and filter functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  // const filteredTutors = users.filter(tutor => {
  //   const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     tutor.subject.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesSubject = subjectFilter ? tutor.subject.toLowerCase() === subjectFilter.toLowerCase() : true;
  //   return matchesSearch && matchesSubject;
  // });

  // const uniqueSubjects = [...new Set(tutorsData.map(t => t.subject))];


  return (
   <> 
   <div className="max-w-7xl mx-auto px-4 min-h-[80vh]">
      
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Filter by role</option>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="text-left px-4 py-3">Image</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="px-4 py-3">
                    <img
                      src={user.image}
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
              ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-6 text-center text-gray-500">No users found</div>
        )}
      </div>
    </div>


    {isModalOpen && selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
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
