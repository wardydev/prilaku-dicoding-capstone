import { useState, useRef } from "react";
import styles from "./FormHabbit.module.scss";

import Modal from "../Modal";
import Heading from "../Heading";
import Card from "../Card";
import CalendarComponent from "../CalendarComponent";
import CardRate from "../CardRate";
import AtTime from "../AtTime";
import ButtonCustom from "../ButtonCustom";

const FormHabbit = () => {
  const habbitNameRef = useRef();
  const [isFullWidth, setIsFullWidth] = useState(false);

  const handlePenClick = () => {
    habbitNameRef.current.focus();
    setIsFullWidth(!isFullWidth);
  };

  return (
    <Modal>
      <div className="d-flex align-items-center mb-4">
        <input
          type="text"
          placeholder="Habbit name"
          className={isFullWidth ? styles.inputHabbit : styles.inputHabbitFocus}
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
              name="american-football-outline"
              style={{ fontSize: 48 }}
            ></ion-icon>
            <div className="ms-5 w-75">
              <h3>Icons</h3>
              <hr />
              <h3>Color</h3>
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
        />
      </div>
      <div className="d-flex mb-4">
        <div>
          <Heading title="Pilih Tanggal" />
          <CalendarComponent />
        </div>
        <div className="ms-5">
          <Heading title="At Time" />
          <AtTime />
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
