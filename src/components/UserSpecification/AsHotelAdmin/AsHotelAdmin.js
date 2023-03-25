import { allDivision, districtsOf, upazilasOf } from '@bangladeshi/bangladesh-address';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AsHotelAdmin = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [division, setDivision] = useState("");
    const [district, setDisctrict] = useState("");
    const { user } = useAuth();
    const divisions = allDivision();
    const districts = districtsOf(division);
    const upazilas = upazilasOf(district);
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [addService, setAddService] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [addFacility, setAddFacility] = useState('');

    const handleUpdateUser = data => {
        const role = 'hotelAdmin';
        if (services.length < 3) {
            return toast.error("Please, add at least three services");
        }
        const userInfo = { ...data, role, services };
        console.log(userInfo)
    };

    const handleAddService = (e) => {
        e.preventDefault();
        setServices([...services, addService]);
        document.getElementById('addService').value = "";
    }
    const handleAddFacility = (e) => {
        e.preventDefault();
        setFacilities([...facilities, addFacility]);
        console.log(facilities);
        document.getElementById('addFacility').value = "";
    }

    return (
        <div className='max-w-[1400px] min-h-[60vh] px-10 sm:px-20 mx-auto my-14'>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <div>
                    <h2 className='font-bold my-5 text-xl text-center'>You are getting started as <br /> Hotel Administrator</h2>
                </div>
                <form onSubmit={handleSubmit(handleUpdateUser)} className="flex flex-col gap-3">

                    <input
                        placeholder='Enter the Hall Name'
                        className=" p-2 w-96 border outline-none"
                        {...register("name", { required: "Hall name is required" })}
                    />
                    {errors.name && <p role="alert" className='text-red-500'>{errors.name?.message}</p>}
                    <input
                        className=" p-2 w-96 border outline-none hover:cursor-not-allowed"
                        disabled
                        value={user?.email}
                    />
                    <PhoneInput
                        className='p-2 w-96 outline-none border'
                        id='phone'
                        country="BD"
                        placeholder='Mobile Number'
                        {...register("phone", { required: "Phone number is required" })}
                        aria-invalid={errors.phone ? "true" : "false"}
                    />
                    {errors.phone && <p role="alert" className='text-red-500'>{errors.phone?.message}</p>}

                    <input
                        type="number"
                        placeholder='Enter the Hall price in BDT'
                        className=" p-2 w-96 border outline-none"
                        {...register("price", { required: "Hall price is required" })}
                    />
                    {errors.price && <p role="alert" className='text-red-500'>{errors.price?.message}</p>}
                    <input
                        type="number"
                        placeholder='Enter the capacity of peoples'
                        className=" p-2 w-96 border outline-none"
                        {...register("capacity", { required: "Hall capacity is required" })}
                    />
                    {errors.capacity && <p role="alert" className='text-red-500'>{errors.capacity?.message}</p>}



                    <select onClick={(e) => setDivision(e.target.value)} name="" id="" className=" p-2 w-96 border outline-none"
                        {...register("division", { required: "Division is required" })}
                    >
                        <option value="" disabled selected>Select Division</option>
                        {
                            divisions.map(division => <option value={division}>{division}</option>)
                        }
                    </select>
                    {errors.division && <p role="alert" className='text-red-500'>{errors.division?.message}</p>}
                    {
                        districts[0] && <select onClick={(e) => setDisctrict(e.target.value)} name="" id="" className=" p-2 w-96 border outline-none"
                            {...register("district", { required: "District is required" })}
                        >
                            <option value="" disabled selected>Select District</option>
                            {
                                districts?.map(district => <option value={district}>{district}</option>)
                            }
                        </select>
                    }
                    {errors.district && <p role="alert" className='text-red-500'>{errors.district?.message}</p>}
                    {
                        upazilas[0] && <select name="" id="" className=" p-2 w-96 border outline-none"
                            {...register("upazila", { required: "Upazila is required" })}
                        >
                            <option value="" disabled selected>Select Upazila</option>
                            {
                                upazilas?.map(upazila => <option value={upazila?.upazila}>{upazila?.upazila}</option>)
                            }
                        </select>
                    }
                    {errors.upazila && <p role="alert" className='text-red-500'>{errors.upazila?.message}</p>}
                    <input
                        placeholder='Enter your address'
                        className=" p-2 w-96 border outline-none"
                        {...register("address", { required: "Address is required" })}
                    />
                    {errors.address && <p role="alert" className='text-red-500'>{errors.address?.message}</p>}

                    {
                        services?.length !== 0 && <div className="w-96">
                            {
                                services?.map(service => <p className='badge badge-ghost'>{service}</p>)
                            }
                        </div>
                    }
                    <div className='w-96'>
                        <input
                            id="addService"
                            onChange={(e) => setAddService(e.target.value)}
                            placeholder='Add Service'
                            className=" p-2 w-3/4 border outline-none"
                        />
                        <button onClick={handleAddService} className='w-1/4 btn btn-warning'>Add</button>
                    </div>

                    {
                        facilities?.length !== 0 && <div className="w-96">
                            {
                                facilities?.map((facility, i) => <p className='w-full'>{i} {facility}</p>)
                            }
                        </div>
                    }
                    <div className='w-96 flex flex-col'>
                        <textarea
                            id="addFacility"
                            onChange={(e) => setAddFacility(e.target.value)}
                            placeholder='Add Facility'
                            className=" p-2 w-full border outline-none"
                        />
                        <button onClick={handleAddFacility} className='w-1/4 btn btn-warning'>Add</button>
                    </div>




                    <input className='btn btn-accent' type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default AsHotelAdmin;