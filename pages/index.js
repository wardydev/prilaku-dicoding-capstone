import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";

import { getUserInfo } from "../src/utils/functions";
import { AuthContext } from "../src/context/AuthProvider";
import { auth } from "../src/config/firebase";

const Home = () => {
  const { userAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    const userParsed = JSON.parse(getUserInfo());
    if (userAuthenticated || userParsed) {
      return;
    }
    router.push("/login");
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>
          Welcome to koka shop | The Store that could be your got your dream
          procuts
        </title>
      </Head>
      <h1>
        Welcome back{" "}
        {user?.displayName !== null ? user?.displayName : user?.email}
      </h1>
    </div>
  );
};

export default Home;
