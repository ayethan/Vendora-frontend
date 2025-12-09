import React from 'react'

function UserTable({
  isLoading,
  filteredUsers,
  query,
  setQuery,
  onlyActive,
  setOnlyActive,
  editedUserData,
  editingUser,
  setEditingUser,
  handleEditFormChange,
  handleUpdateUser,
  isUpdating

}) {
  return (
    <div className="p-6">
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

      <div className="overflow-x-auto bg-white rounded shadow">
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

export default UserTable
