import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../src/config/firebase";
import Layout from "../../src/components/Layout";
import UserLoginProfile from "../../src/components/UserLoginProfile";
import Image from "next/image";
import styles from "./User.module.scss";
import { getUserInfo } from "../../src/utils/functions";
import { deleteCookie } from "cookies-next";
import { auth } from "../../src/config/firebase";
import { useRouter } from "next/router";
import CardRate from "../../src/components/CardRate";

const User = () => {
  const [img, setImg] = React.useState(null);
  const [emailUser, setEmailUser] = React.useState(null);
  const [nameUser, setNameUser] = React.useState(null);

  const [isUserSignOut, setIsUserSignOut] = React.useState(false);
  const [remaindHabbits, setRemaindHabbits] = useState(0);
  const [finishedHabbits, setFinishedHabbits] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const router = useRouter();

  React.useEffect(() => {
    const { user } = JSON.parse(getUserInfo());
    const nameUserFromEmail = user.email.split("@")[0];

    setEmailUser(user.email);
    setNameUser(() => (user.name ? user.name : nameUserFromEmail));
    setImg(user.photoURL);
  }, []);

  React.useEffect(() => {
    if (isUserSignOut) {
      window.localStorage.removeItem("TOKEN");
      window.localStorage.removeItem("DATAUSERS");
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserSignOut]);

  React.useEffect(() => {
    getHabbitDataFromFirestore();
  }, []);

  const handleSignout = () => {
    auth.signOut().then(() => {
      setIsUserSignOut(true);
      deleteCookie("USER_TOKEN");
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("DATAUSERS");
    });
  };

  const getHabbitDataFromFirestore = async () => {
    try {
      const userSigned = JSON.parse(getUserInfo());

      const allHabit = query(
        collection(db, "habbits"),
        where("uid", "==", userSigned.user.uid)
      );

      onSnapshot(allHabit, (querySnapshot) => {
        const snapshots = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const dataRemaindHabbits = snapshots.filter((habbit) => {
          return habbit.data.isDone === false;
        });

        const dataFinishedHabbits = snapshots.filter((habbit) => {
          return habbit.data.isDone === true;
        });

        setCompletionRate(
          Math.round((100 * dataFinishedHabbits.length) / snapshots.length)
        );
        setRemaindHabbits(dataRemaindHabbits);
        setFinishedHabbits(dataFinishedHabbits);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Layout
        navbarTopContent={
          <>
            <div className={styles["logo"]}>
              <Image
                src={"/images/logo.png"}
                width="35px"
                height="35px"
                alt="image profile"
              ></Image>
              <h1>Prilaku</h1>
            </div>
            <UserLoginProfile classname={styles["user-logged-shown"]} />
          </>
        }
      >
        <div className={styles["main-content"]}>
          <div className={styles["main-content__inner"]}>
            <div className={styles["history-info"]}>
              <div className={styles["history-info__inner"]}>
                <div className={styles["card-rate"]}>
                  <div className="row gap-5">
                    <div className="col-4">
                      <CardRate
                        rateName="Unfinished Habit"
                        rateCount={remaindHabbits.length}
                      />
                    </div>
                    <div className="col-4">
                      <CardRate
                        color="#58B77A"
                        rateName="Habit Finished"
                        rateCount={finishedHabbits.length}
                      />
                    </div>
                    <div className="col-6">
                      <CardRate
                        color="#ED7946"
                        rateName="Completion Rate"
                        rateCount={`${completionRate || 0}%`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["content"]}>
              <div className={styles["user-info"]}>
                <div className={styles["user-info__photo"]}>
                  <Image
                    src={img || "/images/deadpool.svg"}
                    width="80px"
                    height="80px"
                    alt="image profile"
                  />
                </div>
                <div className={styles["user-info__data"]}>
                  <div className={styles["user-info__name"]}>
                    <h2>YOUR NAME</h2>
                    <p>{nameUser}</p>
                  </div>
                  <div className={styles["user-info__email"]}>
                    <h2>YOUR EMAIL</h2>
                    <p>{emailUser}</p>
                  </div>
                </div>
              </div>
              <div className={styles["button-logout"]} onClick={handleSignout}>
                <button onClick={handleSignout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default User;
