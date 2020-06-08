import React from "react";
import styles from "./Footer.module.scss"

const Footer = () =>(
    <footer className={styles.wrapper}>
        <p>Projekt zarelizowany na przedmiot <b>Modelowanie i analiza systemów informatycznych</b></p>
        <p>Projekt wykonali: Dawid Urban, Michał Kucharzyk, Wojciech Kozłowski, Artur Paściak, Dominika Czyszczoń</p>
    </footer>
);

export default Footer;