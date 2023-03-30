import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/shared/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';

const MyProfile = () => {
    const { user } = useAuth();

    const { data: userInfo, isLoading } = useQuery({
        queryKey: [user],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    // const [userInfo, isLoading] = useUser();

    if (isLoading) {
        return <Loading />
    }

    // console.log(userInfo);
    return (
        <div className='mt-6'>
            <div className='bg-neutral'>
                <h2 className='pl-5 pt-6 text-2xl'>Profile</h2>
                <div className="divider"></div>
                <div className='p-5 flex gap-5'>
                    <div>
                        <div className="avatar">
                            <div className="w-28 rounded-xl">
                                <img src={`${userInfo?.photoURL ? userInfo.photoURL : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}`} alt='' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="uploadProfileImg" className='btn btn-outline btn-accent btn-sm text-sm'>Upload Image</label>
                            <input className='hidden' type="file" name="" id="uploadProfileImg" />
                        </div>
                    </div>
                    <div>
                        <h2 className='border-black font-bold text-xl'>Name: {userInfo.name}</h2>
                        <p>Email: <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a></p>
                        {
                            user?.email && !userInfo.role ? <>
                                <Link to="/userSpecification"><button className="btn btn-success">Getting Started</button></Link>
                            </>
                                :
                                <>
                                    <p>Phone: <a href={`tel:+${userInfo.phone}`}>{userInfo.phone}</a></p>
                                    <p>Address: {userInfo.address}</p>
                                    <p>Upazila: {userInfo.upazila}</p>
                                    <p>District: {userInfo.district}</p>
                                    <p>Division: {userInfo.division}</p>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;