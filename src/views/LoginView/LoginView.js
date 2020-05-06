import React from "react";
import style from "./loginView.module.scss"
import Login from "../../components/Login/Login";


class LoginView extends React.Component {
    render() {
        return (
            <div className={style.wrapper}>
                <Login/>
            </div>
        );
    }
}

export default LoginView;
