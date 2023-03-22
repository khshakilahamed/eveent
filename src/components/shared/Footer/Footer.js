import React from 'react';
import logo from './../../../assets/Images/EVEENT-LOGO-white.png';

const Footer = () => {
    return (
        <div className='bg-secondary py-16 flex items-center'>
            <div className='w-full max-w-[1400px] px-20 mx-auto sm:flex items-center justify-between'>
                <div>
                    <div className='md:flex items-center gap-5'>
                        <img className='w-40 h-10' src={logo} alt="" />
                        <p className='text-white'>@ 2022 eveent.com.bd</p>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20 sm:mt-0'>
                    <p><a href="#" className='text-white underline'>cookie settings</a></p>
                    <p><a href="#" className='text-white underline'>privacy policy</a></p>
                    <p><a href="#" className='text-white underline'>terms of services</a></p>
                    <p><a href="#" className='text-white underline'>acceptable use policy</a></p>
                </div>
            </div>
        </div>
    );
};

export default Footer;