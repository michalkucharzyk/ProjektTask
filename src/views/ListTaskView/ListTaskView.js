import React from "react";
import styles from "./ListTaskView.module.scss"
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
                            <div className={styles.wrapper}>
                                <h2 className={styles.title}>  Zadan dla grupy: {name}</h2>
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
