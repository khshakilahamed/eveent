import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import initializeFirebase from "../firebase/firebase.init";
import useToken from "./useToken";
import { format } from "date-fns";

initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  // const [createdUserEmail, setCreatedUserEmail] = useState('');
  // const [navigate, setNavigate] = useState("");

  // const [token] = useToken(createdUserEmail);

  // if (token) {
  //     navigate()
  // }

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const registerUser = ({ name, phone, email, password, reset, navigate }) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setError("");
        setUser(result.user);
        const location = "/";
        updateUserName({ name, email, phone, navigate, location });

        // save user called from updateUserName function
        // saveUser({ name, email });
        // navigate('/');

        reset();
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const updateUserName = ({ name, email, phone, navigate }) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((user) => {
        setError("");
        saveUser({ name, email, phone, navigate });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const signIn = ({ email, password, navigate, from, reset }) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        // navigate(from, { replace: true });
        getUserToken(email, navigate, from);
        setError("");
        reset();
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const signInWithGoogle = (navigate, from) => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const photoURL = result.user.photoURL;

        setUser(result.user);
        navigate(from, { replace: true });
        // toast.success("Successfully logged in");
        saveGoogleUser({ name, email, photoURL, navigate, from });
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const signOutUser = (navigate) => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser("");
        setError("");
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const changePassword = ({ password, setIsChangePass, reset }) => {
    updatePassword(user, password)
      .then(() => {
        setIsChangePass(false);
        toast.success("Successfully changed password");
        reset();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const forgotPassword = ({ email, reset, navigate }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError("");
        toast.success("The reset link sent to your email");
        reset();
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const saveUser = ({ name, email, phone, navigate }) => {
    const userInfo = {
      name,
      email,
      phone,
      userCreatedAt: format(new Date(), "PPpp"),
    };

    fetch("https://eveent-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          getUserToken(email, navigate);
        }
      });
  };

  const saveGoogleUser = ({ name, email, photoURL, navigate, from }) => {
    const userInfo = {
      name,
      email,
      photoURL,
      userCreatedAt: format(new Date(), "PPpp"),
    };

    fetch("https://eveent-server.vercel.app/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          getUserToken(email, navigate, from);
          // console.log(data);
          // toast.success("Successfully logged in");
        }
      });
  };

  const getUserToken = (email, navigate, from) => {
    fetch(`https://eveent-server.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          from ? navigate(from, { replace: true }) : navigate("/");

          // window.location.reload(true);
        }
      });
  };

  useEffect(() => {
    fetch(`https://eveent-server.vercel.app/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRole(data?.role);
      });
  }, [user.email, user]);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribed;
  }, [auth, user.email]);

  return {
    user,
    role,
    error,
    loading,
    registerUser,
    signIn,
    signInWithGoogle,
    signOutUser,
    changePassword,
    forgotPassword,
  };
};

export default useFirebase;
