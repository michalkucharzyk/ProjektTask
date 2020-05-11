import React from "react";
import style from "./FormBoard.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {CurrentUserConsumer} from "../../context/CurrentUserContext";

import {Formik} from "formik";

class FormBoardUpdate extends React.Component {
    state = {
        value: {
            name: '',
            description: '',
        }
    };

    render() {
        const {UpdateBoardFn, board} = this.props;
        return (
            <CurrentUserConsumer>
                {({isLogged}) => (
                    <>
                        <div className={style.wrapper}>
                            <div className={style.form}>
                                <h2>Aktulizuj grupe</h2>
                                <Formik
                                    initialValues={board}
                                    onSubmit={(values) => UpdateBoardFn(values)}
                                    validate={values => {
                                        let errors = {};

                                        if (!values.name)
                                            errors.name = "Podaj nazwę grupy";

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

                                            <div className={style.left}>
                                                <Button>Zapisz zmiany</Button>
                                            </div>
                                        </form>
                                    )
                                }
                                </Formik>
                            </div>
                        </div>
                    </>
                )}
            </CurrentUserConsumer>

        )
    }
}

export default FormBoardUpdate