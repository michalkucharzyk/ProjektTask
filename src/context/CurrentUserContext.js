import React, {Component} from "react";
import * as usersApi from "../helpers/UsersApi";

const CurrentUserContext = React.createContext();
let isRegister = false;
export class CurrentUserProvider extends Component {
    state = {
        isLogged: false,
        isRegister: false,
        user: null
    };

    register = async (values) => {
        const user = await usersApi.userRegister({...values});
        if(user.success === true)
        {
            console.log('sdasdas');
            this.setState({
                isLogged: false,
                isRegister: true,
                user: user.content
            });
        }

    };

    login = async (values) => {
        const user = await usersApi.userLogin({email: values.email, password: values.password});
        if (user.success === true) {
            this.setState({
                isLogged: true,
                user: user.content
            });
        }
    };

    logout = () => {
        this.setState({
            isLogged: false,
            user: null
        })
    };

    render() {
        const {children} = this.props;
        return (
            <CurrentUserContext.Provider
                value={{
                    login: this.login,
                    register: this.register,
                    logout: this.logout,
                    user: this.state.user,
                    isLogged: this.state.isLogged,
                    isRegister: this.state.isRegister,
                }}
            >
                {children}
            </CurrentUserContext.Provider>
        )
    }
}

export const CurrentUserConsumer = CurrentUserContext.Consumer;