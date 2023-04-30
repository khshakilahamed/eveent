import React from 'react';
import { BsList } from 'react-icons/bs';
import { BiCurrentLocation } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import "react-datepicker/dist/react-datepicker.css";

const SearchQueryNav = ({ category, searchLocation, formattedDate, setActiveSearchModal }) => {

    return (
        <div className='p-5 lg:flex justify-between'>
            <div className='sm:flex gap-8'>
                <div className='flex items-center gap-3'>
                    <BsList />
                    <label className='cursor-pointer' htmlFor="searchModalBtn" onClick={() => setActiveSearchModal(true)}>{category}</label>
                </div>
                <div className='flex items-center gap-3'>
                    <BiCurrentLocation />
                    <label className='cursor-pointer' htmlFor="searchModalBtn" onClick={() => setActiveSearchModal(true)}>{searchLocation}</label>
                </div>
                <div className='flex items-center gap-3'>
                    <AiOutlineCalendar />
                    <label className='cursor-pointer' htmlFor="searchModalBtn" onClick={() => setActiveSearchModal(true)}>{formattedDate}</label>
                </div>
            </div>
            <div>
                <label
                    className='btn btn-sm bg-primary text-white cursor-pointer'
                    htmlFor="searchModalBtn"
                    onClick={() => setActiveSearchModal(true)}
                >Modify Search</label>
            </div>
        </div>
    );
};

export default SearchQueryNav;