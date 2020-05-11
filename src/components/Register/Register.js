import React from "react";
import style from "./Register.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import {Redirect} from "react-router-dom";
import {Formik} from "formik";

class Register extends React.Component {
    state = {
        value: {
            name: '',
            email: '',
            password: '',
            ppassword: ''
        }
    };

    render() {
        const {registerFn} = this.props;
        return (
            <>
                <div className={style.wrapper}>
                    <div className={style.form}>
                        <h2>Załóż konto</h2>
                        <Formik
                            initialValues={{...this.state.value}}
                            onSubmit={(values) => registerFn(values)}
                            validate={values => {
                                let errors = {};

                                if (!values.name)
                                    errors.name = "Podaj nazwę użytkownika";

                                if (!values.email)
                                    errors.email = "Podaj adres E-mail";

                                if (!values.password)
                                    errors.password = "Pole hasło nie może być puste";

                                if (!values.ppassword || values.password !== values.ppassword)
                                    errors.ppassword = "Hasło muszą byc takie same";

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
                                    <Input name="name" label="Nazwa użytkownika" maxLength={30}
                                           onChange={handleChange} errors={errors.name}
                                           values={values.name}/>

                                    <Input name="email" label="E-mail" maxLength={30} type="text"
                                           onChange={handleChange} errors={errors.email}
                                           values={values.email}/>

                                    <Input name="password" label="Hasło" maxLength={30} type="password"
                                           onChange={handleChange} errors={errors.password}
                                           values={values.password}/>

                                    <Input name="ppassword" label="Powtórz hasło" maxLength={30} type="password"
                                           onChange={handleChange} errors={errors.ppassword}
                                           values={values.ppassword}/>

                                    <div className={style.left}>
                                        <Button>Zarejestruj się</Button>
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

export default Register