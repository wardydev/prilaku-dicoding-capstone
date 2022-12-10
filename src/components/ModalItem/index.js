import React from "react";
import styles from "./ModalItem.module.scss";

const ModalItem = ({
  data,
  handlePress,
  itemActive,
  title,
  setData,
  closeModal,
  dataFor,
}) => {
  const handleIconClick = (id, iconName) => {
    handlePress(id, iconName);
    setData(iconName);
    closeModal(false);
  };

  const handleColorPick = (id, hex) => {
    handlePress(id, hex);
    setData(hex);
    closeModal(false);
  };

  return (
    <div className={styles.container}>
      <h5 className="fs-6 opacity-75">{title}</h5>
      <div className="row justify-content-center align-items-center mt-3">
        {dataFor === "ICONS" &&
          data.map((item) => {
            return (
              <div
                className={`col-4 mb-2 me-2 ${styles.icon}`}
                key={item.id}
                onClick={() => handleIconClick(item.id, item.name)}
                style={
                  itemActive === item.id
                    ? { backgroundColor: "#d4d4d434" }
                    : { background: "transparent" }
                }
              >
                <ion-icon
                  name={item.name}
                  style={
                    itemActive === item.id
                      ? { fontSize: 32, color: "yellow" }
                      : { fontSize: 32 }
                  }
                ></ion-icon>
              </div>
            );
          })}

        {dataFor === "COLORS" &&
          data.map((item) => {
            return (
              <div
                className={`col-3 ${styles.icon}`}
                key={item.id}
                onClick={() => handleColorPick(item.id, item.hex)}
                style={
                  itemActive === item.id
                    ? { backgroundColor: "#d4d4d434" }
                    : { background: "transparent" }
                }
              >
                <div
                  style={{
                    width: 30,
                    height: 26,
                    backgroundColor: item.hex,
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ModalItem;
