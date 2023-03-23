import React from 'react';
import Contact from '../../components/Contact/Contact';
import Banner from '../../components/Home/Banner/Banner';
import ExploreTypes from '../../components/Home/ExploreTypes/ExploreTypes';
import Offers from '../../components/Home/Offers/Offers';
import Services from '../../components/Services/Services';

const Home = () => {
    return (
        <div >
            <Banner></Banner>

            <div className='max-w-[1400px] px-10 sm:px-20 mx-auto my-14'>
                <ExploreTypes></ExploreTypes>
                <Offers />
                <Services/>
                <Contact />
            </div>
        </div>
    );
};

export default Home;