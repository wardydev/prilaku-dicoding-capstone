import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.closeIcon}>
        <ion-icon name="close-outline" style={{ fontSize: 36 }}></ion-icon>
      </div>
      <div className="row justify-content-center">
        <div className="col-7 px-5 py-4" style={{ backgroundColor: "black" }}>
          {children}
        </div>
      </div>
    </main>
  );
};

export default Modal;
