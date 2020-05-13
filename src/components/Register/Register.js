import React from "react";
import styles from "./Register.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Formik} from "formik";
import {regExpEmail, regExpPassword} from "../../helpers/define";
import Popup from "../Popup/Popup";

class Register extends React.Component {
    state = {
        value: {
            name: '',
            email: '',
            password: '',
            ppassword: ''
        },
        isRegister: this.props.isRegister
    };


    render() {
        const {registerFn, isRegister} = this.props;
        console.log(isRegister);
        return (
            <>
                {!isRegister ? (
                <div className={styles.wrapper}>
                    <div className={styles.form}>
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
                                else if (!regExpEmail.test(values.email))
                                    errors.email = "Podaj adres E-mail w poprawnym formacie";

                                if (!values.password)
                                    errors.password = "Pole hasło nie może być puste";
                                else if (!regExpPassword.test(values.password))
                                    errors.password = "7 do 15 znaków, które zawierają tylko znaki, cyfry, podkreślenie i pierwszy znak musi być literą";

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