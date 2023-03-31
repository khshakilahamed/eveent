import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    return (
        <div className='w-full flex justify-center mt-10'>
            <h2>
                Something went wring. Please,
                <span
                    onClick={() => signOutUser(navigate)}
                    className='cursor-pointer mx-2 underline text-blue-600 hover:text-blue-900'
                >
                    Sign out
                </span>
                and re-login
            </h2>
        </div>
    );
};

export default ErrorPage;