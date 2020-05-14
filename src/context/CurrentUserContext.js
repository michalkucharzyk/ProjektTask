import React, {Component} from "react";
import * as usersApi from "../helpers/UsersApi";

const CurrentUserContext = React.createContext();
export class CurrentUserProvider extends Component {
    state = {
        isLogged: true,
        user: {
            id: 56,
            email: "sDASDASD ASDASDAS"
        }
    };

    login = async (values, actions) => {
        const response = await usersApi.userLogin({email: values.email, password: values.password});
        if (response.success === true) {
            this.setState({
                isLogged: true,
                user: response.content
            });
        }else {
            actions.setFieldError("email",response.message)
        }
    };

    logout = () => {
        this.setState({
            isLogged: false,
            user: null
        });
    };

    render() {
        const {children} = this.props;
        return (
            <CurrentUserContext.Provider
                value={{
                    login: this.login,
                    logout: this.logout,
                    user: this.state.user,
                    isLogged: this.state.isLogged
                }}
            >
                {children}
            </CurrentUserContext.Provider>
        )
    }
}

export const CurrentUserConsumer = CurrentUserContext.Consumer;