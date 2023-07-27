import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { ImCancelCircle, ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import Loading from "../../../components/shared/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import { BsTelephoneForward } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import Pagination from "../../../components/shared/Pagination/Pagination";
import { useState } from "react";

const MyBookings = () => {
  const { user } = useAuth();
  const [searchingValue, setSearchingValue] = useState("");
  const [page, setPage] = useState(1);

  const numberOfElementPerPage = 5;

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", user],
    queryFn: async () => {
      const res = await fetch(
        `https://eveent-server.vercel.app/bookings/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const searchBooking = () => {
    let transformBookings = bookings || [];
    transformBookings = transformBookings.filter((booking) =>
      booking.hotelName.toLowerCase().includes(searchingValue.toLowerCase())
    );

    return transformBookings;
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <=
        Math.ceil(searchBooking()?.length / numberOfElementPerPage)
    )
      setPage(selectedPage);
  };

  // console.log(bookings);

  return (
    <div>
      <div className="overflow-x-auto w-full mt-10">
        <div className="md:flex items-center justify-between">
          <h2 className="pb-6 text-2xl">
            My Bookings
            {bookings.length > 0 && (
              <span className="text-sm ml-3">[{bookings.length} founds]</span>
            )}
          </h2>
          <div>
            <div className="form-control">
              <div className="input-group">
                <input
                  onChange={(e) => setSearchingValue(e.target.value)}
                  type="text"
                  placeholder="Search by email"
                  className="input input-bordered"
                />
                <button onClick={searchBooking} className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              {/* <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th> */}
              <th>Hall</th>
              <th>Contact</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchBooking()?.length > 0 ? (
              <>
                {searchBooking()
                  .slice(
                    page * numberOfElementPerPage - numberOfElementPerPage,
                    page * numberOfElementPerPage
                  )
                  .map((booking) => (
                    <tr key={booking?._id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Link to={`/details/${booking.hotelId}`}>
                                <img
                                  src={`${
                                    booking?.hotelProfileImg
                                      ? booking.hotelProfileImg
                                      : "https://www.avantixlearning.ca/wp-content/uploads/2022/10/delete-page-page-in-word-featured.png"
                                  }`}
                                  alt="userPhoto"
                                />
                              </Link>
                            </div>
                          </div>
                          <div>
                            <Link to={`/details/${booking.hotelId}`}>
                              <h2 className="font-bold">
                                {booking?.hotelName}
                              </h2>
                            </Link>
                            <span className="text-sm opacity-50">
                              {booking?.date}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <HiOutlineMail size={22} />
                          <a href={`mailto:${booking.hotelEmail}`}>
                            {booking.hotelEmail}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <BsTelephoneForward size={20} />
                          <a href={`tel:${booking.hotelPhone}`}>
                            {booking.hotelPhone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <ImLocation size={22} />
                          <div>
                            {booking?.hotelLocation
                              ?.split(",")
                              ?.map((location, i) => (
                                <>
                                  <p key={i}>{location}</p>
                                </>
                              ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <TbCurrencyTaka />
                          <span className="text-lg font-bold">
                            {booking.price}
                          </span>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-accent">Pay</button>
                      </td>
                      <th>
                        <div className="flex flex-col gap-3">
                          <button className="btn btn-success btn-outline btn-sm">
                            <ImCancelCircle size={22} />
                          </button>
                          <button className="btn btn-error btn-outline btn-sm">
                            <RiDeleteBin6Line size={22} />
                          </button>
                        </div>
                      </th>
                    </tr>
                  ))}
              </>
            ) : (
              <p className="text-center text-2xl">You don't have any booking</p>
            )}
          </tbody>
        </table>
        <Pagination
          collectionArray={searchBooking()}
          selectPageHandler={selectPageHandler}
          page={page}
          numberOfElementPerPage={numberOfElementPerPage}
        />
      </div>
    </div>
  );
};

export default MyBookings;
