import React from "react";
import style from "./FormBoard.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {CurrentUserConsumer} from "../../context/CurrentUserContext";

import {Formik} from "formik";

class FormBoard extends React.Component {
    state = {
        value: {
            name: '',
            description: '',
        }
    };

    render() {
        const {InsertBoardFn} = this.props;
        return (
            <CurrentUserConsumer>
                {({isLogged, user}) => (
                    <>
                        <div className={style.wrapper}>
                            <div className={style.form}>
                                <h2>Dodaj grupę</h2>
                                <Formik
                                    initialValues={{...this.state.value}}
                                    onSubmit={(values) => InsertBoardFn(values, user)}
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
                                                   values={values.name}/>

                                            <Input name="description" label="Opis" maxLength={255} tag="textarea" type="text"
                                                   onChange={handleChange} errors={errors.description}
                                                   values={values.description}/>

                                            <div className={style.left}>
                                                <Button>Dodaj</Button>
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

export default FormBoard