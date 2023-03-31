import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import eveentLogo from './../../../assets/Images/EVEENT-LOGO-white.png';
import { FaUserAlt } from 'react-icons/fa';
import useUser from '../../../hooks/useUser';
import Loading from '../Loading/Loading';

const Navbar = () => {
    const { user, signOutUser, loading } = useAuth();
    const [userInfo] = useUser();
    const navigate = useNavigate();

    // if(loading){
    //     return <Loading/>
    // }

    const navItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><a>Service</a></li>
        <li><a>Contact Us</a></li>
        <li><Link to="/exploreAll">Explore All</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {
            user?.email && !userInfo?.role && <>
                <li><Link to="/userSpecification"><button className="btn btn-success">Getting Started</button></Link></li>
            </>
            // user?.email && userInfo?.role !== 'user' && userInfo?.role !== 'hotelAdmin' && userInfo.role !== 'admin' && <>
            //     <li><Link to="/userSpecification"><button className="btn btn-success">Getting Started</button></Link></li>
            // </>
        }
        {
            user && user?.email && <>
                {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={`${user?.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdagfNlkCXKS54rDkgY6CjGNtPECsI_SZlKQ&usqp=CAU"}`} alt='user icon' />
                            {/* <img src={`${user.photoURL}`} alt="" /> */}
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><a href="#">Name: {user?.displayName}</a></li>
                        <li><Link to="/dashboard/myProfile">Profile</Link></li>
                        <li>
                            <button onClick={() => signOutUser(navigate)} className="justify-between">
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </>
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
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            {navItems}
                        </ul>
                    </div>
                    <Link to='/' className="normal-case text-xl">
                        <img className='h-11 w-36' src={eveentLogo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal items-center px-1 text-black">
                        {navItems}
                    </ul>
                </div>
                <label htmlFor="dashboardDrawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;