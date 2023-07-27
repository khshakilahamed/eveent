import {
  allDistict,
  allDivision,
  districtsOf,
  divisionalDataOf,
  DivisonName,
  upazilasOf,
} from "@bangladeshi/bangladesh-address";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const AsUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [division, setDivision] = useState("");
  const [district, setDisctrict] = useState("");
  const { user } = useAuth();
  const divisions = allDivision();
  const districts = districtsOf(division);
  const upazilas = upazilasOf(district);
  const navigate = useNavigate();

  const handleUpdateUser = (data) => {
    const role = "user";
    const userInfo = { ...data, role };

    fetch(`https://eveent-server.vercel.app/user?email=${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success(`You started as an ${role}`);
          navigate("/");
          reset();
        }
      });
  };

  return (
    <div className="max-w-[1400px] h-[60vh] px-10 sm:px-20 mx-auto my-14">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div>
          <h2 className="font-bold my-5 text-xl">
            You are getting started as an user
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="flex flex-col gap-3"
        >
          <input
            className=" p-2 w-96 border outline-none"
            disabled
            value={user?.email}
          />
          <select
            onClick={(e) => setDivision(e.target.value)}
            name=""
            id=""
            className=" p-2 w-96 border outline-none"
            {...register("division", { required: "Division is required" })}
          >
            <option value="" disabled selected>
              Select Division
            </option>
            {divisions.map((division) => (
              <option value={division}>{division}</option>
            ))}
          </select>
          {errors.division && (
            <p role="alert" className="text-red-500">
              {errors.division?.message}
            </p>
          )}
          {districts[0] && (
            <select
              onClick={(e) => setDisctrict(e.target.value)}
              name=""
              id=""
              className=" p-2 w-96 border outline-none"
              {...register("district", { required: "District is required" })}
            >
              <option value="" disabled selected>
                Select District
              </option>
              {districts?.map((district) => (
                <option value={district}>{district}</option>
              ))}
            </select>
          )}
          {errors.district && (
            <p role="alert" className="text-red-500">
              {errors.district?.message}
            </p>
          )}
          {upazilas[0] && (
            <select
              name=""
              id=""
              className=" p-2 w-96 border outline-none"
              {...register("upazila", { required: "Upazila is required" })}
            >
              <option value="" disabled selected>
                Select Upazila
              </option>
              {upazilas?.map((upazila) => (
                <option value={upazila?.upazila}>{upazila?.upazila}</option>
              ))}
            </select>
          )}
          {errors.upazila && (
            <p role="alert" className="text-red-500">
              {errors.upazila?.message}
            </p>
          )}
          <input
            placeholder="Enter your address"
            className=" p-2 w-96 border outline-none"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p role="alert" className="text-red-500">
              {errors.address?.message}
            </p>
          )}
          <PhoneInput
            required
            className="p-2 w-96 outline-none border"
            id="phone"
            country="BD"
            placeholder="Mobile Number"
            {...register("phone", { required: "Phone number is required" })}
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && (
            <p role="alert" className="text-red-500">
              {errors.phone?.message}
            </p>
          )}

          <input className="btn btn-accent" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default AsUser;
