import React from "react";
import style from "./Login.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {Formik} from "formik";
import * as _ from 'ramda';
import {CurrentUserConsumer} from "../../context/CurrentUserContext";

class Login extends React.Component {
    state = {
        value:{
            name:'',
            password:''
        },
    };

    render() {
        return (
            <CurrentUserConsumer>
            {({login}) =>(
                <div className={style.wrapper}>
                    <div className={style.form}>
                        <h2>Zaloguj się</h2>
                        <Formik
                            initialValues={{...this.state.value}}
                            onSubmit={(values ) => login(values)

                            }
                            validate={(values => {
                                let errors = {};
                                if (!values.name)
                                    errors.name = "Podaj nazwę użytkownika";

                                if (!values.password)
                                    errors.password = "Podaj hasło";

                                if (_.isEmpty(errors))
                                    this.setState({disabled: false});
                                else
                                    this.setState({disabled: true});

                                return errors;
                            })}
                            render={({
                                         values,
                                         errors,
                                         touched,
                                         handlerBlur,
                                         handleChange,
                                         handleSubmit,
                                         isSubmitting
                                     }) => (
                                <form autoComplete="off"  onSubmit={handleSubmit}>
                                    <Input name="name" label="Name"
                                           maxLength={30}
                                           onChange={handleChange}
                                           errors={errors.name}
                                           values={values.name}
                                    />
                                    <Input name="password" label="Password"
                                           maxLength={30}
                                           type="password"
                                           onChange={handleChange}
                                           errors={errors.password}
                                           values={values.password}
                                    />
                                    <div className={style.left}>
                                        <Button>Zaloguj się</Button>
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </div>
            )}</CurrentUserConsumer>

        )
    }
}

export default Login