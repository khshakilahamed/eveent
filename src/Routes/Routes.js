import { createBrowserRouter } from "react-router-dom";
import AsHotelAdmin from "../components/UserSpecification/AsHotelAdmin/AsHotelAdmin";
import AsUser from "../components/UserSpecification/AsUser/AsUser";
import Main from "../Layout/Main/Main";
import ExploreAll from "../pages/ExploreAll/ExploreAll";
import Home from "../pages/Home/Home";
import HotelDetails from "../pages/HotelDetails/HotelDetails";
import Login from "../pages/Login/Login";
import SearchPage from "../pages/SearchPage/SearchPage";
import SignUp from "../pages/SignUp/SignUp";
import UserSpecification from "../pages/UserSpecification/UserSpecification";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/exploreAll',
                element: <ExploreAll></ExploreAll>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/sign-up',
                element: <SignUp />
            },
            {
                path: '/search',
                element: <SearchPage />
            },
            {
                path: 'details/:id',
                element: <HotelDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/hotel/details/${params.id}`)
            },
            {
                path: '/userSpecification',
                element: <UserSpecification />
            },
            {
                path: '/asUser',
                element: <AsUser />
            },
            {
                path: '/asHotelAdmin',
                element: <AsHotelAdmin />
            },
        ]
    }
]);

export default router;