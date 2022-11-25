import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

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

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isShowDetailUpdate, setIsShowDetailUpdate] = useState(false);
  const [habbits, setHabbits] = useState([]);
  const [dataDetailHabbit, setDataDetailHabbit] = useState(null);
  const [habbitsDateActive, setHabbitsDateActive] = useState(new Date());
  const [remaindHabbits, setRemaindHabbits] = useState(0);
  const [finishedHabbits, setFinishedHabbits] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);

  const getHabbitDataFromFirestore = async () => {
    try {
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
    <Layout>
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
      <div className="row my-4">
        <div className="col-7 ms-auto">
          <Header
            title={formatDate(habbitsDateActive)}
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Joko_Widodo_2019_official_portrait.jpg/1200px-Joko_Widodo_2019_official_portrait.jpg"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <div className="mb-4">
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
          {habbits.length === 0 ? (
            <p>There is no activity today</p>
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
                    data={habbit}
                    deleteHabbitById={() => deleteHabbit("habbits", habbit.id)}
                    handleUpdateHabbit={() => updateHabbit(habbit)}
                  />
                </div>
              );
            })
          )}
        </div>
        <div className="col-4">
          <div className="mb-4">
            <Heading title="Date" />
            <CalendarComponent
              value={habbitsDateActive}
              setValue={setHabbitsDateActive}
              activeStartDate={habbitsDateActive}
            />
          </div>
          <div>
            <Heading title="Summary" />
            <div className="row">
              <div className="col-6">
                <CardRate
                  color="#7F00FF"
                  rateName="Unfinished Habit"
                  rateCount={remaindHabbits.length}
                  message="You can do it!"
                />
              </div>
              <div className="col-6">
                <CardRate
                  color="#7F00FF"
                  rateName="Habit Finished"
                  rateCount={finishedHabbits.length}
                  message="Trust the process!"
                />
              </div>
              <div className="col-6 mb-3">
                <CardRate
                  color="#7F00FF"
                  rateName="Completion Rate"
                  rateCount={`${Math.round(completionRate)}%`}
                  message="Belive in yourself!"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
