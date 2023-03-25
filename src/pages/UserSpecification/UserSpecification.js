import React from 'react';
import asUser from './../../assets/Images/user-specification/user.png';
import asHotelAdministrator from './../../assets/Images/user-specification/administrator.png';
import { useNavigate } from 'react-router-dom';

const UserSpecification = () => {
    const navigate = useNavigate();

    return (
        <div className='max-w-[1400px] px-10 sm:px-20 mx-auto my-14'>
            <div className='sm:grid grid-cols-2 gap-10'>
                <div onClick={() => navigate('/asUser')} className='mt-3 sm:mt-0 border cursor-pointer hover:bg-sky-300 hover:ease-linear hover:duration-300'>
                    <h3 className='text-center text-xl font-bold my-3 hover:underline'>As User</h3>
                    <img className='w-full' src={asUser} alt="" />
                </div>
                <div className='mt-3 sm:mt-0 border cursor-pointer hover:bg-sky-300 hover:ease-linear hover:duration-300'>
                    <h3 className='text-center text-xl font-bold my-3 hover:underline'>As Hotel Administrator</h3>
                    <img className='w-full' src={asHotelAdministrator} alt="" />
                </div>
            </div>
        </div>
    );
};

export default UserSpecification;