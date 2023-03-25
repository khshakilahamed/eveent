import React from 'react';

const SortSection = ({ setSortQuery, total }) => {
    return (
        <div className='bg-white p-3 lg:h-[300px] block sm:flex items-center justify-between mb-4 lg:block'>
            <h2 className='font-bold'>{total} Hall found</h2>

            <div className='flex items-center lg:block lg:mt-5 '>
                <p className='sm:mr-5'>Short by</p>

                <select onClick={(e) => setSortQuery(e.target.value)} className='p-2 mt-2' style={{ backgroundColor: "#F5F5F7" }}>
                    <option value="" disabled selected>Select one</option>
                    {/* <option value="">Popularity</option> */}
                    <option value="capacityLowToHigh">Capacity (low &gt; High)</option>
                    <option value="capacityHighToLow">Capacity (High &gt; Low)</option>
                    <option value="priceLowToHigh">Price (low &gt; High)</option>
                    <option value="priceHighToLow">Price (High &gt; Low)</option>
                </select>
            </div>
        </div>
    );
};

export default SortSection;