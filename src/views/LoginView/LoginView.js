import React from "react";
import style from "./loginView.module.scss"
import Login from "../../components/Login/Login";
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import {Redirect} from "react-router-dom";

class LoginView extends React.Component {
    render() {
        const {homePage} = {homePage: {pathname: "/"}};
        return (
            <CurrentUserConsumer>
                {({isLogged, login}) => (
                    <>
                        {isLogged && <Redirect to={homePage}/>}
                        <div className={style.wrapper}>
                            <Login loginFn={login}/>
                        </div>
                    </>
                )}
            </CurrentUserConsumer>
        );
    }
}

export default LoginView;
