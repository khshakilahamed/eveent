import React from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineMail } from 'react-icons/hi';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const { forgotPassword, error } = useAuth();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    if (error) {
        toast.error(error);
    }

    const handleForgot = (data) => {
        forgotPassword({...data, reset, navigate});
    }

    return (
        <div className='flex justify-center items-center w-full' style={{ minHeight: '75vh' }}>
            <div>
                <h2 className='font-bold my-5 text-xl'>Reset Password</h2>
                <form onSubmit={handleSubmit(handleForgot)}>
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

                    <div className='mt-5 text-center w-96'>
                        <input className='btn w-full bg-accent text-white' type="submit" value="Reset" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;