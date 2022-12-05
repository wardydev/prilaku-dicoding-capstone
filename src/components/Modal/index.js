import React from "react";
import styles from "./Modal.module.scss";
import ButtonIconOnly from "../ButtonIconOnly";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, setValue }) => {
  return (
    <main className={styles.main}>
      <ButtonIconOnly
        ariaLabel="close modal"
        bgColor="rgba(255, 255, 255, .1)"
        handleClick={() => setValue(false)}
        isCircle={true}
      >
        <IoClose />
      </ButtonIconOnly>
      <div className={styles.content}>
        <div className={styles['content__inner']}>{children}</div>
      </div>
    </main>
  );
};

export default Modal;
