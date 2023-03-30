import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/shared/Loading/Loading';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />
    }

    if (user?.email) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;