import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";

import { db } from "../../src/config/firebase";
import ButtonCustom from "../../src/components/ButtonCustom";
import CalendarComponent from "../../src/components/CalendarComponent";
import HabbitCard from "../../src/components/HabbitCard";
import Header from "../../src/components/Header";
import Heading from "../../src/components/Heading";
import Layout from "../../src/components/Layout";
import {
  formatDate,
  formatterDateToObject,
  getUserInfo,
} from "../../src/utils/functions";
import DetailHabbit from "../../src/components/DetailHabbit";
import { deleteHabbit } from "../../src/utils/firebaseFunc";
import CardRate from "../../src/components/CardRate";
import Spinner from "../../src/components/Spinner";
import Alert from "../../src/components/Alert";
import FormHabbit from "../../src/components/FormHabbit";
import NavbarLeftBottom from "../../src/components/NavbarLeftBottom";
import NavbarTop from "../../src/components/NavbarTop";
import Logo from "../../src/components/Logo";
import ButtonTextOnly from "../../src/components/ButtonTextOnly";
import ButtonTextWithIcon from "../../src/components/ButtonTextWithIcon";
import UserLoginProfile from "../../src/components/UserLoginProfile";

import styles from "./Home.module.scss";
import ButtonIconOnly from "../../src/components/ButtonIconOnly";
import Footer from "../../src/components/Footer";

const NavbarTopContent = ({
  habbitsDateActive,
  setDataDetailHabbit,
  setShowModal,
}) => {
  const todayDate = new Date();

  return (
    <>
      <div className={styles["navbar-top__information"]}>
        <ButtonTextOnly
          handleClick={() => {
            const todayClass = document.querySelector(
              ".main-calendar .Calendar__day.-today"
            );
            const selectedClass = document.querySelector(
              ".main-calendar .Calendar__day.-selected"
            );

            const today = todayClass || selectedClass;

            if (today) {
              today.scrollIntoView({ inline: "center" });
              today.click();
            }
          }}
        >
          {todayDate.toLocaleDateString() ==
          habbitsDateActive.toLocaleDateString()
            ? "Today"
            : "Back to Today"}
        </ButtonTextOnly>
        <div className="date-active">{formatDate(habbitsDateActive)}</div>
      </div>
      <div className={styles["navbar-top__actions"]}>
        <ButtonIconOnly
          isCircle={true}
          handleClick={() => {
            setDataDetailHabbit(null);
            setShowModal(true);
          }}
          ariaLabel="new habit"
        >
          <ion-icon name="add-outline"></ion-icon>
        </ButtonIconOnly>
        <UserLoginProfile />
      </div>
    </>
  );
};

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isShowDetailUpdate, setIsShowDetailUpdate] = useState(false);
  const [habbits, setHabbits] = useState();
  const [dataDetailHabbit, setDataDetailHabbit] = useState(null);
  const [habbitsDateActive, setHabbitsDateActive] = useState(new Date());
  const [remaindHabbits, setRemaindHabbits] = useState(0);
  const [finishedHabbits, setFinishedHabbits] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowCalendar, setIsShowCalendar] = useState(false);

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
        const filterDate = snapshots.filter((habbit) => {
          const dataActive = Date.parse(habbitsDateActive) + 86400000;
          return (
            Date.parse(habbitsDateActive) <= habbit.data.endDate &&
            dataActive > habbit.data.startDate
          );
        });

        const dataRemaindHabbits = snapshots.filter((habbit) => {
          return habbit.data.isDone === false;
        });
        const dataFinishedHabbits = snapshots.filter((habbit) => {
          return habbit.data.isDone === true;
        });

        setCompletionRate(
          Math.round((dataFinishedHabbits.length / snapshots.length) * 100)
        );
        setFinishedHabbits(dataFinishedHabbits);
        setRemaindHabbits(dataRemaindHabbits);
        setHabbits(filterDate);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHabbitDataFromFirestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habbits, habbitsDateActive]);

  const updateHabbit = (data) => {
    setDataDetailHabbit(data);
    setShowModal(!showModal);
  };

  return (
    <Layout
      navbarTopContent={
        <NavbarTopContent
          setShowModal={setShowModal}
          setDataDetailHabbit={setDataDetailHabbit}
          habbitsDateActive={habbitsDateActive}
        />
      }
    >
      {showModal && (
        <FormHabbit
          setShowModal={setShowModal}
          detailHabbit={dataDetailHabbit}
        />
      )}
      {isShowDetailUpdate && (
        <DetailHabbit
          setValue={setIsShowDetailUpdate}
          dataDetailHabbit={dataDetailHabbit}
          setShowModal={setShowModal}
          remaindHabbits={remaindHabbits}
          finishedHabbits={finishedHabbits}
          completionRate={completionRate}
        />
      )}
      <div className={styles["header-content"]}>
        <div className={styles["header-content__inner"]}>
          <CalendarComponent
            habbitsDateActive={habbitsDateActive}
            setHabbitsDateActive={setHabbitsDateActive}
          />
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
      <div className={styles["main-content"]}>
        <div className={styles["main-content__inner"]}>
          <div className={styles["content"]}>
            <h2>HABIT</h2>
            <div className={styles["habbit-list"]}>
              {isLoading && <Spinner />}
              {habbits?.length === 0 && (
                <Alert type="danger" message="There is no activity today" />
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
                        time={habbit.data.time}
                        data={habbit}
                        deleteHabbitById={() =>
                          deleteHabbit("habbits", habbit.id)
                        }
                        handleUpdateHabbit={() => updateHabbit(habbit)}
                        startDate={formatDate(new Date(habbit.data.startDate))}
                        endDate={formatDate(new Date(habbit.data.endDate))}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="mt-4 mb-5 d-flex justify-content-center">
              <ButtonTextWithIcon
                icon={<ion-icon name="add-outline"></ion-icon>}
                handleClick={() => {
                  setDataDetailHabbit(null);
                  setShowModal(true);
                }}
              >
                Add Habit
              </ButtonTextWithIcon>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
