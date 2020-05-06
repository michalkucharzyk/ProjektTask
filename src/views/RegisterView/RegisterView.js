import React from "react";
import style from "./RegisterView.module.scss"
import Register from "../../components/Register/Register";


class RegisterView extends React.Component {
    render() {
        return (
            <div className={style.wrapper}>
                <Register/>
            </div>
        );
    }
}

export default RegisterView;
