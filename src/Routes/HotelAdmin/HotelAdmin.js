import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/shared/Loading/Loading';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

const HotelAdmin = ({ children }) => {
    const { user, loading } = useAuth();
    const [userInfo, userInfoLoading] = useUser();
    const location = useLocation();


    if (loading || userInfoLoading) {
        return <Loading />
    }

    if (user?.email === userInfo?.email && userInfo?.role === 'hotelAdmin') {
        return children;
    }

    return <Navigate to='/' state={{ from: location }} replace></Navigate>;
};

export default HotelAdmin;