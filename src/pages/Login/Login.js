import React from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import facebook from './../../assets/icons/facebook.png';
import google from './../../assets/icons/google+.png';
import twitter from './../../assets/icons/twitter.png';

const Login = () => {
    const { error, signIn, signInWithGoogle } = useAuth();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const handleSignIn = (data) => {
        signIn({...data, navigate, reset});
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(navigate);
    }

    return (
        <div className='flex justify-center items-center w-full' style={{ minHeight: '75vh' }}>
            <div>
                <h2 className='font-bold my-5 text-xl'>Sign in or create an account</h2>
                <form onSubmit={handleSubmit(handleSignIn)}>
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

                    {
                        error && <div className="alert alert-error shadow-lg mt-3 p-1 rounded-md">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span className='font-thin'>Error! {error}</span>
                            </div>
                        </div>
                    }
                    <div className='mt-5 text-center w-96'>
                        <input className='btn w-full bg-accent text-white' type="submit" value="Login" />
                    </div>
                </form>

                <div className='flex flex-col items-center my-3'>
                    <p>With your social network</p>
                    <div className='flex gap-4 my-2'>
                        <img className='cursor-pointer border p-1' src={facebook} alt="" />
                        <img onClick={handleGoogleSignIn} className='cursor-pointer border p-1' src={google} alt="" />
                        <img className='cursor-pointer border p-1' src={twitter} alt="" />
                    </div>
                    <p className='text-accent font-light'>Not a member? <Link to="/sign-up" className='cursor-pointer'>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;