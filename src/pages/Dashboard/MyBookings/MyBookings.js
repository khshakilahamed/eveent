import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbCurrencyTaka } from 'react-icons/tb';
import { ImCancelCircle, ImLocation } from 'react-icons/im';
import { Link } from 'react-router-dom';
import Loading from '../../../components/shared/Loading/Loading';
import useAuth from '../../../hooks/useAuth';
import { BsTelephoneForward } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';

const MyBookings = () => {
    const { user } = useAuth();
    const { data: bookings, isLoading, } = useQuery({
        queryKey: ["bookings", user],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings/${user?.email}`, {
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

    // console.log(bookings);

    return (
        <div>
            <div className="overflow-x-auto w-full mt-10">
                <h2 className='pb-6 text-2xl'>All Bookings</h2>
                <table className="table w-full">
                    <thead className='bg-slate-900 text-white'>
                        <tr>
                            {/* <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th> */}
                            <th>Hall</th>
                            <th>Contact</th>
                            <th>Price</th>
                            <th>Payment</th>
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
                                                        <Link to={`/details/${booking.hotelId}`}>
                                                            <img src={`${booking?.hotelProfileImg ? booking.hotelProfileImg : "https://www.avantixlearning.ca/wp-content/uploads/2022/10/delete-page-page-in-word-featured.png"}`} alt="userPhoto" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Link to={`/details/${booking.hotelId}`}>
                                                        <h2 className="font-bold">{booking?.hotelName}</h2>
                                                    </Link>
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
                                            <div className='flex items-center gap-3'>
                                                <ImLocation size={22} />
                                                <div>
                                                    {
                                                        booking?.hotelLocation?.split(",")?.map((location, i) =>
                                                            <>
                                                                <p key={i}>{location}</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex items-center'>
                                                <TbCurrencyTaka />
                                                <span className='text-lg font-bold'>{booking.price}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <button className='btn btn-sm btn-accent'>Pay</button>
                                        </td>
                                        <th>
                                            <div className='flex flex-col gap-3'>
                                                <button className='btn btn-success btn-outline btn-sm'>
                                                    <ImCancelCircle size={22} />
                                                </button>
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

export default MyBookings;