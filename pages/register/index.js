import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

import styles from "./register.module.scss";
import { AuthContext } from "../../src/context/AuthProvider";
import { auth } from "../../src/config/firebase";
import {
  getJsonToken,
  putJsonToken,
  putUserInfo,
} from "../../src/utils/functions";
import { setCookie } from "cookies-next";
import Logo from "../../src/components/Logo";
import Image from "next/image";

const Register = () => {
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [value, setValue] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLoginWithGoogle } = useContext(AuthContext);
  const router = useRouter();

  const handleInputValueChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (value.password !== value.confirmPassword) {
      setErrorMessage("Password are not the same");
      return;
    } else {
      try {
        const { email, password } = value;
        const res = await createUserWithEmailAndPassword(auth, email, password);
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
    }
  };

  const sanitizeMessage = (message) => {
    const sanitize = message.split("/")[1].slice(0, -2);

    if (sanitize == "invalid-email") {
      return "Invalid email adress";
    }

    if (sanitize == "email-already-in-use") {
      return "Email already in use";
    }

    if (sanitize == "weak-password") {
      return "Weak password, try different combination";
    }

    return "Something wrong, please try again";
  };

  useEffect(() => {
    if (JSON.parse(getJsonToken()) !== null) {
      router.push("/home");
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
            <span>Sign Up with Google</span>
          </button>

          <div className={styles.or}>
            <p>or</p>
            <div></div>
          </div>

          <form className={styles.form} onSubmit={handleRegisterSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                name="email"
                value={value.email}
                onChange={handleInputValueChange}
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
                onChange={handleInputValueChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mt-3">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                required
                name="confirmPassword"
                value={value.confirmPassword}
                onChange={handleInputValueChange}
              />
            </div>

            {errorMessage && (
              <div className={styles.errorMessage}>* {errorMessage}</div>
            )}

            <button type="submit" className={styles.btnPrimary}>
              Sign Up
            </button>
          </form>
        </div>

        <p className={styles.bottomText}>
          Already have an account?
          <Link href="/login">
            <a style={{ color: "#3c4043" }}>Sign In</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
