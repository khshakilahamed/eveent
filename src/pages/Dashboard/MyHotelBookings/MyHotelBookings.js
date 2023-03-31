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

const MyHotelBookings = () => {
    const { user } = useAuth();

    const { data: bookings, isLoading } = useQuery({
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



    return (
        <div>
            <div className="overflow-x-auto w-full mt-10">
                <h2 className='pb-6 text-2xl'>Hotel Bookings</h2>
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
                            bookings?.length > 0 ? <>
                                {
                                    bookings.map(booking => <tr key={booking?._id}>
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
            </div>
        </div>
    );
};

export default MyHotelBookings;