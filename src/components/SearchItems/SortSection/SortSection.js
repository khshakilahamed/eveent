import React from 'react';

const SortSection = () => {
    return (
        <div className='bg-white p-3 lg:h-[300px] block sm:flex items-center justify-between mb-4 lg:block'>
            <h2 className='font-bold'>38 Hall found</h2>

            <div className='flex items-center lg:block lg:mt-5 '>
                <p className='sm:mr-5'>Short by</p>

                <select name="" id="" className='p-2 mt-2' style={{backgroundColor: "#F5F5F7"}}>
                    <option value="">Popularity</option>
                    <option value="">Capacity (low &gt; High)</option>
                    <option value="">Capacity (High &gt; Low)</option>
                    <option value="">Price (low &gt; High)</option>
                    <option value="">Price (High &gt; Low)</option>
                </select>
            </div>
        </div>
    );
};

export default SortSection;