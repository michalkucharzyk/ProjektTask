import React from "react";
import styles from "./TaskItem.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

class TaskItem extends React.Component {
    render() {
        const {id, title, content, status, deleteTaskFn, handleUpdateTaskFn} = this.props;
        return (
            <div className={styles.wrapper}>
                <div>{title}</div>
                <div>{content}</div>
                <div>{status}</div>
                <div><FontAwesomeIcon icon={faEdit} onClick={()=>handleUpdateTaskFn(id)} /></div>
                <div><FontAwesomeIcon icon={faTrashAlt} onClick={()=>deleteTaskFn(id)} /></div>
            </div>
        )
    }
}

export default TaskItem