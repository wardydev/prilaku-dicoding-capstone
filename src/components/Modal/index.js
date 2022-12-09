import React from "react";
import ButtonIconOnly from "../ButtonIconOnly";
import styles from "./Modal.module.scss";

const Modal = ({ children, setValue }) => {
  return (
    <div className={styles["modal-custom"]}>
      <div className={styles["modal-custom__inner"]}>
        <div className={styles["close-modal"]}>
          <ButtonIconOnly
            handleClick={(event) => {
              event.stopPropagation();
              setValue(false)
            }}
            ariaLabel="Close modal"
            isCircle={true}
            bgColor="#C3C4C5"
          >
            <ion-icon name="close"></ion-icon>
          </ButtonIconOnly>
        </div>
        <div className={styles["modal-content"]}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
