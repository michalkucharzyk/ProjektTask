import React from "react";
import styles from "./Register.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Formik} from "formik";
import {regExpPassword} from "../../helpers/Define";
import Popup from "../Popup/Popup";
import * as usersApi from "../../helpers/UsersApi";
import * as yup from 'yup';

class Register extends React.Component {
    state = {
        registerSuccess: false,

        value: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
    };

    register = async (values, actions) => {
        const response = await usersApi.userRegister({...values});
        console.log(response);
        if(response.success === true)
        {
            this.setState({
                registerSuccess: true,
            })
        }else {
            actions.setFieldError("name",response.message)
        }
    };

    validationSchema = () => yup.object().shape({
        email: yup
            .string()
            .label("Email")
            .email("Podaj poprawny format adresu Email")
            .required("Pole Email jest wymagane"),
        name : yup
            .string()
            .label("Nazwa uzytkownika")
            .required("Podaj nazwę użytkownika"),
        password : yup
            .string()
            .label("Hasło")
            .required("Pole hasło nie może być puste")
            .matches(regExpPassword,{message:"7 do 15 znaków, które zawierają tylko znaki, cyfry, podkreślenie i pierwszy znak musi być literą"}),
        confirmPassword: yup
            .string()
            .label("Powtórz hasło")
            .test("passwords-match","Hasło muszą być takie same", function (value) {
                   return value === this.parent.password
                }
            )

    });


    render() {
        const {registerSuccess} = this.state;
        return (
            <>
                {!registerSuccess ? (
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <h2>Załóż konto</h2>
                        <Formik
                            initialValues={{...this.state.value}}
                            onSubmit={(values, actions) => this.register(values, actions)}
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
                                    <Input name="name" label="Nazwa użytkownika" maxLength={30}
                                           onChange={handleChange} errors={errors.name}
                                           values={values.name}/>

                                    <Input name="email" label="Email" maxLength={30} type="text"
                                           onChange={handleChange} errors={errors.email}
                                           values={values.email}/>

                                    <Input name="password" label="Hasło" maxLength={30} type="password"
                                           onChange={handleChange} errors={errors.password}
                                           values={values.password}/>

                                    <Input name="confirmPassword" label="Powtórz hasło" maxLength={30} type="password"
                                           onChange={handleChange} errors={errors.confirmPassword}
                                           values={values.confirmPassword}/>

                                    <div className={styles.left}>
                                        <Button>Zarejestruj się</Button>
                                    </div>
                                </form>
                            )
                        }
                        </Formik>
                    </div>
                </div>
                ) : (
                    <>
                        <Popup title="Rejestracja" type='success' text="Zostałeś pomyślanie zarejstrowany w systemie"
                               show={true} urlRedirect = "/login"
                        />
                    </>
                )}
            </>
        )
    }
}

export default Register