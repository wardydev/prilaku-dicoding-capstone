import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../config/firebase";
import styles from "./HabbitCard.module.scss";

const HabbitCard = ({
  title,
  iconName,
  color = "#f5f0f05d",
  setValue,
  setDataDetail,
  data,
  deleteHabbitById,
  handleUpdateHabbit,
  time,
  startDate,
  endDate,
}) => {
  const [isShowMoreOptions, setIsShowMoreOptions] = useState(false);
  const [isDone, setIsDone] = useState(data?.data?.isDone);

  const handleDetailHabbit = () => {
    setValue(true);
    setDataDetail(data);
  };

  const handleUpdateHabbitDone = async () => {
    try {
      setIsDone(!isDone);
      const habbitDoc = doc(db, "habbits", data?.id);
      await updateDoc(habbitDoc, {
        isDone: !isDone,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex align-items-center">
      {!isDone && (
        <label className={styles.wrapper}>
          <input
            className={styles.input}
            type="checkbox"
            checked={isDone}
            onChange={handleUpdateHabbitDone}
          />
          <span className={styles.checkmark}></span>
        </label>
      )}
      <div
        className="w-100 rounded rounded-lg p-4 d-flex align-items-center justify-content-between ms-2"
        style={{ backgroundColor: isDone ? "#cccccc42" : color }}
      >
        <div className={styles.contentContainer}>
          <ion-icon
            name={iconName}
            style={{ fontSize: 36, marginBottom: 6 }}
          ></ion-icon>
          <div className={styles.cardTitle}>
            <span className={`${styles.link}`} onClick={handleDetailHabbit}>
              <strong className={isDone && "text-decoration-line-through"}>
                {title}
              </strong>
            </span>
            <div className={styles.habbitCardInfo}>
              <div className="d-flex align-items-center opacity-75 me-3 mb-1">
                <ion-icon
                  name="calendar-outline"
                  style={{ fontSize: 16, color: "yellow" }}
                ></ion-icon>
                <div className="d-flex items-center">
                  <span className="mx-2">{startDate}</span>
                  <span className="mx-2">{endDate}</span>
                </div>
              </div>
              <div className="d-flex align-items-center opacity-75 mb-1">
                <ion-icon
                  name={time.icon}
                  style={{ fontSize: 16, color: "yellow" }}
                ></ion-icon>
                <span className="ms-2">{time.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="position-relative"
          style={{ cursor: "pointer" }}
          onClick={() => setIsShowMoreOptions(!isShowMoreOptions)}
        >
          <ion-icon name="ellipsis-horizontal"></ion-icon>
          {isShowMoreOptions && (
            <div
              className={`text-center py-2 px-2 d-flex flex-column ${styles.options}`}
            >
              <span
                className={`fw-semibold py-1 ${styles.menuOption}`}
                onClick={handleDetailHabbit}
              >
                Detail
              </span>
              <span
                className={`fw-semibold py-1 ${styles.menuOption}`}
                onClick={deleteHabbitById}
              >
                Delete
              </span>
              {!data?.data?.isDone && (
                <span
                  className={`fw-semibold py-1 ${styles.menuOption}`}
                  onClick={handleUpdateHabbit}
                >
                  Edit
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabbitCard;
