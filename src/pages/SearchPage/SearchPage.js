import React from 'react';
import SearchProducts from '../../components/SearchItems/SearchProducts/SearchProducts';
import SearchQueryNav from '../../components/SearchItems/SearchQueryNav/SearchQueryNav';
import SortSection from '../../components/SearchItems/SortSection/SortSection';

const SearchPage = () => {
    return (
        <div className='max-w-[1400px] px-10 sm:px-20 mx-auto my-14'>
            <div style={{backgroundColor: "#F5F5F7"}}>
                <SearchQueryNav/>
                <hr />
                <div className='p-3 lg:flex gap-4'>
                    <SortSection/>
                    <SearchProducts/>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;