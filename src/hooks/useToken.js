import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useToken = (email) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`https://eveent-server.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
            toast.success("Successfully registered");
          }
        });
    }
  }, [email]);

  return [token];
};

export default useToken;
