import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../src/config/firebase";
import CalendarComponent from "../../src/components/CalendarComponent";
import HabbitCard from "../../src/components/HabbitCard";
import Header from "../../src/components/Header";
import Heading from "../../src/components/Heading";
import Layout from "../../src/components/Layout";
import { formatDate, getUserInfo } from "../../src/utils/functions";
import DetailHabbit from "../../src/components/DetailHabbit";
import { deleteHabbit } from "../../src/utils/firebaseFunc";
import Alert from "../../src/components/Alert";

const History = () => {
  const [isShowDetailUpdate, setIsShowDetailUpdate] = useState(false);
  const [habbits, setHabbits] = useState([]);
  const [dataDetailHabbit, setDataDetailHabbit] = useState();
  const [habbitsDateActive, setHabbitsDateActive] = useState(new Date());

  const getHabbitDataFromFirestore = async () => {
    try {
      const userSigned = JSON.parse(getUserInfo());
      const q = query(
        collection(db, "habbits"),
        where("isDone", "==", true),
        where("uid", "==", userSigned.user.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        setHabbits(
          querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
            .filter((habbitByDate) => {
              return (
                habbitByDate.data.date.toDate().getDate() ===
                habbitsDateActive.getDate()
              );
            })
        );
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
      <div className="row my-4">
        <div className="col-12 col-lg-7 ms-auto">
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
                  />
                </div>
              );
            })
          )}
        </div>
        <div className="col-12 col-lg-4">
          <div className="mb-4">
            <Heading title="Date" />
            <CalendarComponent
              value={habbitsDateActive}
              setValue={setHabbitsDateActive}
              activeStartDate={habbitsDateActive}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
