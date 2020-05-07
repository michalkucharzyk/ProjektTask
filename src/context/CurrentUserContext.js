import React, {Component} from "react";
import * as usersApi from "../helpers/UsersApi";

const CurrentUserContext = React.createContext();

export class CurrentUserProvider extends Component {
    state = {
        isLogged: false,
        user: null
    };

    login = async (values) => {
        const users = await usersApi.userLogin({email: values.email, password: values.password});
        if (users.success === true) {
            this.setState({
                isLogged: true,
                user: users.content
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
                    logout: this.logout,
                    user: this.state.user,
                    isLogged: this.state.isLogged,
                }}
            >
                {children}
            </CurrentUserContext.Provider>
        )
    }
}

export const CurrentUserConsumer = CurrentUserContext.Consumer;