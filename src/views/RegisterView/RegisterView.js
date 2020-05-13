import React from "react";
import styles from "./RegisterView.module.scss"
import Register from "../../components/Register/Register";
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import {Redirect} from "react-router-dom";
import Popup from "../../components/Popup/Popup"


class RegisterView extends React.Component {
    render() {
        const {homePage} = {homePage: {pathname: "/"}};
        return (
            <CurrentUserConsumer>
                {
                    ({isLogged, isRegister, register}) => (
                        <>
                            {isLogged && <Redirect to={homePage}/>}
                                <div className={styles.wrapper}>
                                    <Register isRegister={isRegister} registerFn={register}/>
                                </div>

                        </>
                    )
                }
            </CurrentUserConsumer>
        );
    }
}

export default RegisterView;
