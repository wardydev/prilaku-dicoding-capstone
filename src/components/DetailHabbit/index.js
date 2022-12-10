import React from "react";

import { deleteHabbit } from "../../utils/firebaseFunc";
import { formatDate } from "../../utils/functions";
import ButtonCustom from "../ButtonCustom";
import Modal from "../Modal";
import styles from "./DetailHabbit.module.scss";

const DetailHabbit = ({ setValue, dataDetailHabbit, setShowModal }) => {
  const startDate = formatDate(new Date(dataDetailHabbit.data.startDate)).split(
    ","
  )[1];
  const endDate = formatDate(new Date(dataDetailHabbit.data.endDate)).split(
    ","
  )[1];
  
  return (
    <Modal setValue={setValue}>
      <div className={styles["habit-detail"]}>
        <h3>HABIT NAME</h3>
        <div className={styles["habit-detail__name"]}>
          <p>{dataDetailHabbit?.data?.name}</p>
        </div>

        <h3>DATE</h3>
        <div className={styles["habit-detail__date"]}>
          <p>
            {startDate} {startDate != endDate && `- ${endDate}`}
          </p>
        </div>

        <h3>AT TIME</h3>
        <div className={styles["habit-detail__name"]}>
          <p>{dataDetailHabbit?.data?.time?.name}</p>
        </div>

        <h3>NOTES</h3>
        <div className={styles["habit-detail__notes"]}>
          <p>{dataDetailHabbit?.data?.note}</p>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-center">
        {dataDetailHabbit.data.isDone == false && (
          <div className="me-3">
            <ButtonCustom
              title="Edit"
              size="normal"
              iconName="create"
              color="#5899E8"
              isIcon={true}
              handlePress={() => {
                setShowModal(true);
                setValue(false);
              }}
            />
          </div>
        )}
        <ButtonCustom
          title="Delete"
          size="normal"
          iconName="trash"
          color="#eb6868"
          isIcon={true}
          handlePress={() => {
            setValue(false);
            deleteHabbit("habbits", dataDetailHabbit.id);
          }}
        />
      </div>
    </Modal>
  );
};

export default DetailHabbit;
