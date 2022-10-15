import React from "react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

import { provider, auth } from "../../src/config/firebase";
import styles from "./login.module.scss";

const Login = () => {
  const router = useRouter();

  const handleFacebookLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className={styles.heading}>Login Page With Social Media</h1>
      <button className={styles.button} onClick={handleFacebookLogin}>
        Login With Facebook
      </button>
    </div>
  );
};

export default Login;
