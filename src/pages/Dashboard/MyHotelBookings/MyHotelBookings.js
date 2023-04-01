import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BsTelephoneForward } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { ImCancelCircle, ImLocation } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Loading from '../../../components/shared/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import Pagination from '../../../components/shared/Pagination/Pagination';
import { useState } from 'react';

const MyHotelBookings = () => {
    const { user } = useAuth();
    const [searchingValue, setSearchingValue] = useState("");
    const [page, setPage] = useState(1);

    const numberOfElementPerPage = 5;


    const { data: bookings = [], isLoading } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/hotel/bookings/${user?.email}`, {
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

    const searchBookings = () => {
        let transformHotels = bookings || [];
        transformHotels = transformHotels.filter(booking => booking.name.toLowerCase().includes(searchingValue.toLowerCase()));

        return transformHotels;
    }

    const selectPageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= Math.ceil(searchBookings()?.length / numberOfElementPerPage))
            setPage(selectedPage)
    }


    return (
        <div>
            <div className="overflow-x-auto w-full mt-10">
                <div className='md:flex items-center justify-between'>
                    <h2 className='pb-6 text-2xl'>
                        Hotel Bookings
                        {
                            bookings?.length > 0 &&
                            <span className='text-sm ml-3'>[{bookings?.length} founds]</span>
                        }
                    </h2>
                    <div>
                        <div className="form-control">
                            <div className="input-group">
                                <input
                                    onChange={(e) => setSearchingValue(e.target.value)}
                                    type="text" placeholder="Search by customer name" className="input input-bordered"
                                />
                                <button onClick={searchBookings} className="btn btn-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table w-full">
                    <thead className='bg-slate-900 text-white'>
                        <tr>
                            <th>Hall</th>
                            <th>Contact</th>
                            <th>Price</th>
                            <th>Event Date</th>
                            <th>Payment <br /> Status</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchBookings()?.length > 0 ? <>
                                {
                                    searchBookings().slice(page * numberOfElementPerPage - numberOfElementPerPage, page * numberOfElementPerPage).map(booking => <tr key={booking?._id}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`${booking?.photoURL ? booking.photoURL : "https://www.avantixlearning.ca/wp-content/uploads/2022/10/delete-page-page-in-word-featured.png"}`} alt="userPhoto" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="font-bold">{booking?.name}</h2>
                                                    <span className="text-sm opacity-50">{booking?.date}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex items-center gap-3'>
                                                <HiOutlineMail size={22} />
                                                <a href={`mailto:${booking.hotelEmail}`}>{booking.hotelEmail}</a>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <BsTelephoneForward size={20} />
                                                <a href={`tel:${booking.hotelPhone}`}>{booking.hotelPhone}</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex items-center'>
                                                <TbCurrencyTaka />
                                                <span className='text-lg font-bold'>{booking.price}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{booking?.date}</p>
                                        </td>
                                        <td>
                                            <p
                                                className={`${booking?.paymentStatus ? "text-accent" : "text-warning"}`}
                                            >
                                                {booking?.paymentStatus ? "Paid" : "Unpaid"}
                                            </p>
                                        </td>
                                        <th>
                                            <div className='flex flex-col gap-3'>
                                                {/* <button className='btn btn-success btn-outline btn-sm'>
                                                    <ImCancelCircle size={22} />
                                                </button> */}
                                                <button className='btn btn-error btn-outline btn-sm'>
                                                    <RiDeleteBin6Line size={22} />
                                                </button>
                                            </div>
                                        </th>
                                    </tr>)
                                }
                            </>
                                :
                                <p className='text-center text-2xl'>You don't have any booking</p>
                        }
                    </tbody>

                </table>
                <Pagination
                    collectionArray={searchBookings()}
                    selectPageHandler={selectPageHandler}
                    page={page}
                    numberOfElementPerPage={numberOfElementPerPage}
                />
            </div>
        </div>
    );
};

export default MyHotelBookings;