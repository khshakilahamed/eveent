import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import eveentLogo from './../../../assets/Images/EVEENT-LOGO-white.png';
import { FaUserAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, signOutUser } = useAuth();

    const navItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><a>Service</a></li>
        <li><a>Contact Us</a></li>
        {
            user && user?.email && <li tabIndex={0}>
                <a className="justify-between">
                    <FaUserAlt />
                    {user?.displayName ? user?.displayName : "activeUser"}
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                </a>
                <ul className="p-2 bg-accent">
                    <li><a>Submenu 1</a></li>
                    <li><a onClick={signOutUser}>Logout</a></li>
                </ul>
            </li>
        }
        {
            !user?.email && <>
                <li><Link to='/login'><button className='btn btn-secondary text-white'>Login</button></Link></li>
                <li><Link to='/sign-up'><button className='btn btn-secondary text-white'>Sign up</button></Link></li>
            </>
        }
    </>
    return (
        <div className="bg-primary">
            <div className="navbar h-[90px] sm:px-20 max-w-[1400px] mx-auto justify-between">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            {navItems}
                        </ul>
                    </div>
                    <Link to='/' className="normal-case text-xl">
                        <img className='h-11 w-36' src={eveentLogo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-black">
                        {navItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;