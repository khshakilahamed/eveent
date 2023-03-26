import React from 'react';
import radissonBlue from './../../../assets/Images/Radisson-Blu.webp';
import { GoLocation } from 'react-icons/go';
import { AiOutlineStar } from 'react-icons/ai';
import { TbCurrencyTaka } from 'react-icons/tb';

const SearchProducts = ({ hotel }) => {
    const { name, price, capacity, profileImg, location, services } = hotel || {};
    // console.log(hotel)
    return (
        <div>
            <div className='md:flex bg-white mt-5 gap-2'>
                <div className='md:w-1/2 lg:w-1/3 xl:w-1/4'>
                    <img className='w-full h-full' src={profileImg} alt="" />
                </div>
                <div className='md:w-1/2 lg:w-2/3 xl:w-3/4 flex flex-col justify-between py-3 px-2'>
                    <div className='sm:grid md:block lg:grid grid-cols-2'>
                        <div className='w-full'>
                            <h2 className='font-bold text-xl'>{name}</h2>
                            <p className='flex items-center'>
                                <GoLocation className='text-accent' />
                                <span className='font-thin'>{location}</span>
                            </p>
                            <h3 className='mt-5 font-bold'>Capacity-{capacity} Person</h3>
                        </div>
                        <div className='sm:flex flex-col justify-around items-end mr-2'>
                            <div className='flex gap-1 my-3 lg:my-0'>
                                <AiOutlineStar />
                                <AiOutlineStar />
                                <AiOutlineStar />
                                <AiOutlineStar />
                                <AiOutlineStar />
                            </div>
                            <div className='flex items-center gap-1'>
                                <TbCurrencyTaka size={26} />
                                <h2 className='font-bold text-2xl sm:my-3 lg:my-0'>{price}</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='lg:flex items-end'>
                            <div className='mt-3 basis-9/12 xl:basis-5/6'>
                                <p>Include services</p>
                                <div className='flex flex-wrap gap-2'>
                                    {
                                        services?.map((service, i) => <p key={i} className='badge text-black bg-stone-200 p-3 mt-2 w-auto'>{service}</p>)
                                    }
                                </div>
                            </div>
                            <div className='mt-5 lg:ml-5 lg:mt-0 basis-3/12 xl:basis-1/6 '>
                                <button className='btn btn-accent text-white'>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchProducts;