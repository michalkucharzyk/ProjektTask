import React from "react";
import styles from "./FormTask.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Formik} from "formik";
import Radio from "../FormRadio/FormRadio";

const types = {
    active: 0,
    noactive: 1,
    finish: 2,
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
        const {insertTaskFn, updateTaskFn, currentTask} = this.props;
        const task = currentTask.id  ? currentTask : this.state.value;
        return (
            <>
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <h2>Dodaj zadanie</h2>
                        <Formik
                            initialValues={task}
                            onSubmit={(values) => (
                                task.id ?  updateTaskFn(values) : insertTaskFn(values)
                            )}
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
                                               checked={parseInt(values.status) === types.active} changeFn={handleChange}
                                               value={types.active}>Aktywne
                                        </Radio>
                                        <Radio id={types.noactive} name="status"
                                               checked={parseInt(values.status) === types.noactive}
                                               changeFn={handleChange} value={types.noactive}>Nie aktywne
                                        </Radio>
                                        <Radio id={types.finish} checked={parseInt(values.status) === types.finish}
                                               name="status" changeFn={handleChange} value={types.finish}>Zakończone
                                        </Radio>
                                        {errors.status ? (
                                            <p className={styles.formWrapperRadioErrors}>{errors.status}</p>) : ''}
                                    </div>
                                    <Input name="title" label="Tytuł" maxLength={125}
                                           onChange={handleChange} errors={errors.title}
                                           value={values.title}/>

                                    <Input name="content" label="Opis" maxLength={255} tag="textarea"
                                           type="text"
                                           onChange={handleChange} errors={errors.content}
                                           value={values.content}/>

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