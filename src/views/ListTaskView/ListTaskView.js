import React from "react";
import style from "./ListTaskView.module.scss"
import {CurrentUserConsumer} from "../../context/CurrentUserContext";

class ListTaskView extends React.Component {

  render() {
        return (
            <CurrentUserConsumer>
                {
                    ({isLogged, user}) => (
                        <>
                            <div className={style.wrapper}>
                                 xd
                            </div>
                        </>
                    )
                }
            </CurrentUserConsumer>

        );
    }
}

export default ListTaskView;
