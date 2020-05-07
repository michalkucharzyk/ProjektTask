import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./HeaderNavigation.module.scss"
import {CurrentUserConsumer} from "../../context/CurrentUserContext";


class HeaderNavigation extends React.Component {
    render() {
        return (
            <CurrentUserConsumer>
                {({isLogged, logout}) => (
                    <nav className={styles.wrapper}>
                        {isLogged ? (
                            <ul className={styles.wrapperLeft}>
                                <li className={styles.navItem}>
                                    <NavLink exact activeClassName={styles.navItemLinkActive}
                                             className={styles.navItemLink}
                                             to="/">
                                        Zakladka 1
                                    </NavLink>
                                </li>
                                <li className={styles.navItem}>
                                    <NavLink activeClassName={styles.navItemLinkActive} className={styles.navItemLink}
                                             to="/articles">
                                        Zakladka 2
                                    </NavLink>
                                </li>
                                <li className={styles.navItem}>
                                    <NavLink activeClassName={styles.navItemLinkActive} className={styles.navItemLink}
                                             to="/notes">
                                        Zakladk 3
                                    </NavLink>
                                </li>
                                <li className={styles.navItem}>
                                    <p className={styles.navItemLink} onClick={logout}>Wyloguj</p>
                                </li>
                            </ul>
                        ) : (
                            <ul className={styles.wrapperLeft}>
                                <li className={styles.navItem}>
                                    <NavLink exact activeClassName={styles.navItemLinkActive}
                                             className={styles.navItemLink}
                                             to="/login">
                                        Zaloguj
                                    </NavLink>
                                </li>
                                <li className={styles.navItem}>
                                    <NavLink activeClassName={styles.navItemLinkActive} className={styles.navItemLink}
                                             to="/register">
                                        Zarejestruj się
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </nav>
                )}
            </CurrentUserConsumer>
        )
    }
}


export default HeaderNavigation