import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ children, setValue }) => {
  return (
    <main className={styles.main}>
      <div className={styles.closeIcon} onClick={() => setValue(false)}>
        <ion-icon name="close-outline" style={{ fontSize: 36 }}></ion-icon>
      </div>
      <div className={`row justify-content-center ${styles.content}`}>
        <div
          className="col-12 px-4 py-4"
          style={{ backgroundColor: "black", minHeight: "100vh" }}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default Modal;
