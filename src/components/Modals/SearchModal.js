import React, { useState } from 'react';
import locations from '../Locations/Locations';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { BsList } from 'react-icons/bs';
import { BiCurrentLocation } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';

const SearchModal = ({ setActiveSearchModal }) => {
    const [modifiedCategory, setModifiedCategory] = useState("");
    const [modifiedSearchLocation, setModifiedSearchLocation] = useState("");
    const [modifiedDate, setModifiedDate] = useState("");
    const [locationSugOpen, setLocationSugOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    const handleOnchange = (e) => {
        setLocationSugOpen(false);
        setModifiedSearchLocation(e.target.value);
    }

    const handleGetLocation = (location) => {
        setModifiedSearchLocation(location);
        setLocationSugOpen(true);
    }

    const handleCategory = (e) => {
        setModifiedCategory(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (modifiedCategory) {
            location.state.category = modifiedCategory;
        }
        if (modifiedSearchLocation) {
            location.state.searchLocation = modifiedSearchLocation;
        }
        if (modifiedDate) {
            location.state.formattedDate = format(new Date(modifiedDate), 'PP');
        }

        navigate('/search', { state: { ...location.state } });

        setActiveSearchModal(false)
    }

    return (
        <div>
            <input type="checkbox" id="searchModalBtn" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="searchModalBtn"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                        onClick={() => setActiveSearchModal(false)}
                    >✕</label>

                    <h3 className="text-lg font-bold my-3">Modify Search here</h3>

                    <form onSubmit={handleSearch} className='h-[370px] flex flex-col justify-between'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex bg-white items-center p-2 rounded-lg w-full border'>
                                <label htmlFor="list" className='pr-3 inline-block'>
                                    <BsList className='text-black cursor-pointer' />
                                </label>
                                <select onClick={handleCategory} name="" id="list" className='outline-none w-full cursor-pointer'>
                                    <option value="" disabled selected>Select Category</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="birthday">Birthday</option>
                                    <option value="engagement">Engagement</option>
                                    <option value="party">Party</option>
                                    <option value="photography">Photography</option>
                                </select>
                            </div>

                            <div className='flex bg-white items-center p-2 px-4 rounded-lg border w-full'>
                                <DatePicker
                                    id='date'
                                    placeholderText="Select date"
                                    minDate={new Date()}
                                    className='outline-none'
                                    selected={modifiedDate}
                                    onChange={(date) => setModifiedDate(date)}
                                    dateFormat="PP"
                                    style={{ zIndex: 1 }}
                                />
                                <label htmlFor="date">
                                    <AiOutlineCalendar size={24} className="cursor-pointer" />
                                </label>
                            </div>

                            <div className='relative'>
                                <div className='flex justify-between bg-white items-center p-2 rounded-lg border'>
                                    <input value={modifiedSearchLocation} onChange={handleOnchange} type="text" className='outline-none pl-2 py-1' placeholder='location' name="location" id="location" />
                                    <label htmlFor="location" className='pr-2 cursor-pointer'>
                                        <BiCurrentLocation />
                                    </label>
                                </div>

                                {
                                    !locationSugOpen && modifiedSearchLocation && <span className='absolute bg-white mt-1 rounded-lg w-full p-2 h-auto max-h-32' style={{ overflowY: 'scroll', zIndex: 999 }}>
                                        <ul>
                                            {
                                                locations.filter(lt => lt.toLowerCase().includes(modifiedSearchLocation.toLowerCase())).map((location, i) =>
                                                    <li className='cursor-pointer' onClick={(e) => handleGetLocation(e.target.innerText)} key={i}>{location}</li>
                                                )
                                            }
                                        </ul>
                                    </span>
                                }
                            </div>
                        </div>

                        <input
                            type="submit"
                            value="search"
                            className='btn btn-warning bg-primary px-16'
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;