import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephoneForward } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FcApproval } from 'react-icons/fc';
import Loading from '../../../components/shared/Loading/Loading';
import { useState } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Pagination from '../../../components/shared/Pagination/Pagination';
const copy = require('clipboard-copy');

const AllBookings = () => {
    const [searchBy, setSearchBy] = useState("User Name");
    const [searchingValue, setSearchingValue] = useState("");
    const [page, setPage] = useState(1);

    const numberOfElementPerPage = 2;

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/bookings', {
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
    };

    const handleDelete = (id, hotelName) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this booking",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/booking/${id}`, {
                        method: "DELETE",
                        // headers: {
                        //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                        // }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                swal(`You have deleted ${hotelName}`, {
                                    icon: "success",
                                });
                                refetch();
                            }
                        })
                } else {
                    swal("The booking data is safe!");
                }
            });
    }

    const searchBooking = () => {
        let transformBookings = bookings || [];

        if (searchBy === "") {
            return toast.error("Please, select type(searching method)");
        }

        if (transformBookings.length !== 0 && searchBy === 'User Name') {
            transformBookings = transformBookings?.filter(booking => booking.name.toLowerCase().includes(searchingValue.toLocaleLowerCase()));
        }
        if (transformBookings.length !== 0 && searchBy === 'Hall Name') {
            transformBookings = transformBookings?.filter(booking => booking.hotelName.toLowerCase().includes(searchingValue.toLocaleLowerCase()));
        }

        return transformBookings;
    }

    const handleCopy = (data) => {
        copy(data);
        toast.success(`copied ${data}`)
    }

    const selectPageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= Math.ceil(searchBooking()?.length / numberOfElementPerPage))
            setPage(selectedPage);
    }

    // console.log(bookings);
    return (
        <div>
            <div className='md:flex items-center justify-between'>
                <h2 className='pb-6 text-2xl'>
                    All Bookings
                    {
                        bookings.length > 0 &&
                        <span className='text-sm ml-3'>[{bookings.length} founds]</span>
                    }
                </h2>
                <div>
                    <div>
                        <select onClick={(e) => setSearchBy(e.target.value)} className="select select-bordered select-xs w-full max-w-xs">
                            <option disabled>Search By</option>
                            <option selected value="User Name">User Name</option>
                            <option value="Hall Name">Hall Name</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <div className="input-group">
                            <input
                                onChange={(e) => setSearchingValue(e.target.value)}
                                type="text"
                                placeholder={`search by ${searchBy}`}
                                className="input input-bordered"
                            />
                            <button onClick={searchBooking} className="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto w-full mt-10">
                <table className="table w-full">
                    <thead className='bg-slate-900 text-white'>
                        <tr>
                            <th>Hall Info</th>
                            <th>Customer Info</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.length > 0 && searchBooking()?.length > 0 ?
                                <>
                                    {
                                        searchBooking()?.slice(page * numberOfElementPerPage - numberOfElementPerPage, page * numberOfElementPerPage).map(booking => <tr key={booking?._id}>
                                            <td>
                                                <div>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <Link to={`/details/${booking.hotelId}`}>
                                                                    <img src={`${booking?.hotelProfileImg ? booking.hotelProfileImg : "https://www.avantixlearning.ca/wp-content/uploads/2022/10/delete-page-page-in-word-featured.png"}`} alt="hotel_profile_image" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Link to={`/details/${booking.hotelId}`}>
                                                                <h2 className="font-bold">{booking?.hotelName}</h2>
                                                            </Link>
                                                            <p className="text-sm opacity-50">{booking?.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className='mt-4 flex flex-col gap-3'>
                                                        <div className='flex items-center'>
                                                            <TbCurrencyTaka />
                                                            <span onClick={() => handleCopy(booking?.price)} className='text-lg font-bold cursor-copy'>{booking.price}</span>
                                                        </div>
                                                        <div className='flex items-center gap-4'>
                                                            <HiOutlineMail size={22} />
                                                            <a href={`mailto:${booking.hotelEmail}`}>{booking.hotelEmail}</a>
                                                        </div>
                                                        <div className='flex items-center gap-4'>
                                                            <BsTelephoneForward size={20} />
                                                            <a href={`tel:${booking.hotelPhone}`}>{booking.hotelPhone}</a>
                                                        </div>
                                                        <div className='flex gap-4'>
                                                            <ImLocation size={22} />
                                                            <div>{booking?.hotelLocation?.split(",")?.map((location, i) => <p key={i}>{location}</p>)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='mt-0'>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={`${booking?.photoURL ? booking.photoURL : "https://www.whitechapelgallery.org/wp-content/uploads/2020/07/blank-head-profile-pic-for-a-man.jpg"}`} alt="userPhoto" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h2 className="font-bold">{booking?.name}</h2>
                                                            <p className="text-sm opacity-50">{booking?.date}</p>
                                                        </div>

                                                    </div>
                                                    <div className='mt-4 flex flex-col gap-3'>
                                                        <div>
                                                            <h2
                                                                onClick={() => handleCopy(booking?._id)}
                                                                className="cursor-copy"
                                                            >
                                                                Booking Id: {booking._id}
                                                            </h2>
                                                        </div>
                                                        <div className='flex items-center gap-4'>
                                                            <HiOutlineMail size={22} />
                                                            <a href={`mailto:${booking.email}`}>{booking.email}</a>
                                                        </div>
                                                        <div>
                                                            {
                                                                booking.phone &&
                                                                <div className='flex items-center gap-4'>
                                                                    <BsTelephoneForward size={20} />
                                                                    <a href={`tel:${booking.phone}`}>{booking.phone}</a>
                                                                </div>
                                                            }
                                                            {
                                                                booking?.mobile &&
                                                                <div className='flex items-center gap-4'>
                                                                    <BsTelephoneForward size={20} />
                                                                    <a href={`tel:${booking.mobile}`}>{booking.mobile}</a>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className='flex gap-4'>
                                                            <ImLocation size={22} />
                                                            <div>
                                                                <p>{booking.address}</p>
                                                                <p>{booking.district}</p>
                                                                <p>{booking.division}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='badge badge-accent'>{booking?.status ? booking.status : 'Not yet'}</p>
                                            </td>
                                            <td>
                                                <div className='flex flex-col gap-3'>
                                                    <button className='btn btn-success btn-outline btn-sm'>
                                                        <FcApproval size={22} />
                                                    </button>
                                                    <button onClick={() => handleDelete(booking?._id, booking?.hotelName)} className='btn btn-error btn-outline btn-sm'>
                                                        <RiDeleteBin6Line size={22} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>)
                                    }
                                </> : <p className='text-center'>There is no booking yet</p>
                        }
                    </tbody>
                </table>
            </div>

            <Pagination
                collectionArray={searchBooking()}
                selectPageHandler={selectPageHandler}
                page={page}
                numberOfElementPerPage={numberOfElementPerPage}
            />
        </div>
    );
};

export default AllBookings;