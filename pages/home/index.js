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
import { formatDate } from "../../src/utils/functions";
import DetailHabbit from "../../src/components/DetailHabbit";
import { deleteHabbit } from "../../src/utils/firebaseFunc";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isShowDetailUpdate, setIsShowDetailUpdate] = useState(false);
  const [habbits, setHabbits] = useState([]);
  const [dataDetailHabbit, setDataDetailHabbit] = useState(null);

  const getHabbitDataFromFirestore = async () => {
    try {
      const q = query(
        collection(db, "habbits"),
        where("isDone", "==", false),
        where("uid", "==", "wardy")
      );
      onSnapshot(q, (querySnapshot) => {
        setHabbits(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHabbitDataFromFirestore();
  }, []);

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
        />
      )}
      <div className="row my-4">
        <div className="col-7 ms-auto">
          <Header
            title={formatDate(new Date())}
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Joko_Widodo_2019_official_portrait.jpg/1200px-Joko_Widodo_2019_official_portrait.jpg"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <div className="mb-4">
            <ButtonCustom
              title="Tambahkan Habbit"
              isIcon={true}
              size="normal"
              iconName="add"
              handlePress={() => {
                setDataDetailHabbit(null);
                setShowModal(true);
              }}
            />
          </div>
          {habbits?.map((habbit) => {
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
          })}
        </div>
        <div className="col-4">
          <div className="mb-4">
            <Heading title="Date" />
            <CalendarComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
