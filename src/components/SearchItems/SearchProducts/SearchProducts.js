import React from 'react';
import radissonBlue from './../../../assets/Images/Radisson-Blu.webp';
import { GoLocation } from 'react-icons/go';
import { AiOutlineStar } from 'react-icons/ai';
import { TbCurrencyTaka } from 'react-icons/tb';

const SearchProducts = () => {
    return (
        <div>
            <div className='md:flex bg-white mt-5'>
                <div className='md:w-1/2 lg:w-1/4'>
                    <img className='w-full h-full' src={radissonBlue} alt="" />
                </div>
                <div className='md:w-1/2 lg:w-3/4 flex flex-col justify-between py-3 px-2'>
                    <div className='sm:grid md:block lg:grid grid-cols-2'>
                        <div>
                            <h2 className='font-bold text-xl'>Radisson Blue</h2>
                            <p className='flex items-center'>
                                <GoLocation className='text-accent' />
                                <span className='font-thin'>Airport road, Dhaka-1212</span>
                            </p>
                            <h3 className='mt-5 font-bold'>Capacity-3200 Person</h3>
                        </div>
                        <div className='sm:flex flex-col justify-around'>
                            <div className='flex gap-1 my-3 lg:my-0'>
                                <AiOutlineStar />
                                <AiOutlineStar />
                                <AiOutlineStar />
                                <AiOutlineStar />
                                <AiOutlineStar />
                            </div>
                            <div className='flex items-center gap-1'>
                                <TbCurrencyTaka size={26}/>
                                <h2 className='font-bold text-2xl sm:my-3 lg:my-0'>480000</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='lg:flex items-center'>
                            <div>
                                <p>Include services</p>
                                <div className='lg:space-x-4 mt-1'>
                                    <p className='badge text-black bg-stone-200 p-3'>Catering</p>
                                    <p className='badge text-black bg-stone-200 p-3'>Decorator Service</p>
                                    <p className='badge text-black bg-stone-200 p-3'>Car Parking</p>
                                </div>
                            </div>
                            <div className='mt-5 lg:ml-5 lg:mt-0'>
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