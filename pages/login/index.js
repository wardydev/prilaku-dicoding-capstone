import React, { useContext } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io5";
import Link from "next/link";

import styles from "./login.module.scss";
import Button from "../../src/components/Button";
import { AuthContext } from "../../src/context/AuthProvider";

const Login = () => {
  const { handleFacebookLogin, handleLoginWithGoogle } =
    useContext(AuthContext);
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
          <form className="mb-4">
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
              />
            </div>
            <div className="d-grid gap-2">
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
