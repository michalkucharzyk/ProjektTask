import React from "react";
import styles from './BoardItem.module.scss';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";


class BoardItem extends React.Component {
    render() {
        const {id, name, description, deleteBoardFn, handleUpdateBoardFn} = this.props;
        return (
            <div className={styles.wrapper}>
                <Link className="actions-tools" id={id} to={`dashboard/${name}-${id}`}>
                    <div onClick={(e) => deleteBoardFn(e, id)} ><FontAwesomeIcon className={styles.deleteButton} icon ={faTrashAlt}/></div>
                    <div onClick={(e) => handleUpdateBoardFn(e, id)}><FontAwesomeIcon className={styles.editButton} icon ={faEdit}/></div>
                    <h2 className={styles.title}>{name}</h2>
                    <p className={styles.text}>{description}</p>
                </Link>
            </div>
        )
    }
}

export default BoardItem;