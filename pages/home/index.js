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
      setIsLoading(false);
      const userSigned = JSON.parse(getUserInfo());
      const q = query(
        collection(db, "habbits"),
        where("uid", "==", userSigned.user.uid)
      );
      onSnapshot(q, (querySnapshot) => {
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
          (100 * dataFinishedHabbits.length) / snapshots.length
        );

        setFinishedHabbits(dataFinishedHabbits);
        setRemaindHabbits(dataRemaindHabbits);
        setHabbits(filterDate);
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
    <section className={styles["home-page"]}>
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
      <NavbarLeftBottom />
      <NavbarTop>
        <div className={styles["logo"]}>
          <Logo />
          <span>Prilaku</span>
        </div>
        <div className={styles['navbar-top__information']}>
          <ButtonTextOnly>Today</ButtonTextOnly>
          <div className="date-active">{formatDate(habbitsDateActive)}</div>
        </div>
        <div className={styles['navbar-top__actions']}>
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
      </NavbarTop>
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
                  rateCount={`${
                    habbits?.length === 0 ? "0" : Math.round(completionRate)
                  }%`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className={styles["main-content"]}>
        <div className={styles["main-content__inner"]}>
          <div className={styles["content"]}>
            <h2>EVERYTIME</h2>
            <div className={styles['habbit-list']}>
              {isLoading ? (<Spinner />) : 
                (habbits?.length
                  ? 
                  <>
                    {
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
                              deleteHabbitById={() => deleteHabbit("habbits", habbit.id)}
                              handleUpdateHabbit={() => updateHabbit(habbit)}
                              startDate={formatDate(new Date(habbit.data.startDate))}
                              endDate={formatDate(new Date(habbit.data.endDate))}
                            />
                          </div>
                        );
                      })
                    }
                  </>
                  : <Alert type="danger" message="There is no activity today" /> 
                )
              }
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
      </main>
      <Footer />
      
      {/* <Layout> */}
        {/* <div className="card-rate__responsive-top my-3">
          <div className="row">
            <div className="col-4">
              <CardRate
                color="#7F00FF"
                rateName="Unfinished Habit"
                rateCount={remaindHabbits.length}
                message="You can do it!"
              />
            </div>
            <div className="col-4">
              <CardRate
                color="#7F00FF"
                rateName="Habit Finished"
                rateCount={finishedHabbits.length}
                message="Trust the process!"
              />
            </div>
            <div className="col-4">
              <CardRate
                color="#7F00FF"
                rateName="Completion Rate"
                rateCount={`${
                  habbits?.length === 0 ? "0" : Math.round(completionRate)
                }%`}
                message="Belive in yourself!"
              />
            </div>
          </div>
        </div> */}

        {/* <div className="calendar-top my-4">
          <ButtonCustom
            title="Show Calendar"
            isFullWidth={true}
            isIcon={true}
            iconName="calendar"
            color="#FF844B"
            handlePress={() => setIsShowCalendar(!isShowCalendar)}
          />
        </div>
        {isShowCalendar && (
          <div className="calendar-top mb-4">
            <Calendar
              value={formatterDateToObject(habbitsDateActive)}
              onChange={(selected) =>
                setHabbitsDateActive(
                  new Date([selected.month, selected.day, selected.year])
                )
              }
              colorPrimary="#F58349"
              colorPrimaryLight="#FBCEB6"
              shouldHighlightWeekends
            />
          </div>
        )} */}
        {/* <div className="row my-4">
          <div className="col-12 col-lg-7 w-100">
            <Header
              title={formatDate(habbitsDateActive)}
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Joko_Widodo_2019_official_portrait.jpg/1200px-Joko_Widodo_2019_official_portrait.jpg"
            />
          </div>
        </div> */}
        
          {/* <ButtonCustom
            title="Create New Habit"
            isIcon={true}
            size="normal"
            iconName="add"
            handlePress={() => {
              setDataDetailHabbit(null);
              setShowModal(true);
            }}
          /> */}
        {/* <div className="row mb-4"> */}
          {/* <div className="col-12 col-lg-8 mb-4">
            <div className="mb-4">
            </div>
            {isLoading ? (
              <Spinner />
            ) : (
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
                      deleteHabbitById={() => deleteHabbit("habbits", habbit.id)}
                      handleUpdateHabbit={() => updateHabbit(habbit)}
                      startDate={formatDate(new Date(habbit.data.startDate))}
                      endDate={formatDate(new Date(habbit.data.endDate))}
                    />
                  </div>
                );
              })
            )}
            {habbits?.length === 0 && (
              <Alert type="danger" message="There is no activity today" />
            )}
          </div> */}
        {/* </div>
      </Layout> */}
    </section>
  );
};

export default Home;
