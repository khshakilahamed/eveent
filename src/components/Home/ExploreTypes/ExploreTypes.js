import React from 'react';
import wedding from './../../../assets/Images/Home/wedding.jpeg';
import birthday from './../../../assets/Images/Home/birthday venues(2).jpg';
import corporateEvent from './../../../assets/Images/Home/Corporate-Event-1.webp';
import culturalEvent from './../../../assets/Images/Home/cultural-event.jpg';
import sportsVenue from './../../../assets/Images/Home/sports-venue.jpg';

const ExploreTypes = () => {
    const exploreTypesContents = [
        {
            id: 1,
            name: 'Wedding',
            image: `${wedding}`,
            height: '173px',
        },
        {
            id: 2,
            name: 'Birthday ',
            image: `${birthday}`,
            height: '173px',
        },
        {
            id: 3,
            name: 'Corporate Event',
            image: `${corporateEvent}`,
            height: '173px',
        },
        {
            id: 4,
            name: 'Cultural Event',
            image: `${culturalEvent}`,
            height: '173px',
        },
        {
            id: 5,
            name: 'Sports Venue',
            image: `${sportsVenue}`,
            height: '173px',
        },
    ]
    return (
        <div>
            <h2 className='font-bold text-2xl my-5'>Explore by your function type</h2>

            <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                {
                    exploreTypesContents.map(content => <div key={content.id}>
                        <div>
                            <img style={{ height: '173px' }} src={content.image} alt="" />
                        </div>
                        <h3 className='font-semibold'>{content.name}</h3>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ExploreTypes;