import React from "react";
import {Redirect} from "react-router-dom";
import styles from "./PopupConfirm.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
class PopupConfirm extends React.Component
{
    state = {
        show: this.props.show,
    };

    closePopup = () =>{
        this.setState({
            show: false
        })

    };

    render() {
        return(
            <>
                <div className={styles.wrapper}>

                </div>
            </>
        )
    }
}

export default PopupConfirm;