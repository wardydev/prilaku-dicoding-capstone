import React, { useContext, useEffect, useState } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "./login.module.scss";
import Button from "../../src/components/Button";
import { AuthContext } from "../../src/context/AuthProvider";
import {
  getJsonToken,
  putJsonToken,
  putUserInfo,
} from "../../src/utils/functions";
import { auth } from "../../src/config/firebase";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [value, setValue] = useState(initialState);
  const { handleFacebookLogin, handleLoginWithGoogle } =
    useContext(AuthContext);
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
    <div className={`${styles.main} row text-light`}>
      <div className="col-lg-6 col-12">
        <div className={styles.container}>
          <div className="mb-4">
            <h1>Login ✌️</h1>
            <p>
              Has no an account yet?{" "}
              <Link href="/register">
                <a className={styles.gradientText}>Register now!</a>
              </Link>
            </p>
          </div>
          <form className="mb-4" onSubmit={handleLoginWithEmailPassword}>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </div>
            <div className="d-grid gap-2 mt-4">
              <button className={styles.buttonLogin}>Login</button>
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

export default Login;
