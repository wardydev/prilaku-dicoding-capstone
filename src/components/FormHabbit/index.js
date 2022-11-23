import { useState, useRef } from "react";
import styles from "./FormHabbit.module.scss";

import Modal from "../Modal";
import Heading from "../Heading";
import Card from "../Card";
import CalendarComponent from "../CalendarComponent";
import AtTime from "../AtTime";
import ButtonCustom from "../ButtonCustom";
import { DATAICONS, DATATIME, DATACOLORS } from "../../utils/constants";
import ModalItem from "../ModalItem";

const FormHabbit = ({ setShowModal, showModal }) => {
  const habbitNameRef = useRef();
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [showModalIcons, setShowModalIcons] = useState(false);
  const [isShowModalColors, setIsModalColors] = useState(false);
  const [iconIdActive, setIconIdActive] = useState();
  const [colorIdActive, setColorIdActive] = useState();

  const [iconName, setIconName] = useState("american-football-outline");
  const [colorHex, setColorHex] = useState("white");
  const [description, setDescription] = useState("");
  const [dateValue, setDateValue] = useState(new Date());
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

  return (
    <Modal>
      <div
        className={styles.closeIcon}
        onClick={() => setShowModal(!showModal)}
      >
        <ion-icon name="close-outline" style={{ fontSize: 36 }}></ion-icon>
      </div>
      <div className="d-flex align-items-center mb-4">
        <input
          type="text"
          placeholder="Habbit name"
          className={`rounded rounded-lg py-2 me-4 px-3 ${
            isFullWidth ? styles.inputHabbit : styles.inputHabbitFocus
          }`}
          ref={habbitNameRef}
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
            <div className="ms-5 w-75">
              <div style={{ position: "relative" }}>
                <h4
                  style={{ cursor: "pointer", cursor: "pointer" }}
                  onClick={() => setShowModalIcons(!showModalIcons)}
                >
                  Icons
                </h4>
                {showModalIcons && (
                  <ModalItem
                    data={DATAICONS}
                    handlePress={(id) => handlePress(id)}
                    itemActive={iconIdActive}
                    title="Popular Icons"
                    setData={setIconName}
                    closeModal={setShowModalIcons}
                    dataFor="ICONS"
                  />
                )}
              </div>
              <hr />
              <div style={{ position: "relative" }}>
                <h4
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsModalColors(!isShowModalColors)}
                >
                  Color
                </h4>
                {isShowModalColors && (
                  <ModalItem
                    data={DATACOLORS}
                    handlePress={(id) => handleActiveColor(id)}
                    itemActive={colorIdActive}
                    title="Popular Colors"
                    setData={setColorHex}
                    closeModal={setShowModalIcons}
                    dataFor="COLORS"
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="mb-4">
        <Heading title="Description" />
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="d-flex mb-4">
        <div>
          <Heading title="Pilih Tanggal" />
          <CalendarComponent value={dateValue} setValue={setDateValue} />
        </div>
        <div className="ms-5">
          <Heading title="At Time" />
          <AtTime data={DATATIME} setValue={setAtTimeValue} />
        </div>
      </div>
      <ButtonCustom
        title="Tambah Habbit"
        isFullWidth={true}
        size="large"
        color="#1AB0B0"
      />
    </Modal>
  );
};

export default FormHabbit;
