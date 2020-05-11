import React from "react";
import styles from "./FormTask.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import {Formik} from "formik";
import Radio from "../FormRadio/FormRadio";
import PropTypes from "prop-types";

const types = {
    active: '0',
    noactive: '1',
    finish: '2',
};

class FormTask extends React.Component {
    state = {
        value: {
            title: '',
            content: '',
            status: '',
        }
    };

    render() {
        const {InsertTaskFn} = this.props;
        const {title, content, status} = this.state.value;
        return (
            <>
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <h2>Dodaj zadanie</h2>
                        <Formik
                            initialValues={{...this.state.value}}
                            onSubmit={(values) => InsertTaskFn(values)}
                            validate={values => {
                                let errors = {};

                                if (!values.title)
                                    errors.title = "Podaj nazwę użytkownika";

                                if (!values.content)
                                    errors.content = "Podaj opis zadania";

                                if (!values.status)
                                    errors.status = "Podaj status";

                                return errors
                            }}
                        >{
                            ({
                                 values,
                                 errors,
                                 touched,
                                 handlerBlur,
                                 handleChange,
                                 handleSubmit,
                                 isSubmitting
                             }) => (
                                <form autoComplete="off" onSubmit={handleSubmit}>
                                    <div className={styles.formWrapperRadio}>
                                        <Radio id={types.active} name="status"
                                               checked={values.status === types.active} changeFn={handleChange}
                                               values={types.active}>Aktywne
                                        </Radio>
                                        <Radio id={types.noactive} name="status"
                                               checked={values.status === types.noactive}
                                               changeFn={handleChange} values={types.noactive}>Nie aktywne
                                        </Radio>
                                        <Radio id={types.finish} checked={values.status === types.finish}
                                               name="status" changeFn={handleChange} values={types.finish}>Zakończone
                                        </Radio>
                                        {errors.status ? (
                                            <p className={styles.formWrapperRadioErrors}>{errors.status}</p>) : ''}
                                    </div>
                                    <Input name="title" label="Tytuł" maxLength={125}
                                           onChange={handleChange} errors={errors.title}
                                           values={values.title}/>

                                    <Input name="content" label="Opis" maxLength={255} tag="textarea"
                                           type="text"
                                           onChange={handleChange} errors={errors.content}
                                           values={values.content}/>

                                    <div className={styles.left}><Button>Dodaj</Button>
                                    </div>
                                </form>
                            )
                        }
                        </Formik>
                    </div>
                </div>
            </>
        )
    }
}

export default FormTask