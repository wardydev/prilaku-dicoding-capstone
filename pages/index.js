import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { BiCategoryAlt } from "react-icons/bi";

import { getUserInfo } from "../src/utils/functions";
import { AuthContext } from "../src/context/AuthProvider";
import { auth } from "../src/config/firebase";
import Layout from "../src/components/Layout";
import Banner from "../src/components/Banner";
import CardWithHeading from "../src/components/CardWithHeading";

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
      <Layout>
        <Banner />
        <CardWithHeading
          icon={<BiCategoryAlt size="30" />}
          headingTitle="Top Categories"
          column={4}
          isViewAll={true}
        />
        <h1>
          Welcome back{" "}
          {user?.displayName !== null ? user?.displayName : user?.email}
        </h1>
      </Layout>
    </div>
  );
};

export default Home;
