import axios from 'axios'
import React, { useEffect, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import UserTable from './UserTable'

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
        setEditingUser(null);

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

  // const filteredUsers = React.useMemo(() => {
  //   const q = query.trim().toLowerCase()
  //   return users?.filter(u => {
  //     if (onlyActive && !u.active) return false
  //     if (!q) return true
  //     return (
  //       u.name?.toLowerCase().includes(q) ||
  //       u.email?.toLowerCase().includes(q) ||
  //       u.role?.toLowerCase().includes(q)
  //     )
  //   })
  // }, [query, onlyActive, users])

  return (
    <UserTable
      isLoading={isLoading}
      filteredUsers={users}
      query={query}
      setQuery={setQuery}
      onlyActive={onlyActive}
      setOnlyActive={setOnlyActive}
      editingUser={editingUser}
      setEditingUser={setEditingUser}
      editedUserData={editedUserData}
      handleEditFormChange={handleEditFormChange}
      handleUpdateUser={handleUpdateUser}
      isUpdating={isUpdating}
    />
  )
}

export default UserList
