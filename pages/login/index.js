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

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [value, setValue] = useState(initialState);
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

      setCookie("USER_TOKEN", accessToken, { maxAge: 60 * 60 * 24 });

      putUserInfo(JSON.stringify(res));
      putJsonToken(JSON.stringify(accessToken));
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (JSON.parse(getJsonToken()) !== null) {
      router.push("/");
    }
  }, []);

  return (
    <div className={`${styles.main}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>

        <div className={styles.card}>
          <button
            className={styles.btnGoogle}
            onClick={handleLoginWithGoogle}
          >
            <img src="/images/ic_google.svg" alt="Google" />
            <span>Log in with Google</span>
          </button>

          <form className={styles.form} onSubmit={handleLoginWithEmailPassword}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="email@gmail.com"
                required
                name="email"
                value={value.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Input your password"
                required
                name="password"
                value={value.password}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </div>

        <p>
          Don't have an account yet?
          <Link href="/register">
            <a>Sign up</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
