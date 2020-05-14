import React from "react";
import styles from "./BoardForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Formik} from "formik";
import * as yup from 'yup';

class BoardForm extends React.Component {
    state = {
        value: {
            name: '',
            description: '',
        }
    };

    validationSchema = () => yup.object().shape({
        name: yup
            .string()
            .required("Pole nazwa jest wymagana"),
        description: yup
            .string()
            .required("Pole opis jest wymagane")
    });

    render() {
        const {insertBoardFn, updateBoardFn, currentBoard} = this.props;
        const board = currentBoard.id ? currentBoard : this.state.value;
        return (
            <>
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <h2>Dodaj grupę</h2>
                        <Formik
                            initialValues={board}
                            onSubmit={(values,actions) => (
                                board.id ? updateBoardFn(values, actions) : insertBoardFn(values, actions)
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
                                    <Input name="name" label="Nazwa" maxLength={30}
                                           onChange={handleChange} errors={errors.name}
                                           value={values.name}/>

                                    <Input name="description" label="Opis" maxLength={255} tag="textarea" type="text"
                                           onChange={handleChange} errors={errors.description}
                                           value={values.description}/>

                                    <div className={styles.left}>
                                        <Button>Dodaj</Button>
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

export default BoardForm