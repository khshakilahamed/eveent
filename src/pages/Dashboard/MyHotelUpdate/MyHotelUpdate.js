import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../components/shared/Loading/Loading';

const MyHotelUpdate = () => {
    
    const { data: myHotel, isLoading } = useQuery({
        queryKey: ["myHotel"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myHotel`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    });


    if(isLoading){
        return <Loading></Loading>
    }

    console.log(myHotel);

    return (
        <div>
            <div className="overflow-x-auto w-full mt-10">
                My hotel Update
            </div>
        </div>
    );
};

export default MyHotelUpdate;