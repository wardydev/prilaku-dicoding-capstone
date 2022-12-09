import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "./login.module.scss";
import { AuthContext } from "../../src/context/AuthProvider";
import {
  getJsonToken,
  putJsonToken,
  putUserInfo,
} from "../../src/utils/functions";
import { auth } from "../../src/config/firebase";
import { setCookie } from "cookies-next";
import Logo from "../../src/components/Logo";
import Image from "next/image";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [value, setValue] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLoginWithGoogle } = useContext(AuthContext);
  const router = useRouter();

  const handleInputChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginWithEmailPassword = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = value;
      const res = await signInWithEmailAndPassword(auth, email, password);
      const { accessToken } = res.user;

      setCookie("USER_TOKEN", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
      });

      putUserInfo(JSON.stringify(res));
      putJsonToken(JSON.stringify(accessToken));
      router.push("/home");
    } catch (err) {
      setErrorMessage(sanitizeMessage(err.message));
    }
  };

  const sanitizeMessage = (message) => {
    const sanitize = message.split("/")[1].slice(0, -2);

    if (sanitize == "user-not-found") {
      return "User not found";
    }

    if (sanitize == "wrong-password") {
      return "Invalid email or password";
    }

    return "Something wrong, please try again";
  };

  useEffect(() => {
    if (JSON.parse(getJsonToken()) !== null) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.main}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <a style={{ textDecoration: "none", color: "#fff" }}>
              <Logo width="35" />
              <span>Prilaku</span>
            </a>
          </Link>
        </div>

        <div className={styles.card}>
          <button className={styles.btnGoogle} onClick={handleLoginWithGoogle}>
            <Image
              src="/images/ic_google.svg"
              alt="Google"
              width="20px"
              height="20px"
            />
            <span>Login with Google</span>
          </button>

          <div className={styles.or}>
            <p>or</p>
            <div></div>
          </div>

          <form className={styles.form} onSubmit={handleLoginWithEmailPassword}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                name="email"
                value={value.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="mt-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                name="password"
                value={value.password}
                onChange={handleInputChange}
              />
            </div>

            {errorMessage && (
              <div className={styles.errorMessage}>* {errorMessage}</div>
            )}

            <button type="submit" className={styles.btnPrimary}>
              Login
            </button>
          </form>
        </div>

        <p className={styles.bottomText}>
          Don&apos;t have an account yet?
          <Link href="/register">
            <a style={{ color: "#3c4043" }}>Sign Up</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
