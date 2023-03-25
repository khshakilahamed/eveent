import { createBrowserRouter } from "react-router-dom";
import AsUser from "../components/UserSpecification/AsUser/AsUser";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
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
                path: '/userSpecification',
                element: <UserSpecification />
            },
            {
                path: '/asUser',
                element: <AsUser />
            },
        ]
    }
]);

export default router;