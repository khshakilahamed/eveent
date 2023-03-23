import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import facebook from './../../assets/icons/facebook.png';
import google from './../../assets/icons/google+.png';
import twitter from './../../assets/icons/twitter.png';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
    const {registerUser} = useAuth();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const handleSignUp = (data) => {
        registerUser(data);
        reset();
    }

    return (
        <div className='flex justify-center items-center w-full' style={{ minHeight: '75vh' }}>
            <div>
                <h2 className='font-bold my-5 text-xl'>Create an account</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>

                    <div className='border flex items-center p-2 w-96'>
                        <label htmlFor="name">
                            <FaUserAlt className='mx-2 mr-5 cursor-pointer' />
                        </label>
                        <input
                            className='w-full outline-none'
                            type='text'
                            id='name'
                            placeholder='Name'
                            {...register("name", { required: "Name is required" })}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                    </div>
                    {errors.name && <p role="alert" className='text-red-500'>{errors.name?.message}</p>}

                    <div className='border flex items-center p-2 w-96 mt-5'>
                        {/* <label htmlFor="phone">
                            <HiOutlineMail className='mx-2 mr-5 cursor-pointer' />
                        </label> */}
                        <PhoneInput
                            required
                            className='w-full outline-none'
                            id='phone'
                            country="BD"
                            placeholder='Mobile Number'
                            {...register("phone", { required: "Phone address is required" })}
                            aria-invalid={errors.phone ? "true" : "false"}
                        />
                    </div>
                    {errors.phone && <p role="alert" className='text-red-500'>{errors.phone?.message}</p>}

                    <div className='border flex items-center p-2 w-96 mt-5'>
                        <label htmlFor="email">
                            <HiOutlineMail className='mx-2 mr-5 cursor-pointer' />
                        </label>
                        <input
                            className='w-full outline-none'
                            type='email'
                            id='email'
                            placeholder='Email'
                            {...register("email", { required: "Email address is required" })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                    </div>
                    {errors.email && <p role="alert" className='text-red-500'>{errors.email?.message}</p>}

                    <div className='border flex items-center p-2 w-96 mt-5'>
                        <label htmlFor="password">
                            <RiLockPasswordFill className='mx-2 mr-5 cursor-pointer' />
                        </label>
                        <input
                            className='w-full outline-none'
                            type="password"
                            id="password"
                            placeholder='Password'
                            {...register("password", { required: "password is required" })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />

                    </div>
                    {errors.password && <p role="alert" className='text-red-500'>{errors.password?.message}</p>}

                    <div className='mt-5 text-center w-96'>
                        <input className='btn w-full bg-accent text-white' type="submit" value="Sign up" />
                    </div>
                </form>

                <div className='flex flex-col items-center my-3'>
                    <p>With your social network</p>
                    <div className='flex gap-4 my-2'>
                        <img className='cursor-pointer border p-1' src={facebook} alt="" />
                        <img className='cursor-pointer border p-1' src={google} alt="" />
                        <img className='cursor-pointer border p-1' src={twitter} alt="" />
                    </div>
                    <p className='text-accent font-light'>Already have an account? <Link to='/login' className='cursor-pointer'>login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;