import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import initializeFirebase from '../firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = ({ name, phone, email, password, reset, navigate }) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setError("");
                setUser(result.user);
                updateUserName(name);
                saveUser({ name, email });
                navigate('/');
                reset();
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then((user) => {
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const signIn = ({ email, password, navigate, from, reset }) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user);
                navigate(from, { replace: true });
                setError("");
                reset();
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }

    const signInWithGoogle = (navigate, from) => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const name = result.user.displayName;
                const email = result.user.email;
                const photoURL = result.user.photoURL;
                setUser(result.user);
                navigate(from, { replace: true });
                toast.success("Successfully logged in");
                saveGoogleUser({ name, email, photoURL });
                setError("");
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }

    const signOutUser = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser("");
                setError("");
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }

    const saveUser = (userInfo) => {
        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Successfully logged in");
                }
            })
    }

    const saveGoogleUser = (userInfo) => {
        fetch("http://localhost:5000/users", {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                // if (data.acknowledged) {
                //     console.log(data);
                //     toast.success("Successfully logged in");
                // }
            })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/user/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setRole(data?.role);
            })
    }, [user.email, user]);

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
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
    };
};

export default useFirebase;