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
      <label className={styles.wrapper}>
        <input
          className={styles.input}
          type="checkbox"
          checked={isDone}
          onChange={handleUpdateHabbitDone}
        />
        <span className={styles.checkmark}></span>
      </label>
      <div
        className="w-100 rounded rounded-lg p-4 d-flex align-items-center justify-content-between ms-2"
        style={{ backgroundColor: isDone ? "#cccccc42" : color }}
      >
        <div className="d-flex align-items-center">
          <ion-icon name={iconName}></ion-icon>
          <span
            className={`ms-3 fw ${styles.link}`}
            onClick={handleDetailHabbit}
          >
            <strong className={isDone && "text-decoration-line-through"}>
              {title}
            </strong>
          </span>
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
                Hapus
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
