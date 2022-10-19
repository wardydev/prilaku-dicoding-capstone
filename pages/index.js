import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { getUserInfo } from "../src/utils/functions";
import { AuthContext } from "../src/context/AuthProvider";

const Home = () => {
  const { userAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const userParsed = JSON.parse(getUserInfo());
    if (userAuthenticated || userParsed) {
      return;
    }
    router.push("/login");
  }, []);

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default Home;
