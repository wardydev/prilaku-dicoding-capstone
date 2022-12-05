import { useState, useRef, useEffect } from "react";
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
import { getUserInfo } from "../../utils/functions";

const FormHabbit = ({
  setShowModal,
  detailHabbit,
  setShowSelectTypeModal,
  habbitType: type,
}) => {
  const habbitNameRef = useRef();
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [showModalIcons, setShowModalIcons] = useState(false);
  const [isShowModalColors, setIsModalColors] = useState(false);
  const [iconIdActive, setIconIdActive] = useState();
  const [colorIdActive, setColorIdActive] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const userSigned = JSON.parse(getUserInfo());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();

  const HabbitType = {
    regular: {
      name: "Regular habbit",
      color: "blue",
      date: new Date(),
      isDone: false,
    },
    negative: {
      name: "Negative habbit",
      color: "red",
      date: new Date(),
      isDone: true,
    },
    "one-time": {
      name: "One time habbit",
      color: "purple",
      date: new Date(),
      isDone: false,
    },
  };

  const [habbitName, setHabbitName] = useState(
    detailHabbit !== null ? detailHabbit.data.name : ""
  );
  const [iconName, setIconName] = useState(
    detailHabbit !== null ? detailHabbit.data.icon : "american-football-outline"
  );
  const [colorHex, setColorHex] = useState(
    detailHabbit !== null ? detailHabbit.data.color : HabbitType[type]?.color
  );
  const [note, setNote] = useState(
    detailHabbit !== null ? detailHabbit.data.note : ""
  );
  const [atTimevalue, setAtTimeValue] = useState(null);

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
    if (_checkDataInputed()) {
      return;
    }
    setIsLoading(true);
    try {
      const data = {
        name: habbitName,
        icon: iconName,
        color: colorHex,
        note: note,
        time: atTimevalue,
        isDone: HabbitType[type].isDone,
        created: Timestamp.now(),
        uid: userSigned.user.uid,
        startDate: Date.parse(startDate),
        endDate: Date.parse(endDate),
      };

      const habbit = await addDoc(collection(db, "habbits"), data);
      if (habbit) {
        setShowModal(false);
        setShowSelectTypeModal(false);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateHabbitToFirestore = async () => {
    if (_checkDataInputed()) {
      return;
    }
    setIsLoading(true);
    try {
      const docRef = doc(db, "habbits", detailHabbit.id);
      await updateDoc(docRef, {
        name: habbitName,
        icon: iconName,
        color: colorHex,
        note: note,
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
    return detailHabbit !== null ? "Update Habit" : "Create Habit";
  };

  const _checkDataInputed = () => {
    return habbitName === "" || note === "" || atTimevalue === null;
  };

  useEffect(() => {
    if (!_checkDataInputed()) {
      setDisabledButton(false);
    }
  }, [habbitName, note, atTimevalue]);

  return (
    <Modal setValue={setShowModal}>
      <div className={`${styles['habbit-form']} mb-4`}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Habbit name"
            className={`form-control ${styles['habbit-form']}`}
            ref={habbitNameRef}
            value={habbitName}
            onChange={(e) => {
              setHabbitName(e.target.value);
              setIsFullWidth(true);
            }}
            autoFocus={true}
          />
        </div>
        <p className={styles['habbit-type']}>{HabbitType[type].name}</p>
        {/* {!isFullWidth && (
          <ion-icon
            name="pencil-outline"
            style={{ fontSize: 26, cursor: "pointer" }}
            onClick={handlePenClick}
          ></ion-icon>
        )} */}
      </div>
      <div className="mb-4">
        <Heading title="Icon" />
        <Card color="#21242b">
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
                    ? "Choose Icon"
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
          name="notes"
          rows="5"
          placeholder="Write notes"
          className="w-100 form-control rounded rounded-lg p-3 shadow-none"
          style={{
            backgroundColor: "#21242b",
            color: "white",
            outline: "none",
            border: "none",
          }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {/* <div>
          <Heading title="Choose Date" />
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div> */}
        <div className="">
          <Heading title="Do it At" />
          <AtTime data={DATATIME} setValue={setAtTimeValue} />
        </div>
      </div>
      <div className="mb-5">
        <ButtonCustom
          title={isLoading ? <Spinner /> : _checkTitleButton()}
          isFullWidth={true}
          size="large"
          color="#2f7fe2"
          handlePress={
            detailHabbit !== null ? updateHabbitToFirestore : addHabbitToFirestore
          }
          isDisabled={disabledButton}
        />
      </div>
    </Modal>
  );
};

export default FormHabbit;
