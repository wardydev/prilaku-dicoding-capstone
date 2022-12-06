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

const History = () => {
  const [isShowDetailUpdate, setIsShowDetailUpdate] = useState(false);
  const [habbits, setHabbits] = useState([]);
  const [dataDetailHabbit, setDataDetailHabbit] = useState();
  const [habbitsDateActive, setHabbitsDateActive] = useState(new Date());
  const [remaindHabbits, setRemaindHabbits] = useState(0);
  const [finishedHabbits, setFinishedHabbits] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);

  const getHabbitDataFromFirestore = async () => {
    try {
      const userSigned = JSON.parse(getUserInfo());
      const q = query(
        collection(db, "habbits"),
        where("isDone", "==", true),
        where("uid", "==", userSigned.user.uid)
      );
      onSnapshot(q, (querySnapshot) => {
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
          (100 * dataFinishedHabbits.length) / snapshots.length
        );

        setRemaindHabbits(dataRemaindHabbits);
        setFinishedHabbits(dataFinishedHabbits);
        setHabbits(snapshots);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHabbitDataFromFirestore();
  }, [habbitsDateActive]);

  return (
    <Layout>
      {isShowDetailUpdate && (
        <DetailHabbit
          setValue={setIsShowDetailUpdate}
          dataDetailHabbit={dataDetailHabbit}
          setShowModal={false}
        />
      )}
      <div className="card-rate__responsive-top my-3">
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
      </div>
      <div className="row my-4">
        <div className="col-12 col-lg-7 w-100">
          <Header
            title={formatDate(habbitsDateActive)}
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Joko_Widodo_2019_official_portrait.jpg/1200px-Joko_Widodo_2019_official_portrait.jpg"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-8 mb-4">
          <Heading title="Habit Finished" />
          {habbits?.length === 0 ? (
            <Alert type="danger" message="You don't have finished activity" />
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
                    time={habbit.data.time}
                    startDate={formatDate(new Date(habbit.data.startDate))}
                    endDate={formatDate(new Date(habbit.data.endDate))}
                  />
                </div>
              );
            })
          )}
        </div>
        <div className="card-rate__responsive-bottom col-12 col-lg-4">
          <div className="mb-4">
            <Heading title="Date" />
            <div className="row">
              <div className="col-6 mb-3">
                <CardRate
                  color="#7F00FF"
                  rateName="Unfinished Habit"
                  rateCount={remaindHabbits.length}
                  message="You can do it!"
                />
              </div>
              <div className="col-6 mb-3">
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
    </Layout>
  );
};

export default History;
