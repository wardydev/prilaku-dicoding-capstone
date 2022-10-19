import { createContext, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

import {
  facebookProvider,
  auth,
  googleProvider,
} from "../../src/config/firebase";
import { putUserInfo } from "../../src/utils/functions";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState();
  const router = useRouter();

  const handleFacebookLogin = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider);
      const { accessToken } = await res.user;
      setUserAuthenticated(accessToken);
      putUserInfo(JSON.stringify(accessToken));
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const { accessToken } = await res.user;
      setUserAuthenticated(accessToken);
      putUserInfo(JSON.stringify(accessToken));
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userAuthenticated,
        setUserAuthenticated,
        handleFacebookLogin,
        handleLoginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
