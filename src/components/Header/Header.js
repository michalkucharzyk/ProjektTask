import React from "react";
import HeaderNavigation from "./HeaderNavigation";
import styles from "./Header.module.scss"

const Header = ({openModalFn}) =>(
    <header className={styles.wrapper}>
        <HeaderNavigation/>
    </header>
);

export default Header;