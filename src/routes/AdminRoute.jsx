import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const user = useSelector((state) => state.user.user);
    const isAdmin = user?.role === 'Admin';

    if (!isAdmin) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
