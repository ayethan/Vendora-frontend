import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user, status } = useSelector((state) => state.user);
    console.log("AdminRoute - user:", user, "status:", status, "isAdmin:", user?.role === 'Admin'); // Debug log
    const isAdmin = user?.role === 'Admin';

    if (status === 'loading') {
        return (
            <div className='flex justify-center items-center w-full h-screen'>
                Loading admin route...
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
