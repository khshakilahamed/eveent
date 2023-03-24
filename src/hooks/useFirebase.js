import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from '../firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = ({ name, phone, email, password, reset }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setError("");
                setUser(result.user);
                updateUserName(name);
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
                console.log(result.user);
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
                setUser(result.user);
                navigate("/");
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
        error,
        registerUser,
        signIn,
        signInWithGoogle,
        signOutUser,
    };
};

export default useFirebase;