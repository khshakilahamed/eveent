import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../components/shared/Loading/Loading';

const AllUsers = () => {
    const { data: users, isLoading, } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users')
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading />
    }

    console.log(users);

    return (
        <div>
            <div className="overflow-x-auto w-full mt-10">
                <table className="table w-full">
                    <thead className='bg-slate-900 text-white'>
                        <tr>
                            {/* <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th> */}
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <tr key={user?._id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={`${user?.photoURL ? user.photoURL : "https://daisyui.com/tailwind-css-component-profile-3@56w.png"}`} alt="userPhoto" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.name}</div>
                                            <div className="text-sm opacity-50">{user?.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                    <div className="text-sm opacity-50">{user?.district}</div>
                                </td>
                                <td>
                                    <a href={`tel:${user.phone}`}>{user.phone}</a>
                                </td>
                                <td>
                                    {user.role}
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;