import React from "react";
import style from "./homeView.module.scss"

class HomeView extends React.Component {
    render() {
        return (
            <div className={style.wrapper}>
                <h1>System do zarządzania taskami</h1>
            </div>
        );
    }
}

export default HomeView;
