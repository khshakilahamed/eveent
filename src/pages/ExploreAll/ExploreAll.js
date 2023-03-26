import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SearchProducts from '../../components/SearchItems/SearchProducts/SearchProducts';
import SearchQueryNav from '../../components/SearchItems/SearchQueryNav/SearchQueryNav';
import SortSection from '../../components/SearchItems/SortSection/SortSection';
import Loading from '../../components/shared/Loading/Loading';

const ExploreAll = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [sortQuery, setSortQuery] = useState("");
    const [searchItem, setSearchItem] = useState("");

    const { data: hotels, isLoading } = useQuery({
        queryKey: ['hotels'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/hotels');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading/>
    }


    const handleSearchItem = (data) => {
        setSearchItem(data.search);
    }

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
                <div className='p-3 flex justify-end'>
                    <form onSubmit={handleSubmit(handleSearchItem)}>
                        <input
                            className='w-[250px] input input-bordered input-accent max-w-xs'
                            type="text" placeholder='Search by name'
                            {...register("search")}
                        />
                        <input className='btn btn-accent ml-1' type="submit" value="search" />
                    </form>
                </div>
                <hr />
                <div className='p-3 lg:flex gap-4'>
                    <SortSection setSortQuery={setSortQuery} total={hotels.length}  />
                    <div>
                        {
                            transFormItems().map(hotel => (
                                <SearchProducts hotel={hotel} />
                            ))
                        }
                    </div>
                    {/* <SearchProducts /> */}
                </div>
            </div>
        </div>
    );
};

export default ExploreAll;