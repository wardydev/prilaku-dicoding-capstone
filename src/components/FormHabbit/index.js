import { useState, useRef } from "react";
import styles from "./FormHabbit.module.scss";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

import Modal from "../Modal";
import Heading from "../Heading";
import Card from "../Card";
import CalendarComponent from "../CalendarComponent";
import AtTime from "../AtTime";
import ButtonCustom from "../ButtonCustom";
import { DATAICONS, DATATIME, DATACOLORS } from "../../utils/constants";
import ModalItem from "../ModalItem";
import { db } from "../../config/firebase";
import Spinner from "../Spinner";

const FormHabbit = ({ setShowModal, detailHabbit }) => {
  const habbitNameRef = useRef();
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [showModalIcons, setShowModalIcons] = useState(false);
  const [isShowModalColors, setIsModalColors] = useState(false);
  const [iconIdActive, setIconIdActive] = useState();
  const [colorIdActive, setColorIdActive] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [habbitName, setHabbitName] = useState(
    detailHabbit !== null ? detailHabbit.data.name : ""
  );
  const [iconName, setIconName] = useState(
    detailHabbit !== null ? detailHabbit.data.icon : "american-football-outline"
  );
  const [colorHex, setColorHex] = useState(
    detailHabbit !== null ? detailHabbit.data.color : "white"
  );
  const [note, setNote] = useState(
    detailHabbit !== null ? detailHabbit.data.note : ""
  );
  const [dateValue, setDateValue] = useState(
    detailHabbit !== null ? detailHabbit.data.date.toDate() : new Date()
  );
  const [atTimevalue, setAtTimeValue] = useState();

  const handlePenClick = () => {
    habbitNameRef.current.focus();
    setIsFullWidth(!isFullWidth);
  };

  const handlePress = (id) => {
    setIconIdActive(id);
  };
  const handleActiveColor = (id) => {
    setColorIdActive(id);
  };

  const addHabbitToFirestore = async () => {
    setIsLoading(true);
    try {
      const data = {
        name: habbitName,
        icon: iconName,
        color: colorHex,
        note: note,
        date: dateValue,
        time: atTimevalue,
        isDone: false,
        created: Timestamp.now(),
        uid: "wardy",
      };

      const habbit = await addDoc(collection(db, "habbits"), data);
      if (habbit) {
        setShowModal(false);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateHabbitToFirestore = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "habbits", detailHabbit.id);
      await updateDoc(docRef, {
        name: habbitName,
        icon: iconName,
        color: colorHex,
        note: note,
        date: dateValue,
        time: atTimevalue,
        created: Timestamp.now(),
      });
      setShowModal(false);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const _checkTitleButton = () => {
    return detailHabbit !== null ? "Edit Habbit" : "Tambah Habbit";
  };

  return (
    <Modal setValue={setShowModal}>
      <div className="d-flex align-items-center mb-4">
        <input
          type="text"
          placeholder="Habbit name"
          className={`rounded rounded-lg py-2 me-4 px-3 ${
            isFullWidth ? styles.inputHabbit : styles.inputHabbitFocus
          }`}
          ref={habbitNameRef}
          value={habbitName}
          onChange={(e) => {
            setHabbitName(e.target.value);
            setIsFullWidth(true);
          }}
        />
        {!isFullWidth && (
          <ion-icon
            name="pencil-outline"
            style={{ fontSize: 26, cursor: "pointer" }}
            onClick={handlePenClick}
          ></ion-icon>
        )}
      </div>
      <div className="mb-4">
        <Heading title="Pilih Icon" />
        <Card>
          <div className="d-flex align-items-center p-2">
            <ion-icon
              name={iconName}
              style={{ fontSize: 48, color: colorHex }}
            ></ion-icon>
            <div className="ms-5 w-100">
              <div style={{ position: "relative" }}>
                <h4
                  style={{ cursor: "pointer", cursor: "pointer" }}
                  onClick={() => setShowModalIcons(!showModalIcons)}
                >
                  {iconName === "american-football-outline"
                    ? "Pilih Icon"
                    : iconName}
                </h4>
                {showModalIcons && (
                  <ModalItem
                    data={DATAICONS}
                    handlePress={(id) => handlePress(id)}
                    itemActive={iconIdActive}
                    title="Icons"
                    setData={setIconName}
                    closeModal={setShowModalIcons}
                    dataFor="ICONS"
                  />
                )}
              </div>
              <hr />
              <div style={{ position: "relative" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h4
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsModalColors(!isShowModalColors)}
                  >
                    Color
                  </h4>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: colorHex,
                      cursor: "pointer",
                    }}
                    onClick={() => setIsModalColors(!isShowModalColors)}
                  ></div>
                </div>
                {isShowModalColors && (
                  <ModalItem
                    data={DATACOLORS}
                    handlePress={(id) => handleActiveColor(id)}
                    itemActive={colorIdActive}
                    title="Popular Colors"
                    setData={setColorHex}
                    closeModal={setIsModalColors}
                    dataFor="COLORS"
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="mb-4">
        <Heading title="Notes" />
        <textarea
          name="sdfsdf"
          rows="5"
          placeholder="Placeholder textarea"
          className="w-100 form-control rounded rounded-lg p-3 shadow-none"
          style={{
            backgroundColor: "#f5f0f05d",
            color: "white",
            outline: "none",
            border: "none",
          }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="d-flex mb-4">
        <div>
          <Heading title="Pilih Tanggal" />
          <CalendarComponent
            value={dateValue}
            setValue={setDateValue}
            activeStartDate={dateValue}
          />
        </div>
        <div className="ms-5">
          <Heading title="At Time" />
          <AtTime data={DATATIME} setValue={setAtTimeValue} />
        </div>
      </div>
      <ButtonCustom
        title={isLoading ? <Spinner /> : _checkTitleButton()}
        isFullWidth={true}
        size="large"
        color="#1AB0B0"
        handlePress={
          detailHabbit !== null ? updateHabbitToFirestore : addHabbitToFirestore
        }
      />
    </Modal>
  );
};

export default FormHabbit;
