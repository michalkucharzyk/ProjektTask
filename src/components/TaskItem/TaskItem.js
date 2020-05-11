import React from "react";
import styles from "./TaskItem.module.scss"

class TaskItem extends React.Component {
    render() {
        const {title, content, status} = this.props;
        return (
            <div className={styles.wrapper}>
                <div>{title}</div>
                <div>{content}</div>
                <div>{status}</div>
            </div>
        )
    }
}

export default TaskItem