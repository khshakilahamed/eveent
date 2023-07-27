import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const { user } = useAuth();
  // console.log(user);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://eveent-server.vercel.app/user/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserInfoLoading(false);
          setUserInfo(data);
        });
    }
  }, [user?.email]);

  // const { data: userInfo, isLoading } = useQuery({
  //     queryKey: [user?.email],
  //     queryFn: async () => {
  //         const res = await fetch(`https://eveent-server.vercel.app/user/${user?.email}`);
  //         const data = await res.json();
  //         return data;
  //     }
  // });
  return [userInfo, userInfoLoading];
};

export default useUser;
