import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SearchPage from "../pages/SearchPage/SearchPage";
import SignUp from "../pages/SignUp/SignUp";

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
        ]
    }
]);

export default router;