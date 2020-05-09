import React from "react";
import style from "./DashboardView.module.scss"
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import Board from "../../components/Board/Board";
class DashboardView extends React.Component {

  render() {
        return (
            <CurrentUserConsumer>
                {
                    ({isLogged, user}) => (
                        <>
                            <div className={style.wrapper}>
                                <h2>Grupy zadań</h2>
                                {isLogged ? <Board user={user} /> : ''}
                            </div>
                        </>
                    )
                }
            </CurrentUserConsumer>

        );
    }
}

export default DashboardView;
