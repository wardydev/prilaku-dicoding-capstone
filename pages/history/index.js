import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../src/config/firebase";
// import CalendarComponent from "../../src/components/CalendarComponent";
import HabbitCard from "../../src/components/HabbitCard";
import Header from "../../src/components/Header";
import Heading from "../../src/components/Heading";
import Layout from "../../src/components/Layout";
import { formatDate, getUserInfo } from "../../src/utils/functions";
import DetailHabbit from "../../src/components/DetailHabbit";
import { deleteHabbit } from "../../src/utils/firebaseFunc";
import Alert from "../../src/components/Alert";
import CardRate from "../../src/components/CardRate";
import UserLoginProfile from "../../src/components/UserLoginProfile";
import Spinner from "../../src/components/Spinner";
import styles from "./History.module.scss";

const NavbarTopContent = ({ habbitsDateActive }) => {
  return (
    <>
      <div className={styles["navbar-top__information"]}>
        <div className={styles["date-active"]}>
          {formatDate(habbitsDateActive)}
        </div>
      </div>
      <UserLoginProfile classname={styles["user-logged-shown"]} />
    </>
  );
};

const History = () => {
  const [isShowDetailUpdate, setIsShowDetailUpdate] = useState(false);
  const [habbits, setHabbits] = useState([]);
  const [dataDetailHabbit, setDataDetailHabbit] = useState();
  const [habbitsDateActive, setHabbitsDateActive] = useState(new Date());
  const [remaindHabbits, setRemaindHabbits] = useState(0);
  const [finishedHabbits, setFinishedHabbits] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getHabbitDataFromFirestore = async () => {
    try {
      const userSigned = JSON.parse(getUserInfo());

      const isDoneHabit = query(
        collection(db, "habbits"),
        where("isDone", "==", true),
        where("uid", "==", userSigned.user.uid)
      );

      onSnapshot(isDoneHabit, (querySnapshot) => {
        const snapshots = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        snapshots.sort((a, b) => b.data.endDate - a.data.endDate);

        setHabbits(snapshots);
        setIsLoading(false);
      });

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

  useEffect(() => {
    getHabbitDataFromFirestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habbits, habbitsDateActive]);

  return (
    <Layout
      navbarTopContent={
        <NavbarTopContent habbitsDateActive={habbitsDateActive} />
      }
    >
      {isShowDetailUpdate && (
        <DetailHabbit
          setValue={setIsShowDetailUpdate}
          dataDetailHabbit={dataDetailHabbit}
          setShowModal={false}
          remaindHabbits={remaindHabbits}
          finishedHabbits={finishedHabbits}
          completionRate={completionRate}
        />
      )}
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
            <h2>FINISHED HABIT</h2>
            <div className={styles["habbit-list"]}>
              {isLoading && <Spinner />}
              {habbits.length === 0 && (
                <Alert type="danger" message="There is no activity finished" />
              )}
              {!isLoading &&
                habbits?.map((habbit) => {
                  return (
                    <div className="mt-3 position-relative" key={habbit.id}>
                      <HabbitCard
                        title={habbit.data.name}
                        iconName={habbit.data.icon}
                        color={habbit.data.color}
                        setValue={setIsShowDetailUpdate}
                        setDataDetail={setDataDetailHabbit}
                        data={habbit}
                        deleteHabbitById={() =>
                          deleteHabbit("habbits", habbit.id)
                        }
                        time={habbit.data.time}
                        startDate={formatDate(new Date(habbit.data.startDate))}
                        endDate={formatDate(new Date(habbit.data.endDate))}
                        forHistory={true}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
