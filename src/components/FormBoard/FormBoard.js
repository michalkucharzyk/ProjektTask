import React from "react";
import styles from "./FormBoard.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Formik} from "formik";

class FormBoard extends React.Component {
    state = {
        value: {
            name: '',
            description: '',
        }
    };

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
                            onSubmit={(values) => (
                                board.id ? updateBoardFn(values) : insertBoardFn(values)
                            )}
                            validate={values => {
                                let errors = {};

                                if (!values.name)
                                    errors.name = "Podaj nazwę użytkownika";

                                if (!values.description)
                                    errors.description = "Podaj opis grupy";

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

export default FormBoard