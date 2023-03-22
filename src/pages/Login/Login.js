import React from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import facebook from './../../assets/icons/facebook.png';
import google from './../../assets/icons/google+.png';
import twitter from './../../assets/icons/twitter.png';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className='flex justify-center items-center w-full' style={{ minHeight: '75vh' }}>
            <div>
                <h2 className='font-bold my-5 text-xl'>Sign in or create an account</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='border flex items-center p-2 w-96'>
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
                        <input className='btn w-full bg-accent text-white' type="submit" value="Login" />
                    </div>
                </form>

                <div className='flex flex-col items-center my-3'>
                    <p>With your social network</p>
                    <div className='flex gap-4 my-2'>
                        <img className='cursor-pointer border p-1' src={facebook} alt="" />
                        <img className='cursor-pointer border p-1' src={google} alt="" />
                        <img className='cursor-pointer border p-1' src={twitter} alt="" />
                    </div>
                    <p className='text-accent font-light'>Not a member? <Link to="/sign-up" className='cursor-pointer'>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;