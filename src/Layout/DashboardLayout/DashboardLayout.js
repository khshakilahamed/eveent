import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../components/shared/Footer/Footer';
import Navbar from '../../components/shared/Navbar/Navbar';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

const DashboardLayout = () => {
    const { user } = useAuth();
    const [userInfo] = useUser();

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
                            <li><Link to="/dashboard/myProfile">My Profile</Link></li>
                            {
                                userInfo?.email === user.email && userInfo?.role === 'user' && userInfo?.role !== 'admin' && userInfo?.role !== 'hotelAdmin' && <>
                                    <li><Link to="/dashboard/myBookings">My Bookings</Link></li>
                                </>
                            }
                            {
                                (user.email === userInfo.email && userInfo.role === 'hotelAdmin') && <>
                                    <li><Link to="/dashboard/myHotelBookings">My Hotel Bookings</Link></li>
                                </>
                            }
                            {
                                (user.email === userInfo.email && userInfo.role === 'admin') && <>
                                    <li><Link to="/dashboard/allUsers">All Users</Link></li>
                                    <li><Link to="/dashboard/allBookings">All Bookings</Link></li>
                                    <li><Link to="/dashboard/manageHalls">Manage Halls</Link></li>

                                </>
                            }
                        </ul>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;