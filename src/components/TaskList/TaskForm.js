import React from "react";
import styles from "./TaskForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Formik} from "formik";
import Radio from "../FormRadio/FormRadio";
import * as yup from 'yup';

const types = {
    active: 0,
    notDone: 1,
    done: 2,
};

class TaskForm extends React.Component {
    state = {
        value: {
            title: '',
            content: '',
            status: '',
        }
    };

    validationSchema = () => yup.object().shape({
        title : yup
            .string()
            .required("Podaj tytul zadania")
            .label("Tytuł"),
        content : yup
            .string()
            .required("Podaj opis zadania")
            .label("Opis zadania"),
        status : yup
            .string()
            .required("Podaj status zadania")
            .label("Status")
    });

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
                            onSubmit={(values,actions) => (
                                task.id ?  updateTaskFn(values,actions) : insertTaskFn(values,actions)
                            )}
                            validationSchema={this.validationSchema}
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
                                        <Radio id={types.notDone} name="status"
                                               checked={parseInt(values.status) === types.notDone}
                                               changeFn={handleChange} value={types.notDone}>Nie zrobione
                                        </Radio>
                                        <Radio id={types.done} checked={parseInt(values.status) === types.done}
                                               name="status" changeFn={handleChange} value={types.done}>Zrobione
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

export default TaskForm