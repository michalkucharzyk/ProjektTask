import React from "react";
import {Redirect} from "react-router-dom";
import styles from "./Popup.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
class Popup extends React.Component
{
    state = {
        show: this.props.show,
        redirect: false,
        type: this.props.type,
    };

    closePopup = () =>{
        this.setState({
            redirect: true,
            show: false
        })

    };

    render() {
        const {title, text, urlRedirect} = this.props;
        const {show, redirect, type} = this.state;
        let style = '';
        if(type === 'success')
            style = styles.contentSuccess;
        else if(type === 'warning')
            style = styles.contentWarning;
        else if(type === 'error')
            style = styles.contentError;
        else
            style = styles.contentInfo;
        return(
            <>
                {redirect && <Redirect to={urlRedirect}/>}
                {show ?
                    <div className={styles.wrapper}>
                        <div className={style}>
                                <FontAwesomeIcon icon={faTimes} onClick={this.closePopup}></FontAwesomeIcon>
                                <h2>{title}</h2>
                                <p>{text}</p>
                        </div>
                    </div>
                : null}
            </>
        )
    }
}

export default Popup;