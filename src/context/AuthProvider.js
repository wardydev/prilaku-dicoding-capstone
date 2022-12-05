import { createContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

import { auth, googleProvider } from "../../src/config/firebase";
import { putJsonToken, putUserInfo } from "../../src/utils/functions";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const { accessToken } = res.user;
      setCookie("USER_TOKEN", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
      });

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
        handleLoginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
