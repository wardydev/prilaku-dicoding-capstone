import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../src/config/firebase";
import ButtonCustom from "../../src/components/ButtonCustom";
import CalendarComponent from "../../src/components/CalendarComponent";
import FormHabbit from "../../src/components/FormHabbit";
import HabbitCard from "../../src/components/HabbitCard";
import Header from "../../src/components/Header";
import Heading from "../../src/components/Heading";
import Layout from "../../src/components/Layout";
import { formatDate, getUserInfo } from "../../src/utils/functions";
import DetailHabbit from "../../src/components/DetailHabbit";
import { deleteHabbit } from "../../src/utils/firebaseFunc";
import CardRate from "../../src/components/CardRate";
import Spinner from "../../src/components/Spinner";
import Alert from "../../src/components/Alert";
import HabbitTypeSelector from "../../src/components/HabbitTypeSelector";
import ButtonIconOnly from "../../src/components/ButtonIconOnly";
import { HiPlus } from "react-icons/hi";
import NavbarBottom from "../../src/components/NavbarBottom";
import Sidebar from "../../src/components/Sidebar";
import styles from "./Home.module.scss";

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

        const habbitByDate = snapshots.filter((habbit) => {
          return (
            habbit.data.date.toDate().getDate() === habbitsDateActive.getDate()
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
        setHabbits(habbitByDate);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHabbitDataFromFirestore();
  }, [habbits, habbitsDateActive]);

  const updateHabbit = (data) => {
    setDataDetailHabbit(data);
    setShowModal(!showModal);
  };

  return (
    <>
      <Sidebar />
      <div className={styles['home-page']}>
        {showModal && (
          <HabbitTypeSelector 
            setShowSelectTypeModal={setShowModal} 
            dataDetailHabbit={dataDetailHabbit} 
            setDataDetailHabbit={setDataDetailHabbit}
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
        <NavbarBottom />
        <div className={styles['header-content']}>
          <div className="container">
            <Header title={formatDate(habbitsDateActive)}>
              <ButtonIconOnly isCircle={true}>
                <HiPlus />
              </ButtonIconOnly>
            </Header>
          </div>
          <div className={styles['date-picker']}>
            <CalendarComponent
              value={habbitsDateActive}
              setValue={setHabbitsDateActive}
              activeStartDate={habbitsDateActive}
            />
          </div>
        </div>
        <div className={styles['main-content']}>
          <div className={styles['main-content__inner']}>
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

            <div className={`${styles['add-habbit']} mt-4`}>
              <ButtonCustom
                title="Create New Habit"
                isIcon={true}
                size="normal"
                iconName="add"
                handlePress={() => {
                  setDataDetailHabbit(null);
                  setShowModal(true);
                }}
              />
            </div>
            <div className="mt-4">
              <Heading title="Summary" />
              <div className="row gap-2">
                <div className="col-12">
                  <CardRate
                    color="#303242"
                    rateName="Unfinished Habit"
                    rateCount={remaindHabbits.length}
                    message="You can do it!"
                  />
                </div>
                <div className="col-12">
                  <CardRate
                    color="#303242"
                    rateName="Habit Finished"
                    rateCount={finishedHabbits.length}
                    message="Trust the process!"
                  />
                </div>
                <div className="col-12">
                  <CardRate
                    color="#303242"
                    rateName="Completion Rate"
                    rateCount={`${
                      habbits?.length === 0 ? "0" : Math.round(completionRate)
                    }%`}
                    message="Belive in yourself!"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
