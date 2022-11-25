import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

import Button from "../../src/components/Button";
import styles from "./register.module.scss";
import { AuthContext } from "../../src/context/AuthProvider";
import { auth } from "../../src/config/firebase";
import { putJsonToken, putUserInfo } from "../../src/utils/functions";

const Register = () => {
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [value, setValue] = useState(initialState);
  const { handleFacebookLogin, handleLoginWithGoogle } =
    useContext(AuthContext);
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
      alert("password is not same");
      return;
    } else {
      try {
        const { email, password } = value;
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const { accessToken } = res.user;
        putUserInfo(JSON.stringify(res));
        putJsonToken(JSON.stringify(accessToken));
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={`${styles.main} row text-light`}>
      <div className="col-lg-6 col-12">
        <div className={styles.container}>
          <div className="mb-4">
            <h1>Register ✌️</h1>
            <p>
              Has already an account?{" "}
              <Link href="/login">
                <a className={styles.gradientText}>Login Here!</a>
              </Link>
            </p>
          </div>
          <form className="mb-4" onSubmit={handleRegisterSubmit}>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@gmail.com"
                className={styles.inputForm}
                required
                name="email"
                value={value.email}
                onChange={handleInputValueChange}
              />
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Input your password"
                className={styles.inputForm}
                required
                name="password"
                value={value.password}
                onChange={handleInputValueChange}
              />
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="confirmPassword" className="mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className={styles.inputForm}
                required
                name="confirmPassword"
                value={value.confirmPassword}
                onChange={handleInputValueChange}
              />
            </div>
            <div className="d-grid gap-2 mt-4">
              <Button title="Register Now" isOutline={false} size="large" />
            </div>
          </form>
          <div className="d-grid gap-2 mb-3">
            <span className="text-muted text-center">
              Or Sign in with Social
            </span>
          </div>

          <div className="d-grid gap-2">
            <Button
              title="Login With Facebook"
              isOutline={true}
              size="large"
              icon={<IoLogoFacebook size={20} />}
              handleClick={handleFacebookLogin}
            />
            <Button
              title="Login With Google"
              isOutline={true}
              size="large"
              icon={<IoLogoGoogle size={20} />}
              handleClick={handleLoginWithGoogle}
            />
          </div>
        </div>
        <p className="text-center mt-5 text-white-50">
          &copy; 2022 kokashop with fakestoreapi
        </p>
      </div>
      <div className="col-6">
        <h1>Illustration</h1>
      </div>
    </div>
  );
};

export default Register;
