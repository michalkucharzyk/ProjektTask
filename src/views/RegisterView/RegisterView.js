import React from "react";
import styles from "./RegisterView.module.scss"
import Register from "../../components/Register/Register";
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import {Redirect} from "react-router-dom";


class RegisterView extends React.Component {
    render() {
        const {homePage} = {homePage: {pathname: "/"}};
        return (
            <CurrentUserConsumer>
                {
                    ({isLogged}) => (
                        <>
                            {isLogged && <Redirect to={homePage}/>}
                                <div className={styles.wrapper}>
                                    <Register />
                                </div>

                        </>
                    )
                }
            </CurrentUserConsumer>
        );
    }
}

export default RegisterView;
