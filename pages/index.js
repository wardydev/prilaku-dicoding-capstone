import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import Link from "next/link";

import { getUserInfo } from "../src/utils/functions";
import { AuthContext } from "../src/context/AuthProvider";
import { auth } from "../src/config/firebase";
import Layout from "../src/components/Layout";
import Banner from "../src/components/Banner";
import CardWithHeading from "../src/components/CardWithHeading";
import client from "../src/config/client";
import Card from "../src/components/Card";

const Home = ({ categories, products }) => {
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
    });
  }, []);

  console.log("products", products);

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
          isViewAll={true}
          card={categories?.map((category, index) => (
            <Link href={`/category/${category}`} key={index}>
              <a className="col-sm-12 col-md-6 col-lg-3 text-center">
                <Card>
                  <span>{category}</span>
                </Card>
              </a>
            </Link>
          ))}
        />
        <CardWithHeading
          icon={<BsFillLightningChargeFill size="30" />}
          headingTitle="Flash Deal"
          isViewAll={true}
          card={categories?.map((category, index) => (
            <Link href={`/category/${category}`} key={index}>
              <a className="col-sm-12 col-md-6 col-lg-3 text-center">
                <Card>
                  <span>{category}</span>
                </Card>
              </a>
            </Link>
          ))}
        />
        <h1>
          Welcome back{" "}
          {user?.displayName !== null ? user?.displayName : user?.email}
        </h1>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const [categoriesRes, productsRes] = await Promise.all([
      client.get("/categories"),
      client.get(""),
    ]);
    const [categories, products] = await Promise.all([
      categoriesRes.data,
      productsRes.data,
    ]);
    return { props: { categories, products } };
  } catch (err) {
    console.log(err);
  }
};

export default Home;
