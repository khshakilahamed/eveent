import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert';
import Loading from '../../../components/shared/Loading/Loading';
import Pagination from '../../../components/shared/Pagination/Pagination';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useAuth from '../../../hooks/useAuth';

const AllUsers = () => {
    const [page, setPage] = useState(1);
    const [searchingValue, setSearchingValue] = useState("");

    const numberOfElementPerPage = 5;

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading />
    }

    const handleMakeAdmin = (id, email) => {
        swal({
            title: "Are you sure?",
            text: "Once make admin, he/she will get all access",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/user/makeAdmin/${id}/${email}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged && data.modifiedCount) {
                                toast.success("Admin created!");
                                refetch();
                            }
                            // swal("Poof! Your imaginary file has been deleted!", {
                            //     icon: "success",
                            // });
                        })
                } else {
                    swal("See you soon!");
                    // toast("You can try later");
                }
            });
    }

    const searchUsers = () => {
        let transformUsers = users || [];
        transformUsers = transformUsers.filter(user => user.email.toLowerCase().includes(searchingValue.toLowerCase()));

        return transformUsers;
    }

    const selectPageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= Math.ceil(users?.length / numberOfElementPerPage))
            setPage(selectedPage);
    }



    return (
        <div>
            <div className="overflow-x-auto w-full mt-10">
                <div className='md:flex items-center justify-between'>
                    <h2 className='pb-6 text-2xl'>
                        All Users
                        {
                            users.length > 0 &&
                            <span className='text-sm ml-3'>[{users.length} founds]</span>
                        }
                    </h2>
                    <div>
                        <div className="form-control">
                            <div className="input-group">
                                <input
                                    onChange={(e) => setSearchingValue(e.target.value)}
                                    type="text" placeholder="Search by email" className="input input-bordered"
                                />
                                <button onClick={searchUsers} className="btn btn-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 && searchUsers().length > 0 && (
                                searchUsers()?.slice(page * numberOfElementPerPage - numberOfElementPerPage, page * numberOfElementPerPage).map(user => <tr key={user?._id}>
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
                                        <div className='flex flex-col gap-3'>
                                            {/* <div className='text-center'>
                                                <button
                                                    onClick={() => handleDeleteUser(user?._id, user?.email)}
                                                    className='btn btn-error btn-outline btn-sm'>
                                                    <RiDeleteBin6Line size={22} />
                                                </button>
                                            </div> */}
                                            <button onClick={() => handleMakeAdmin(user?._id, user?.email)} className="btn btn-accent btn-xs">Make Admin</button>
                                        </div>
                                    </th>
                                </tr>)
                            )
                        }

                    </tbody>

                </table>

                <Pagination
                    collectionArray={users}
                    selectPageHandler={selectPageHandler}
                    page={page}
                    numberOfElementPerPage={numberOfElementPerPage}
                />
            </div>
        </div>
    );
};

export default AllUsers;