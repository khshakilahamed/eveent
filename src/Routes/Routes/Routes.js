import { createBrowserRouter } from "react-router-dom";
import AsHotelAdmin from "../../components/UserSpecification/AsHotelAdmin/AsHotelAdmin";
import AsUser from "../../components/UserSpecification/AsUser/AsUser";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import AllBookings from "../../pages/Dashboard/AllBookings/AllBookings";
import AllUsers from "../../pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import MyBookings from "../../pages/Dashboard/MyBookings/MyBookings";
import MyHotelBookings from "../../pages/Dashboard/MyHotelBookings/MyHotelBookings";
import MyProfile from "../../pages/Dashboard/MyProfile/MyProfile";
import ExploreAll from "../../pages/ExploreAll/ExploreAll";
import Home from "../../pages/Home/Home";
import HotelDetails from "../../pages/HotelDetails/HotelDetails";
import Login from "../../pages/Login/Login";
import SearchPage from "../../pages/SearchPage/SearchPage";
import SignUp from "../../pages/SignUp/SignUp";
import UserSpecification from "../../pages/UserSpecification/UserSpecification";
import AdminRoute from "../AdminRoute/AdminRoute";
import HotelAdmin from "../HotelAdmin/HotelAdmin";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ManageHalls from "../../pages/Dashboard/ManageHalls/ManageHalls";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import MyHotelUpdate from "../../pages/Dashboard/MyHotelUpdate/MyHotelUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/exploreAll",
        element: <ExploreAll></ExploreAll>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "details/:id",
        element: <HotelDetails />,
        loader: ({ params }) =>
          fetch(`https://eveent-server.vercel.app/hotel/details/${params.id}`),
      },
      {
        path: "/userSpecification",
        element: <UserSpecification />,
      },
      {
        path: "/asUser",
        element: <AsUser />,
      },
      {
        path: "/asHotelAdmin",
        element: <AsHotelAdmin />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <MyBookings />,
      },
      {
        path: "/dashboard/myProfile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/myBookings",
        element: <MyBookings />,
      },
      {
        path: "/dashboard/myHotelBookings",
        element: (
          <HotelAdmin>
            <MyHotelBookings />
          </HotelAdmin>
        ),
      },
      {
        path: "/dashboard/myHotelUpdate",
        element: (
          <HotelAdmin>
            <MyHotelUpdate />
          </HotelAdmin>
        ),
      },
      {
        path: "/dashboard/allUsers",
        element: (
          <AdminRoute>
            {" "}
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allBookings",
        element: (
          <AdminRoute>
            <AllBookings />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageHalls",
        element: (
          <AdminRoute>
            <ManageHalls />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
