import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import initializeFirebase from '../firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = ({ name, phone, email, password }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user);
                updateUserName(name);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then((user) => {
            })
            .catch((error) => {

            });
    }

    const signIn = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setUser(result.user);
            })
            .catch((error) => {

            })
    }

    const signInWithGoogle = (navigate) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user);
                navigate("/");
            })
            .catch((error) => {

            })
    }

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                setUser("");
            })
            .catch((error) => {

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
        registerUser,
        signIn,
        signInWithGoogle,
        signOutUser,
    };
};

export default useFirebase;