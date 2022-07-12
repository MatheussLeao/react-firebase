import { createContext, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../services/config";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
      if (sessionToken && sessionUser) {
        setUser(sessionUser);
      }
    };
    loadStoreAuth();
  }, []);

  const signWithEmailPass = (data) => {
    setLoading(true);
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const token = userCredential.token;
        const user = userCredential.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading(false);
        toast.error(`${errorMessage}`);
      });
  };

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(`${errorMessage} ${credential}`);
      });
  };

  const sign = {
    google: signInGoogle,
    userAndPass: signWithEmailPass,
  };

  const signOut = () => {
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/" />
  };

  return (
    <AuthContext.Provider value={{ sign, signed: !!user, user, signOut, loading }}>{children}</AuthContext.Provider>
  );
};
