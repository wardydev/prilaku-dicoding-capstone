import { useState, useRef, useEffect } from "react";
import styles from "./FormHabbit.module.scss";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";

import Modal from "../Modal";
import Heading from "../Heading";
import Card from "../Card";
// import CalendarComponent from "../CalendarComponent";
import AtTime from "../AtTime";
import ButtonCustom from "../ButtonCustom";
import { DATAICONS, DATATIME, DATACOLORS } from "../../utils/constants";
import ModalItem from "../ModalItem";
import { db } from "../../config/firebase";
import Spinner from "../Spinner";
import { formatDate, formatterDateToObject, getUserInfo } from "../../utils/functions";
import CalendarComponent from "../CalendarComponent";

const FormHabbit = ({
  setShowModal,
  detailHabbit,
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
  const [startDate, setStartDate] = useState(() => new Date());
  const [endDate, setEndDate] = useState();
  const [selectedDayRange, setSelectedDayRange] = useState({
    from:
      detailHabbit !== null
        ? formatterDateToObject(new Date(detailHabbit.data.startDate))
        : formatterDateToObject(new Date()),
    to:
      detailHabbit !== null
        ? formatterDateToObject(new Date(detailHabbit.data.endDate))
        : null,
  });

  const [habbitName, setHabbitName] = useState(
    detailHabbit !== null ? detailHabbit.data.name : ""
  );
  const [iconName, setIconName] = useState(
    detailHabbit !== null ? detailHabbit.data.icon : "accessibility-outline"
  );
  const [colorHex, setColorHex] = useState(
    detailHabbit !== null ? detailHabbit.data.color : "#419CE5"
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
        isDone: false,
        created: Timestamp.now(),
        uid: userSigned.user.uid,
        startDate: Date.parse(startDate),
        endDate: Date.parse(endDate)
          ? Date.parse(endDate)
          : Date.parse(startDate),
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
        startDate: Date.parse(startDate),
        endDate: Date.parse(endDate)
          ? Date.parse(endDate)
          : Date.parse(startDate),
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

  const handleSelectedDay = (selected) => {
    setSelectedDayRange(selected);
    setStartDate(
      new Date([selected.from.month, selected.from.day, selected.from.year])
    );
    setEndDate(
      new Date([selected?.to?.month, selected?.to?.day, selected?.to?.year])
    );
  };

  useEffect(() => {
    if (!_checkDataInputed()) {
      setDisabledButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      </div>

      <div className="mb-4">
        <Heading title="Icon" />
        <Card>
          <div className="d-flex align-items-center p-2">
            <ion-icon
              name={iconName}
              style={{ fontSize: 48, color: colorHex }}
            ></ion-icon>
            <div className="ms-5 w-100">
              <div style={{ position: "relative" }}>
                <h4
                  style={{ cursor: "pointer", fontSize: "inherit" }}
                  onClick={() => setShowModalIcons(!showModalIcons)}
                >
                  {iconName === "accessibility-outline"
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
              <hr style={{borderTop: '1px solid rgb(95 99 104 / 75%)'}}/>
              <div style={{ position: "relative" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h4
                    style={{ cursor: "pointer", fontSize: "inherit" }}
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
            backgroundColor: "rgb(235 236 236 / 50%)",
            color: "#272828",
            outline: "none",
            border: "none",
          }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className={styles["dateAndTime"]}>
        <div>
          <Heading title="Choose Date" />
          <Calendar
            value={selectedDayRange}
            onChange={(selected) => handleSelectedDay(selected)}
            shouldHighlightWeekends
            colorPrimary="#5899E8"
            colorPrimaryLight="#CBDDF3"
            calendarClassName="Calendar__modal"
          />
        </div>
        <div>
          <Heading title="At Time" />
          <AtTime data={DATATIME} setValue={setAtTimeValue} />
        </div>
      </div>
      <ButtonCustom
        title={isLoading ? <Spinner /> : _checkTitleButton()}
        isFullWidth={true}
        size="large"
        color="#5899E8"
        handlePress={
          detailHabbit !== null ? updateHabbitToFirestore : addHabbitToFirestore
        }
        isDisabled={disabledButton}
      />
    </Modal>
  );
};

export default FormHabbit;
