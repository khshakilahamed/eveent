import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsTelephoneForward } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { ImLocation } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import swal from 'sweetalert';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';

const ManageHalls = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [page, setPage] = useState(1);

    const numberOfElementPerPage = 3;

    const { data: hotels = [], refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/hotels', {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                // }
            })
            const data = await res.json();
            return data;
        }
    });

    const handleDelete = (id, email, name) => {
        // console.log(id, email);
        setIsDeleting(true);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this booking",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/hotel/${id}/${email}`, {
                        method: 'DELETE',
                        headers: {
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                toast.success(`You have deleted ${name}`, {
                                });
                                refetch();
                                setIsDeleting(false);
                            }
                        })
                } else {
                    swal("The booking data is safe!");
                    setIsDeleting(false);
                }
            });
    }

    const selectPageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage < Math.ceil(hotels?.length / numberOfElementPerPage))
            setPage(selectedPage);
    }

    // console.log(hotels);

    return (
        <div>
            <div className="overflow-x-auto w-full mt-10">
                <h2 className='pb-6 text-2xl'>
                    Manage Halls
                    {
                        hotels.length > 0 &&
                        <span className='text-sm ml-3'>[{hotels.length} founds]</span>
                    }
                </h2>
                <table className="table w-full">
                    <thead className='bg-slate-900 text-white'>
                        <tr>
                            {/* <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th> */}
                            <th>Hall</th>
                            <th>Address</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            hotels.slice(page * numberOfElementPerPage - numberOfElementPerPage, page * numberOfElementPerPage)?.map(hotel => <tr key={hotel?._id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
                                                <img src={`${hotel?.profileImg ? hotel.profileImg : "https://daisyui.com/tailwind-css-component-profile-3@56w.png"}`} alt="userPhoto" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="font-bold">{hotel?.name}</h2>
                                            <div className='flex items-center gap-3'>
                                                <HiOutlineMail size={22} />
                                                <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <BsTelephoneForward size={20} />
                                                <a href={`tel:${hotel.phone}`}>{hotel.phone}</a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex gap-3 items-center'>
                                        <ImLocation size={30} className='text-accent' />
                                        <div>
                                            {
                                                hotel?.location?.split(',')?.map((ln, i) => <p key={i}>{ln}</p>)
                                            }
                                        </div>
                                    </div>
                                </td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(hotel?._id, hotel?.email, hotel?.name)}
                                        className='btn btn-error btn-outline btn-sm'
                                        disabled={isDeleting}
                                    >
                                        <RiDeleteBin6Line size={22} />
                                    </button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
                {
                    hotels?.length > 0 && <div className='flex justify-center py-5'>
                        <div className="btn-group">
                            <button
                                onClick={() => selectPageHandler(page - 1)}
                                className="btn btn-sm btn-outline btn-accent"
                            >
                                <MdOutlineArrowBackIos size={20} />
                            </button>
                            {
                                [...Array(Math.ceil(hotels?.length / numberOfElementPerPage))]?.map((_, i) => {
                                    return <button
                                        key={i}
                                        onClick={() => selectPageHandler(i + 1)}
                                        className={`btn btn-sm btn-outline btn-accent ${page === i + 1 ? "btn-active" : ""}`}
                                    >
                                        {i + 1}
                                    </button>
                                })
                            }
                            <button
                                onClick={() => selectPageHandler(page + 1)}
                                className="btn btn-sm btn-outline btn-accent"
                            >
                                <MdOutlineArrowForwardIos size={20} />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ManageHalls;