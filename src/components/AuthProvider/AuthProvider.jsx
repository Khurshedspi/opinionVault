import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/Firebase.Config";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInUserWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const allData = {
    user,
    loading,
    setUser,
    signInUserWithGoogle,
    logOut,
    createUser,
    updateUserProfile,
    logInUser,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={allData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;