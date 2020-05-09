import React from "react";
import styles from './BoardItem.module.scss';
import {Link} from 'react-router-dom';

class BoardItem extends React.Component {
    render() {
        const {id, name, description, deleteBoardFn, handleUpdateBoardFn} = this.props;
        return (
                <div className={styles.wrapper}>
                    <Link className="actions-tools" id={id} to={`dashboard/${name}`}>
                        <div onClick={(e)=> deleteBoardFn(e,id)} className={styles.closeButton}></div>
                        <div onClick={(e)=> handleUpdateBoardFn(e,id)} className={styles.editButton}></div>
                        <h2 className={styles.title}>{name}</h2>
                        <p className={styles.text}>{description}</p>

                    </Link>
                </div>
        )
    }
}

export default BoardItem;