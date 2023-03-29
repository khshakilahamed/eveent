import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { TbCurrencyTaka } from 'react-icons/tb';
import { FaRegAddressCard } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { AiOutlineCalendar } from 'react-icons/ai';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

const BookingModal = ({ hotelDetails, user, userInfo, setHotelDetails }) => {
    const [loading, setLoading] = useState(false);
    const { _id, name, price, capacity, profileImg, location, phone: hotelPhone, email: hotelEmail } = hotelDetails || {};
    const { district, division, address, phone, _id: userId } = userInfo || {};
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [date, setDate] = useState(new Date());

    const handleBookingInfo = (data) => {
        const bookingInfo = {
            hotelId: _id,
            hotelName: name,
            hotelProfileImg: profileImg,
            hotelPhone,
            hotelEmail,
            price,
            hotelLocation: location,
            capacity,
            ...data,
            userId,
            email: user?.email,
            phone,
            district,
            division,
            address,
            bookingTime: new Date(),
            date: format(new Date(date), 'PP'),
        };

        setLoading(true);
        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Successfully booked");
                    setLoading(false);
                    setHotelDetails(null);
                    console.log(data)
                }
                else {
                    toast.error(data.message);
                    setLoading(false);
                }
            })
    };



    return (
        <div>
            <input type="checkbox" id="bookingHallModalBtn" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="bookingHallModalBtn" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className='flex gap-4 items-start'>
                        <Link to={`/details/${_id}`}>
                            <img className='w-16 h-16' src={profileImg} alt="" />
                        </Link>
                        <div>
                            <Link to={`/details/${_id}`}>
                                <h3 className="text-lg hover:underline">{name}</h3>
                            </Link>
                            <div className='flex items-center'>
                                <TbCurrencyTaka />
                                <span className='font-bold text-xl'>{price}</span>
                            </div>
                        </div>
                    </div>
                    <div className="divider">Fill Booking Info</div>
                    <div className='w-full flex justify-center mt-5'>
                        <form onSubmit={handleSubmit(handleBookingInfo)}>
                            <div className='border rounded-lg flex items-center p-2 w-96'>
                                <label htmlFor="name">
                                    <FaUserAlt className='mx-2 mr-5 cursor-pointer' />
                                </label>
                                <input
                                    className='w-full outline-none'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    {...register("name", { required: "Name is required" })}
                                    aria-invalid={errors.name ? "true" : "false"}
                                />
                            </div>
                            {errors.name && <p role="alert" className='text-red-500'>{errors.name?.message}</p>}

                            <div className='border rounded-lg flex items-center p-2 w-96 mt-5'>
                                <label htmlFor="email">
                                    <HiOutlineMail className='mx-2 mr-5 cursor-pointer' />
                                </label>
                                <input
                                    value={user?.email}
                                    className='w-full outline-none cursor-not-allowed'
                                    type='email'
                                    id='email'
                                    placeholder='Email'
                                    disabled
                                />
                            </div>
                            <div className='border rounded-lg flex items-center p-2 w-96 mt-5'>
                                <label htmlFor="date">
                                    <AiOutlineCalendar size={24} className="cursor-pointer mr-5" />
                                </label>
                                <DatePicker
                                    id='date'
                                    placeholderText="Select date"
                                    minDate={new Date()}
                                    className='w-full outline-none cursor-pointer'
                                    selected={date}
                                    onChange={(date) => setDate(date)}
                                    dateFormat="PP"
                                    style={{ zIndex: 1 }}
                                />
                            </div>

                            <div className='border rounded-lg flex items-center p-2 w-96 mt-5'>
                                <label htmlFor="address">
                                    <FaRegAddressCard className='mx-2 mr-5 cursor-pointer' />
                                </label>
                                <input
                                    value={`${address?.length > 20 ? address.slice(0, 15) : address}, ${district}, ${division}`}
                                    className='w-full outline-none cursor-not-allowed'
                                    type='text'
                                    id='address'
                                    placeholder='Address'
                                    disabled
                                />
                            </div>

                            <div className='border rounded-lg flex items-center p-2 w-96 mt-5'>
                                <PhoneInput
                                    value={phone}
                                    disabled
                                    className='w-full outline-none cursor-not-allowed'
                                    id='phone'
                                    country="BD"
                                    placeholder='Alternative Mobile Number'
                                    {...register("mobile")}
                                    aria-invalid={errors.mobile ? "true" : "false"}
                                />
                            </div>
                            <div className='border rounded-lg flex items-center p-2 w-96 mt-5'>
                                <PhoneInput
                                    className='w-full outline-none'
                                    id='phone'
                                    country="BD"
                                    placeholder='Alternative Mobile Number'
                                    {...register("mobile")}
                                    aria-invalid={errors.mobile ? "true" : "false"}
                                />
                            </div>

                            <div className='mt-5 text-center w-96'>
                                <input className='btn w-full bg-accent text-white' type="submit" value={loading ? "processing..." : "Submit"} disabled={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;