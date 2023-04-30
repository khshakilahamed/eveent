import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchProducts from '../../components/SearchItems/SearchProducts/SearchProducts';
import SearchQueryNav from '../../components/SearchItems/SearchQueryNav/SearchQueryNav';
import SortSection from '../../components/SearchItems/SortSection/SortSection';
import Loading from '../../components/shared/Loading/Loading';
import useAuth from '../../hooks/useAuth';
import BookingModal from '../../components/Modals/BookingModal';
import SearchModal from '../../components/Modals/SearchModal';

const SearchPage = () => {
    const [activeSearchModal, setActiveSearchModal] = useState(false);
    const [sortQuery, setSortQuery] = useState("");
    const [searchItem, setSearchItem] = useState("");
    const location = useLocation();
    const { category, formattedDate, searchLocation } = location?.state;
    // console.log(category, formattedDate, searchLocation);
    const [hotelDetails, setHotelDetails] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const pathname = useLocation().pathname.split('/')[1];

    const { data: hotels, isLoading } = useQuery({
        queryKey: ['hotels', searchLocation],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/hotels/search?location=${searchLocation}`);
            const data = await res.json();
            return data;
        }
    });

    const { data: userInfo } = useQuery({
        queryKey: [user],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading />
    }

    // const handleSearchItem = (data) => {
    //     setSearchItem(data.search);
    // }


    const transFormItems = () => {
        let sortedItems = hotels;

        if (sortQuery === "priceHighToLow") {
            sortedItems = sortedItems.sort((a, b) =>
                sortQuery === "priceHighToLow" ? b.price - a.price : a.price - b.price
            )
        }
        if (sortQuery === "priceLowToHigh") {
            sortedItems = sortedItems.sort((a, b) =>
                sortQuery === "priceLowToHigh" ? a.price - b.price : b.price - a.price
            )
        }
        if (sortQuery === "capacityHighToLow") {
            sortedItems = sortedItems.sort((a, b) =>
                sortQuery === "capacityHighToLow" ? b.capacity - a.capacity : a.capacity - b.capacity
            )
        }
        if (sortQuery === "capacityLowToHigh") {
            sortedItems = sortedItems.sort((a, b) =>
                sortQuery === "capacityLowToHigh" ? a.capacity - b.capacity : b.capacity - a.capacity
            )
        }

        if (searchItem) {
            sortedItems = sortedItems.filter(sortedItem => sortedItem.name.toLowerCase().includes(searchItem.toLowerCase()));
        }

        return sortedItems;
    }

    return (
        <div className='max-w-[1400px] px-10 sm:px-20 mx-auto my-14'>
            <div style={{ backgroundColor: "#F5F5F7" }}>
                <SearchQueryNav category={category} searchLocation={searchLocation} formattedDate={formattedDate} setActiveSearchModal={setActiveSearchModal} />

                <hr />

                <div className='p-3 lg:flex gap-4'>
                    <SortSection setSortQuery={setSortQuery} total={hotels.length} />
                    <div>
                        {
                            transFormItems().map((hotel, i) => <SearchProducts key={i} hotel={hotel} setHotelDetails={setHotelDetails} />)
                        }
                    </div>
                </div>
            </div>
            {
                // hotelDetails && <BookingModal hotelDetails={hotelDetails} user={user} userInfo={userInfo} setHotelDetails={setHotelDetails} />
                hotelDetails && (
                    !userInfo?.role ? navigate('/userSpecification') : <BookingModal hotelDetails={hotelDetails} user={user} userInfo={userInfo} setHotelDetails={setHotelDetails} />
                )
            }

            {/* <label htmlFor="searchModalBtn" className="btn">open modal</label> */}

            {
               activeSearchModal &&  <SearchModal setActiveSearchModal={setActiveSearchModal}/>
            }
        </div>
    );
};

export default SearchPage;