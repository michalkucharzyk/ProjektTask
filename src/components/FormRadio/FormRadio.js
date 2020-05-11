import React from 'react';
import styles from './FormRadio.module.scss';

const Radio = ({id,name, checked, changeFn, values, children}) => (
    <label className={styles.radio}>
        <input
            id={id}
            type="radio"
            name={name}
            checked={checked}
            onChange={changeFn}
            value={values}
        />
        <div className={styles.radioButton} />
        {children}
    </label>
);

export default Radio;