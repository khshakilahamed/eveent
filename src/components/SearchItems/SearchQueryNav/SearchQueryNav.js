import React, { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { BiCurrentLocation } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchQueryNav = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className='p-5 lg:flex justify-between'>
            <div className='sm:flex gap-8'>
                <div className='flex items-center gap-3'>
                    <BsList />
                    <span>Wedding</span>
                </div>
                <div className='flex items-center gap-3'>
                    <BiCurrentLocation />
                    <span>Khilkhet, Dhaka</span>
                </div>
                <div className='flex items-center gap-3'>
                    <AiOutlineCalendar />
                    <DatePicker
                        disabled
                        className='outline-none bg-none'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="PP"
                        style={{ zIndex: 1 }}
                    />
                </div>
            </div>
            <div>
                <button className='btn btn-sm bg-primary text-white'>Modify Search</button>
            </div>
        </div>
    );
};

export default SearchQueryNav;