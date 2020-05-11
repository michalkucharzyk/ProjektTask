import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({tag: Tag, type, name, label, maxLength, errors, ...props}) => (

    <div className={styles.formItem}>
        <Tag className={Tag === 'textarea' ? styles.textarea : styles.input} type={type} name={name} id={name}
             maxLength={maxLength} placeholder=" "
             {...props}
        />
        <label className={styles.label} htmlFor={name}>
            {label}
        </label>
        <div className={styles.formItemBar}/>
        {errors.length ? (<p className={styles.errors}>{errors}</p>) : ''}
    </div>
);
Input.propTypes = {
    tag: PropTypes.string,
    type: PropTypes.string,
    errors: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
};

Input.defaultProps = {
    tag: 'input',
    type: 'text',
    errors: '',
    maxLength: 200,
};

export default Input;