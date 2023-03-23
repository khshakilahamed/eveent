import React, { useState } from 'react';
import bannerBg from './../../../assets/Images/Home/banner-bg.jpg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsList } from 'react-icons/bs';
import { BiCurrentLocation } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { format } from 'date-fns';
import './Banner.css';

const Banner = () => {
    const [getLocation, setGetLocation] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const locations = [
        'Nikunja 2, Dhaka',
        'Nikunja 1, Dhaka',
        'Nikunja-2 Bus stop, Dhaka',
        'Tangail',
        'Banani',
        'Gulshan',
        'Farmgate',
        'Mirpur',
        'Gabtoli',
        'Shabag',
    ];

    const handleOnchange = (e) => {
        setOpen(false);
        setSearchLocation(e.target.value);
    }

    const handleGetLocation = (location) => {
        setSearchLocation(location);
        setOpen(true);
    }

    // console.log(format(new Date(startDate), 'PP'));

    return (
        <div className='banner-bg'>
            <div className='flex items-center justify-center h-full'>
                <div className='flex flex-col gap-10 px-10 sm:px-20'>
                    <h2 className='text-white text-center text-3xl sm:text-4xl md:text-6xl font-extrabold' style={{fontFamily: 'lemon'}}>Search a venue for your function</h2>
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                        <div className='flex bg-white items-center p-2 rounded-lg w-full'>
                            <label htmlFor="type" className='pr-3 inline-block'>
                                <BsList className='text-black' />
                            </label>
                            <select name="" id="" className='outline-none w-full'>
                                <option disabled selected>Select Category</option>
                                <option value="wedding">Wedding</option>
                                <option value="birthday">Birthday</option>
                                <option value="engagement">Engagement</option>
                                <option value="party">Party</option>
                                <option value="photography">Photography</option>
                            </select>
                        </div>

                        <div className='relative'>
                            <div className='flex justify-between bg-white items-center p-2 rounded-lg'>
                                <input value={searchLocation} onChange={handleOnchange} type="text" className='outline-none pl-2 py-1' placeholder='location' name="location" id="location" />
                                <label htmlFor="location" className='pr-2'>
                                    <BiCurrentLocation />
                                </label>
                            </div>

                            {
                                !open && searchLocation && <span className='absolute bg-white mt-1 rounded-lg w-full p-2 h-auto max-h-32' style={{ overflowY: 'scroll', zIndex: 999 }}>
                                    <ul>
                                        {
                                            locations.filter(lt => lt.toLowerCase().includes(searchLocation.toLowerCase())).map((location, i) =>
                                                <li className='cursor-pointer' onClick={(e) => handleGetLocation(e.target.innerText)} key={i}>{location}</li>
                                            )
                                        }
                                    </ul>
                                </span>
                            }
                        </div>
                        <div className='flex bg-white items-center p-2 rounded-lg'>
                            {/* <input type="date" name="" id="" /> */}
                            <DatePicker
                                className='outline-none'
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="PP"
                                style={{ zIndex: 1 }}
                            />
                        </div>
                        <button className='btn btn-warning bg-primary px-16 '>
                            <FiSearch size={20} /> Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;