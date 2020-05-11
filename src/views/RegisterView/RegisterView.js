import React from "react";
import style from "./RegisterView.module.scss"
import Register from "../../components/Register/Register";
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import {Redirect} from "react-router-dom";

class RegisterView extends React.Component {
    render() {
        const {homePage} = {homePage: {pathname: "/"}};
        return (
            <CurrentUserConsumer>
                {
                    ({isLogged, isRegister, register}) => (
                        <>
                            {isLogged && <Redirect to={homePage}/>}
                            <div className={style.wrapper}>
                                <Register registerFn={register}/>
                            </div>
                        </>
                    )
                }
            </CurrentUserConsumer>

        );
    }
}

export default RegisterView;
