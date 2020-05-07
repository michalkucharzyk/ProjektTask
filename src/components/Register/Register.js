import React from "react";
import style from "./Register.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";

class Register extends React.Component {
    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.form}>
                    <h2>Załóż konto</h2>
                    <form autoComplete="off">
                        <Input name="name" label="Nazwa użytkownika" maxLength={30} onChange={this.handleInputChange}
                               requierd={true}/>

                        <Input name="password" label="Hasło" maxLength={30} type="password"
                               onChange={this.handleInputChange} requierd={true}/>

                        <Input name="ppassword" label="Powtórz hasło" maxLength={30} type="password"
                               onChange={this.handleInputChange} requierd={true}/>

                        <Input name="e-mail" label="E-mail" maxLength={30} type="text" onChange={this.handleInputChange}
                               requierd={true}/>

                        <div className={style.left}>
                            <Button>Zarejestruj się</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register