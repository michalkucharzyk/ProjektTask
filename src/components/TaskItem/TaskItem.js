import React from "react";
import styles from "./TaskItem.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
const types = {
    0: "Aktywne",
    1: "Nie aktywne",
    2: "Do zrobienia",
};

class TaskItem extends React.Component {
    render() {
        const {id, title, content, status, deleteTaskFn, handleUpdateTaskFn} = this.props;
        return (
            <>
                <tr className={status == 0 ? styles.green : status == 1 ? styles.red : styles.orange}>
                    <td>#</td>
                    <td>{title}</td>
                    <td>{content}</td>
                    <td>{types[status]}</td>
                    <td>
                        <div className={styles.wrapperButton}>
                            <FontAwesomeIcon icon={faEdit} className= {styles.editButton} onClick={()=>handleUpdateTaskFn(id)} />
                            <FontAwesomeIcon icon={faTrashAlt} className= {styles.deleteButton} onClick={()=>deleteTaskFn(id)} />
                        </div>
                    </td>
                </tr>
            </>
        )
    }
}

export default TaskItem