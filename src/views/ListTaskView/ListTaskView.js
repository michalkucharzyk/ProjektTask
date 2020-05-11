import React from "react";
import style from "./ListTaskView.module.scss"
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import ListTask from "../../components/ListTask/ListTask";

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
                                <ListTask nameBoard={name} idBoard={id} />
                            </div>
                        </>
                    )
                }
            </CurrentUserConsumer>

        );
    }
}

export default ListTaskView;
