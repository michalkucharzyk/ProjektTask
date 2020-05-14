import React from "react";
import style from "./ListTaskView.module.scss"
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import TaskList from "../../components/TaskList/TaskList";

class ListTaskView extends React.Component {
  render() {
      const{name, id} = this.props.match.params;
        return (
            <CurrentUserConsumer>
                {
                    ({isLogged, user}) => (
                        <>
                            <div className={style.wrapper}>
                                <h2>Zadan dla grupy: {name}</h2>
                                <TaskList nameBoard={name} idBoard={id} />
                            </div>
                        </>
                    )
                }
            </CurrentUserConsumer>

        );
    }
}

export default ListTaskView;
