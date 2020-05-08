import React from "react";
import style from "./Login.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Formik} from "formik";
import * as _ from 'ramda';
import {CurrentUserConsumer} from "../../context/CurrentUserContext";
import {Redirect} from "react-router-dom";

class Login extends React.Component {
    state = {
        value: {
            name: '',
            password: ''
        },
    };

    render() {
        const {from} = {from: {pathname: "/"}};
        return (
            <CurrentUserConsumer>
                {({isLogged, login}) => (
                    <>
                        {isLogged && <Redirect to={from}/>}
                        <div className={style.wrapper}>
                            <div className={style.form}>
                                <h2>Zaloguj się</h2>
                                <Formik
                                    initialValues={{...this.state.value}}
                                    onSubmit={(values) => login(values)}
                                    validate={(values => {
                                        let errors = {};

                                        if (!values.email)
                                            errors.email = "Podaj nazwę użytkownika";

                                        if (!values.password)
                                            errors.password = "Podaj hasło";

                                        if (_.isEmpty(errors))
                                            this.setState({disabled: false});
                                        else
                                            this.setState({disabled: true});

                                        return errors;
                                    })}
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
                                            <Input name="email" label="Email" maxLength={30} onChange={handleChange}
                                                   errors={errors.email}
                                                   values={values.email}
                                            />
                                            <Input name="password" label="Password" maxLength={30} type="password"
                                                   onChange={handleChange}
                                                   errors={errors.password}
                                                   values={values.password}
                                            />
                                            <div className={style.left}>
                                                <Button>Zaloguj się</Button>
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

export default Login