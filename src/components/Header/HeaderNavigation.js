import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./HeaderNavigation.module.scss"
import {CurrentUserConsumer} from "../../context/CurrentUserContext";


class HeaderNavigation extends React.Component
{
    render() {
        return(
            <CurrentUserConsumer>
                {({user}) =>(
                    <nav className={styles.wrapper}>
                        {user.isLogged ? (
                            <ul className={styles.wrapperLeft}>
                                <li className={styles.navItem}>
                                    <NavLink
                                        exact
                                        activeClassName={styles.navItemLinkActive}
                                        className={styles.navItemLink}
                                        to="/">
                                        Twitters
                                    </NavLink>
                                </li>
                                <li className={styles.navItem}>
                                    <NavLink
                                        activeClassName={styles.navItemLinkActive}
                                        className={styles.navItemLink}
                                        to="/articles">
                                        Articles
                                    </NavLink>
                                </li>
                                <li className={styles.navItem}>
                                    <NavLink
                                        activeClassName={styles.navItemLinkActive}
                                        className={styles.navItemLink}
                                        to="/notes">
                                        Notes
                                    </NavLink>
                                </li>
                            </ul>
                        ) : (
                            <ul className={styles.wrapperLeft}>
                                <li className={styles.navItem}>
                                    <NavLink
                                        exact
                                        activeClassName={styles.navItemLinkActive}
                                        className={styles.navItemLink}
                                        to="/login">
                                        Zaloguj
                                    </NavLink>
                                </li>
                                <li className={styles.navItem}>
                                    <NavLink
                                        activeClassName={styles.navItemLinkActive}
                                        className={styles.navItemLink}
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