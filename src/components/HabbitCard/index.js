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
  forHistory,
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

  const formatShortDate = (date) => date.split(",")[1];

  return (
    <div className={styles["habit-item"]}>
      <label className={styles.wrapper}>
        <input
          className={styles.input}
          type="checkbox"
          checked={isDone}
          onChange={handleUpdateHabbitDone}
        />
        {/* <ion-icon name="checkmark" className={styles["checkmark"]}></ion-icon> */}
        <span className={styles.checkmark}></span>
      </label>
      <div
        className={styles["habit-card"]}
        style={{ backgroundColor: isDone ? "#C3C4C5" : color }}
      >
        <div className={styles["habit-card__content"]}>
          <div className={styles["habit-card__icon"]}>
            <ion-icon name={iconName}></ion-icon>
          </div>
          <div className={styles["habit-card__information"]}>
            <div className={styles["habit-card__text"]}>
              <div
                className={styles["habit-card__name"]}
                onClick={handleDetailHabbit}
              >
                <strong
                  className={isDone ? "text-decoration-line-through" : ""}
                >
                  {title}
                </strong>
              </div>
              <div className={styles["habit-card__date"]}>
                <div className={styles["habit-card__date-info"]}>
                  {forHistory ? (
                    <>
                      <ion-icon
                        name="calendar"
                        style={{ fontSize: 16 }}
                      ></ion-icon>
                      <div className={styles["habit-card__endDate"]}>
                        <span style={{ fontSize: "0.9rem" }}>
                          {formatShortDate(startDate)}{" "}
                          {startDate != endDate && `- ${formatShortDate(endDate)}`}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <ion-icon
                        name={time.icon}
                        style={{ fontSize: 16 }}
                      ></ion-icon>
                      <div className={styles["habit-card__endDate"]}>
                        <span>{time.name}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              className={styles["options-opener"]}
              style={{ cursor: "pointer" }}
              onClick={(event) => {
                event.stopPropagation();
                setIsShowMoreOptions(() => !isShowMoreOptions);
              }}
            >
              <div className={styles["options-opener__icon"]}>
                <ion-icon name="ellipsis-horizontal"></ion-icon>
              </div>
              {isShowMoreOptions && (
                <div
                  className={`text-center px-2 d-flex flex-column ${styles.options}`}
                >
                  <div
                    className={`fw-semibold ${styles.menuOption}`}
                    onClick={handleDetailHabbit}
                  >
                    Detail
                  </div>
                  <div
                    className={`fw-semibold ${styles.menuOption}`}
                    onClick={deleteHabbitById}
                  >
                    Delete
                  </div>
                  {!data?.data?.isDone && (
                    <div
                      className={`fw-semibold ${styles.menuOption}`}
                      onClick={handleUpdateHabbit}
                    >
                      Edit
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabbitCard;
