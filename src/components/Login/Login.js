import React from "react";
import styles from "./Login.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Formik} from "formik";
import * as yup from 'yup';


class Login extends React.Component {
    state = {
        value: {
            name: '',
            password: ''
        },
    };

    validationSchema = () => yup.object().shape({
        email: yup
            .string()
            .label("Email")
            .email("Podaj poprawny adress email")
            .required("Pole Email jest wymagane"),
        password: yup
            .string()
            .label("Hasło")
            .required("Podaj hasło")
    });

    render() {
        const {loginFn} = this.props;
        return (
            <>
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <h2>Zaloguj się</h2>
                        <Formik
                            initialValues={{...this.state.value}}
                            onSubmit={(values,actions) => loginFn(values, actions)}
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
                                    <Input name="email" label="Email" maxLength={30} onChange={handleChange}
                                           errors={errors.email}
                                           values={values.email}
                                    />
                                    <Input name="password" label="Password" maxLength={30} type="password"
                                           onChange={handleChange}
                                           errors={errors.password}
                                           values={values.password}
                                    />
                                    <div className={styles.left}>
                                        <Button>Zaloguj się</Button>
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

export default Login