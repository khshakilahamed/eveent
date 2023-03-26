import React, { useState } from 'react';
import bannerBg from './../../../assets/Images/Home/banner-bg.jpg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsList } from 'react-icons/bs';
import { BiCurrentLocation } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { format } from 'date-fns';
import './Banner.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const locations = [
    'Dhaka',
    'Barisal',
    'Rangpur',
    'Savar',
    'Ashulia',
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

const Banner = () => {
    const [category, setCategory] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [date, setDate] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    const handleOnchange = (e) => {
        setOpen(false);
        setSearchLocation(e.target.value);
    }

    const handleGetLocation = (location) => {
        setSearchLocation(location);
        setOpen(true);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (!category) {
            return toast.error("Please, select category!");
        }
        if (!searchLocation) {
            return toast.error("Please, select location!");
        }
        if (!date) {
            return toast.error("Please, select date!");
        }
        const formattedDate = format(new Date(date), 'PP');

        navigate('/search', {state: { category, formattedDate, searchLocation }})

        console.log(category, formattedDate, searchLocation);
    }


    return (
        <div className='banner-bg'>
            <div className='flex items-center justify-center h-full'>
                <div className='flex flex-col gap-10 px-10 sm:px-20'>
                    <h2 className='text-white text-center text-3xl sm:text-4xl md:text-6xl font-extrabold' style={{ fontFamily: 'lemon' }}>Search a venue for your function</h2>
                    <form onSubmit={handleSearch} className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                        <div className='flex bg-white items-center p-2 rounded-lg w-full'>
                            <label htmlFor="type" className='pr-3 inline-block'>
                                <BsList className='text-black' />
                            </label>
                            <select onClick={handleCategory} required name="" id="" className='outline-none w-full cursor-pointer'>
                                <option value="" disabled selected>Select Category</option>
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
                        <div className='flex bg-white items-center p-2 px-4 rounded-lg'>
                            {/* <input type="date" name="" id="" /> */}
                            <DatePicker
                                id='date'
                                placeholderText="Select date"
                                minDate={new Date()}
                                className='outline-none'
                                selected={date}
                                onChange={(date) => setDate(new Date())}
                                dateFormat="PP"
                                style={{ zIndex: 1 }}
                            />
                            <label htmlFor="date">
                                <AiOutlineCalendar size={24} className="cursor-pointer" />
                            </label>
                        </div>
                        <input type="submit" value="search" className='btn btn-warning bg-primary px-16 '>
                            {/* <FiSearch size={20} /> Search */}
                        </input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;