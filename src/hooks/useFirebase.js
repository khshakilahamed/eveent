import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import initializeFirebase from '../firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [role, setRole] = useState("");

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = ({ name, phone, email, password, reset, navigate }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setError("");
                setUser(result.user);
                updateUserName(name);
                saveUser({ name, email });
                navigate('/');
                reset();
            })
            .catch((error) => {
                setError(error.message);
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

    const signIn = ({ email, password, navigate, reset }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user);
                navigate('/');
                setError("");
                reset();
            })
            .catch((error) => {
                setError(error.message);
            })
    }

    const signInWithGoogle = (navigate) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const name = result.user.displayName;
                const email = result.user.email;
                setUser(result.user);
                navigate("/");
                toast.success("Successfully logged in");
                saveGoogleUser({ name, email });
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            })
    }

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                setUser("");
                setError("");
            })
            .catch((error) => {
                setError(error.message);
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
        });
        return () => unsubscribed;
    }, [auth]);


    return {
        user,
        role,
        error,
        registerUser,
        signIn,
        signInWithGoogle,
        signOutUser,
    };
};

export default useFirebase;