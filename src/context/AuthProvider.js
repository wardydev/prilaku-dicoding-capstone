import { createContext, useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

import {
  facebookProvider,
  auth,
  googleProvider,
} from "../../src/config/firebase";
import { putJsonToken, putUserInfo } from "../../src/utils/functions";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isSignout, setIsSignout] = useState(false);

  const handleFacebookLogin = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider);
      const { accessToken } = res.user;
      putJsonToken(JSON.stringify(accessToken));
      putUserInfo(JSON.stringify(res));
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const { accessToken } = res.user;
      putJsonToken(JSON.stringify(accessToken));
      putUserInfo(JSON.stringify(res));
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleFacebookLogin,
        handleLoginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
