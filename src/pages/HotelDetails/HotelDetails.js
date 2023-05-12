import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Loading from '../../components/shared/Loading/Loading';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { TbCurrencyTaka } from 'react-icons/tb';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import BookingModal from '../../components/Modals/BookingModal';
import { toast } from 'react-hot-toast';

const HotelDetails = () => {
    const hotel = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);

    const { name, email, price, capacity, phone, profileImg, images, location, description, facilities, services, termsCondition, rating } = hotel || {};

    const { data: userInfo } = useQuery({
        queryKey: [user],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    if (hotel.length < 0) {
        return <Loading />
    }

    function adminBookingError(){
        toast.error("Admin could not able to booking", {id: 'adminBookingError'});
        setIsOpenBookingModal(false);
    }

    return (
        <div>
            <div className='max-w-[1400px] px-10 sm:px-20 mx-auto my-14'>
                <div>
                    <div className='sm:flex justify-between'>
                        <div>
                            <h2 className='font-bold text-xl'>{name}</h2>
                            <div>
                                <span>capacity-{capacity}</span>
                            </div>
                            <div className='relative'>
                                <div className='absolute -left-2 flex items-center'>
                                    <TbCurrencyTaka size={26} />
                                    <span className='font-bold text-2xl sm:my-3 lg:my-0'>{price}</span>
                                </div>
                            </div>

                        </div>
                        <div>
                            <label
                                onClick={() => setIsOpenBookingModal(true)}
                                htmlFor="bookingHallModalBtn"
                                className='btn btn-accent text-white'
                            >
                                Book Now
                            </label>
                            {/* <button className='btn btn-accent mt-10 sm:mt-0'>Book now</button> */}
                        </div>
                    </div>
                </div>
                {/* images  */}
                <div className='md:columns-2 gap-4 my-16'>
                    <PhotoProvider>
                        {
                            images.slice(0, 4).map((image, i) =>
                                <PhotoView key={i} src={image}>
                                    <img className="w-full mb-4 cursor-pointer" src={image} alt="" />
                                </PhotoView>
                            )
                        }
                    </PhotoProvider>
                </div>

                {/* description  */}
                <div className='my-8'>
                    <h2 className='font-bold text-xl'>{name}</h2>
                    <p>{description}</p>
                </div>

                {/* contact  */}

                <div className='my-8'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='font-bold text-xl'>Contact Info</h2>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} /> <a href={`mailto:${email}`}>{email}</a>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faPhone} /> <a href={`tel:${phone}`}>{phone}</a>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLocationDot} /> <span>{location}</span>
                        </div>
                    </div>
                </div>

                {/* Services  */}
                <div className='my-8'>
                    <h2 className='font-bold text-xl'>Services</h2>
                    <ul className='ml-5'>
                        {
                            services.map((service, i) => <li key={i} className="list-disc my-3">{service}</li>)
                        }
                    </ul>
                </div>

                {/* facilities  */}
                <div className='my-8'>
                    <h2 className='font-bold text-xl'>Facilities</h2>
                    <ul className='ml-5'>
                        {
                            facilities.map((facility, i) => <li key={i} className="list-disc my-3">{facility}</li>)
                        }
                    </ul>
                </div>

                {/* terms & conditions  */}
                <div className='my-8'>
                    <h2 className='font-bold text-xl'>Terms & Conditions</h2>
                    <ul className='ml-5'>
                        {
                            termsCondition.map((term, i) => <li key={i} className="list-disc my-3">{term}</li>)
                        }
                    </ul>
                </div>

                <div className='my-8'>
                    <h2 className='font-bold text-xl'>Reviews</h2>
                    <ul className='ml-5'>
                        <li className="text-red-800">Please, add review section</li>
                    </ul>
                </div>
            </div>

            {
                isOpenBookingModal && (
                    !userInfo?.role ? navigate('/userSpecification') : userInfo.role === 'admin' ? adminBookingError(): <BookingModal hotelDetails={hotel} user={user} userInfo={userInfo} setHotelDetails={setIsOpenBookingModal} />
                )
            }
        </div>
    );
};

export default HotelDetails;