import React from 'react';
import Contact from '../../components/Contact/Contact';
import Banner from '../../components/Home/Banner/Banner';
import ExploreTypes from '../../components/Home/ExploreTypes/ExploreTypes';
import Offers from '../../components/Home/Offers/Offers';

const Home = () => {
    return (
        <div >
            <Banner></Banner>

            <div className='max-w-[1400px] px-20 mx-auto my-14'>
                <ExploreTypes></ExploreTypes>
                <Offers />
                <Contact />
            </div>
        </div>
    );
};

export default Home;