import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/shared/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const { user, changePassword, error } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [isChangePass, setIsChangePass] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [uploadProfileImg, setUploadProfileImg] = useState("");

  const {
    data: userInfo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      const res = await fetch(
        `https://eveent-server.vercel.app/user/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  // const [userInfo, isLoading] = useUser();

  if (isLoading) {
    return <Loading />;
  }

  const handleSetProfileImg = (file) => {
    if (["png" || "jpg" || "jpeg"].map((tp) => file.type.includes(tp))) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        let fileObj = {
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result,
        };
        // console.log(fileObj);
        setProfileImg(fileObj);
      });
    } else {
      toast.error("Please, upload only ['jpg', 'png']");
    }
  };

  const handleUploadProfileImg = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    handleSetProfileImg(file);

    const formData = new FormData();
    formData.append("image", file);

    setUploadProfileImg(formData);
  };

  const saveProfileImage = () => {
    // console.log(uploadProfileImg);
    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBB_key}`,
      {
        method: "POST",
        body: uploadProfileImg,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const updateProfile = {
            photoURL: imgData.data.url,
          };

          fetch("https://eveent-server.vercel.app/user/upload-profile-img", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(updateProfile),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.acknowledged) {
                toast.success(`Successfully uploaded`);
                refetch();
              } else {
                toast.error(result.message);
              }
              setProfileImg("");
            });
        }
      });
  };

  const handleChangePassword = (data) => {
    changePassword({ ...data, setIsChangePass, reset });
  };

  return (
    <div className="mt-6">
      <div className="bg-neutral">
        <h2 className="pl-5 pt-6 text-2xl">Profile</h2>
        <div className="divider"></div>
        <div className="p-5 flex gap-5">
          <div className="w-36 flex flex-col justify-center items-center gap-3">
            <div className="avatar">
              <div className="w-28 rounded-xl">
                {profileImg ? (
                  <img src={`${profileImg.src}`} alt="" />
                ) : (
                  <img
                    src={`${
                      userInfo?.photoURL
                        ? userInfo.photoURL
                        : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                    }`}
                    alt="user-profile"
                  />
                )}
              </div>
            </div>
            <div className="text-center">
              {profileImg ? (
                <label
                  onClick={saveProfileImage}
                  className="btn btn-outline btn-accent btn-sm text-sm"
                >
                  Save
                </label>
              ) : (
                <label
                  htmlFor="uploadProfileImg"
                  className="btn btn-outline btn-accent btn-sm text-sm"
                >
                  Change Image
                </label>
              )}
              <input
                className="hidden"
                onChange={handleUploadProfileImg}
                type="file"
                name=""
                id="uploadProfileImg"
              />
            </div>
          </div>
          <div>
            <div style={{ minHeight: "78px" }}>
              <h2 className="border-black font-bold text-xl">
                Name: {userInfo.name}
              </h2>
              <p>
                Email: <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
              </p>
              {user?.email && !userInfo.role ? (
                <>
                  <Link to="/userSpecification">
                    <button className="btn btn-success btn-sm">
                      Getting Started
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  {userInfo.phone && (
                    <p>
                      Phone:{" "}
                      <a href={`tel:+${userInfo.phone}`}>{userInfo.phone}</a>
                    </p>
                  )}
                  {userInfo.address && <p>Address: {userInfo.address}</p>}
                  {userInfo.upazila && <p>Upazila: {userInfo.upazila}</p>}
                  {userInfo.district && <p>District: {userInfo.district}</p>}
                  {userInfo.division && <p>Division: {userInfo.division}</p>}
                </>
              )}
            </div>
            <div className="mt-10">
              {isChangePass && (
                <>
                  <div>
                    <form onSubmit={handleSubmit(handleChangePassword)}>
                      <div className="border flex items-center p-2 py-1 w-64 mt-5">
                        <label htmlFor="password">
                          <RiLockPasswordFill className="mx-2 mr-5 cursor-pointer" />
                        </label>
                        <input
                          className="w-full outline-none bg-transparent"
                          type="password"
                          id="password"
                          placeholder="Password"
                          {...register("password", {
                            required: "password is required",
                          })}
                          aria-invalid={errors.password ? "true" : "false"}
                        />
                      </div>
                      {errors.password && (
                        <p role="alert" className="text-red-500 w-64">
                          {errors.password?.message}
                        </p>
                      )}

                      {error && (
                        <div className="alert alert-error shadow-lg mt-3 p-1 rounded-md w-64">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="stroke-current flex-shrink-0 h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="font-thin">Error! {error}</span>
                          </div>
                        </div>
                      )}
                      <div className="mt-2 text-center w-64">
                        <input
                          className="btn btn-sm w-full bg-accent text-white"
                          type="submit"
                          value="Change Password"
                        />
                      </div>
                    </form>
                  </div>
                </>
              )}
              {!isChangePass && (
                <button
                  onClick={() => setIsChangePass(true)}
                  className="btn btn-accent btn-sm btn-outline"
                >
                  Change Password
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
