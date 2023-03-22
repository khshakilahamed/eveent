import React from 'react';
import foodArea from './../../../assets/Images/Home/foodArea.jpeg';

const Offers = () => {
    return (
        <div className=' my-14'>
            <h2 className='font-bold text-2xl my-5'>Offers</h2>

            <div className='sm:flex gap-4 shadow-xl'>
                <img className='w-1/2 mx-auto sm:w-1/4' src={foodArea} alt="" />
                <div className='mt-5 text-center sm:text-left p-5 sm:w-3/4 flex flex-col justify-center'>
                    <h3 className='font-semibold'>Save 25% on your first booking</h3>
                    <p className=''>Grab the best deal based on your catagory, Book and make your event more easier</p>
                </div>
            </div>
        </div>
    );
};

export default Offers;