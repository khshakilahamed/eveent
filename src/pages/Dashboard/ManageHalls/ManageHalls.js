import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsTelephoneForward } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import Pagination from "../../../components/shared/Pagination/Pagination";

const ManageHalls = () => {
  const [searchingValue, setSearchingValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);

  const numberOfElementPerPage = 3;

  const { data: hotels = [], refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch("https://eveent-server.vercel.app/hotels", {
        // headers: {
        //     authorization: `bearer ${localStorage.getItem('accessToken')}`
        // }
      });
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id, email, name) => {
    // console.log(id, email);
    setIsDeleting(true);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this booking",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://eveent-server.vercel.app/hotel/${id}/${email}`, {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              toast.success(`You have deleted ${name}`, {});
              refetch();
              setIsDeleting(false);
            }
          });
      } else {
        swal("The booking data is safe!");
        setIsDeleting(false);
      }
    });
  };

  const searchHotels = () => {
    let transformHotels = hotels || [];
    transformHotels = transformHotels.filter((hotel) =>
      hotel.email.toLowerCase().includes(searchingValue.toLowerCase())
    );

    return transformHotels;
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(hotels?.length / numberOfElementPerPage)
    )
      setPage(selectedPage);
  };

  // console.log(hotels);

  return (
    <div>
      <div className="overflow-x-auto w-full mt-10">
        <div className="md:flex items-center justify-between">
          <h2 className="pb-6 text-2xl">
            Manage Halls
            {hotels.length > 0 && (
              <span className="text-sm ml-3">[{hotels.length} founds]</span>
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
                <button onClick={searchHotels} className="btn btn-square">
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
              <th>Address</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchHotels().length > 0 &&
              searchHotels()
                .slice(
                  page * numberOfElementPerPage - numberOfElementPerPage,
                  page * numberOfElementPerPage
                )
                ?.map((hotel) => (
                  <tr key={hotel?._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-20 h-20">
                            <img
                              src={`${
                                hotel?.profileImg
                                  ? hotel.profileImg
                                  : "https://daisyui.com/tailwind-css-component-profile-3@56w.png"
                              }`}
                              alt="userPhoto"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className="font-bold">{hotel?.name}</h2>
                          <div className="flex items-center gap-3">
                            <HiOutlineMail size={22} />
                            <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
                          </div>
                          <div className="flex items-center gap-3">
                            <BsTelephoneForward size={20} />
                            <a href={`tel:${hotel.phone}`}>{hotel.phone}</a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-3 items-center">
                        <ImLocation size={30} className="text-accent" />
                        <div>
                          {hotel?.location?.split(",")?.map((ln, i) => (
                            <p key={i}>{ln}</p>
                          ))}
                        </div>
                      </div>
                    </td>
                    <th>
                      <button
                        onClick={() =>
                          handleDelete(hotel?._id, hotel?.email, hotel?.name)
                        }
                        className="btn btn-error btn-outline btn-sm"
                        disabled={isDeleting}
                      >
                        <RiDeleteBin6Line size={22} />
                      </button>
                    </th>
                  </tr>
                ))}
          </tbody>
        </table>

        <Pagination
          collectionArray={searchHotels()}
          selectPageHandler={selectPageHandler}
          page={page}
          numberOfElementPerPage={numberOfElementPerPage}
        />
      </div>
    </div>
  );
};

export default ManageHalls;
