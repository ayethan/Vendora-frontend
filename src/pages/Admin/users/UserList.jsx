import axios from 'axios'
import React, { useEffect, useCallback, useState } from 'react'
import { toast } from 'react-toastify'

function UserList() {
  const [query, setQuery] = useState('')
  const [onlyActive, setOnlyActive] = useState(false)
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const [editedUserData, setEditedUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchAllUsers = useCallback(async (isMounted) =>{
    try {
      const response = await axios.get('/get-all-users', { withCredentials: true });
      if(isMounted){
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          console.error("Failed to fetch users:", response.data.message);
        }
      }
    } catch (error) {
      if(isMounted){
        console.error("There was an error fetching the users!", error.response?.data?.message || error.message);
      }


    }
    finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  });

  useEffect(() => {
    let isMounted = true;
    fetchAllUsers(isMounted);

    // 💡 Cleanup function: This runs when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (editingUser) {
      setEditedUserData({ ...editingUser });
    } else {
      setEditedUserData(null);
    }
  }, [editingUser]);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData(prev => ({ ...prev, [name]: value }));
  };


  const handleUpdateUser = async () => {
    if (!editedUserData || !editedUserData._id) return;
    setIsUpdating(true);
    try {
      const response = await axios.put(`/update-user/${editedUserData._id}`, editedUserData, { withCredentials: true });
      if (response.data.success) {
        toast.success('User updated successfully');
        setEditingUser(null); // Close the modal
        // Refresh the user list to show the updated data
        setUsers(prevUsers => prevUsers.map(user =>
          user._id === editedUserData._id ? { ...user, ...editedUserData } : user
        ));
      } else {
        toast.error(response.data.message || 'Failed to update user.');
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "An error occurred while updating the user.");
    } finally {
      setIsUpdating(false);
    }
  }

  const filteredUsers = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return users?.filter(u => {
      if (onlyActive && !u.active) return false
      if (!q) return true
      return (
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q)
      )
    })
  }, [query, onlyActive, users])

  return (
    <div className="h-screen p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User List</h1>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, email or role"
            className="border rounded px-3 py-2"
          />
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={onlyActive}
              onChange={e => setOnlyActive(e.target.checked)}
              className="form-checkbox"
            />
            <span>Only active</span>
          </label>
          <button
            onClick={() => { setQuery(''); setOnlyActive(false) }}
            className="px-3 py-2 bg-gray-200 rounded text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user,index) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" className="text-blue-600 mr-2 cursor-pointer" onClick={() => setEditingUser(user)}>Edit</button>
                    {editingUser && editedUserData && editingUser._id === user._id && (
                      <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Edit User</h2>
                            <button onClick={() => setEditingUser(null)} className="text-gray-500 hover:text-gray-800">&times;</button>
                          </div>
                          <form onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-4">
                              <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" id="name" value={editedUserData.name} onChange={handleEditFormChange} className="mt-1 p-2 border rounded-md w-full" />
                              </div>
                              <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" id="email" value={editedUserData.email} onChange={handleEditFormChange} className="mt-1 p-2 border rounded-md w-full" />
                              </div>
                              <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                <select name="role" id="role" value={editedUserData.role} onChange={handleEditFormChange} className="mt-1 p-2 border rounded-md w-full">
                                  <option value="">Select Role</option>
                                  <option value="General">General</option>
                                  <option value="Admin">Admin</option>
                                </select>
                              </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 bg-gray-200 rounded text-sm">
                                  Cancel
                                </button>
                                <button type="submit" onClick={handleUpdateUser} disabled={isUpdating} className="px-4 py-2 bg-blue-600 text120

-white rounded text-sm hover:bg-blue-700 disabled:bg-blue-300">
                                  {isUpdating ? 'Saving...' : 'Save Changes'}
                                </button>
                              </div>
                          </form>
                        </div>
                      </div>
                    )}
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList
