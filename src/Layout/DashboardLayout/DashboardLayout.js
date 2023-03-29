import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../components/shared/Footer/Footer';
import Navbar from '../../components/shared/Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-[1400px] px-10 sm:px-20 mx-auto my-10'>
                <div className="drawer drawer-mobile">
                    <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">
                        {/* <label htmlFor="dashboardDrawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
                        <Outlet />
                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 bg-base-100 text-black">
                            <li><Link to="/dashboard/myBookings">My Bookings</Link></li>
                            <li><Link to="/dashboard/allUsers">All Users</Link></li>
                            <li><Link to="/dashboard/allBookings">All Bookings</Link></li>
                        </ul>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default DashboardLayout;