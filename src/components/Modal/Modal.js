import React from "react";
import styles from "./modal.module.scss"


const Modal = ( {closeModalFn, children} ) =>(
    <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={closeModalFn}></button>
        {children}
    </div>

);

export default Modal