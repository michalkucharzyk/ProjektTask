import React, {Component} from "react";
import * as usersApi from "../helpers/UsersApi";

const CurrentUserContext = React.createContext();
export class CurrentUserProvider extends Component {
    state = {
        isLogged: false,
        user: {}
    };
    componentDidMount = () => {
            this.setState({
                user: JSON.parse(localStorage.getItem('user')),
                isLogged: (localStorage.getItem('isLogged') === '1')
            });
    };

    login = async (values, actions) => {
        const response = await usersApi.userLogin({email: values.email, password: values.password});
        if (response.success === true) {
            this.setState({
                isLogged: true,
                user: {...response.content}
            });

            localStorage.setItem('user',JSON.stringify(response.content));
            localStorage.setItem('isLogged',"1");
        }else {
            actions.setFieldError("email",response.message)
        }
    };

    logout = () => {
        this.setState({
            isLogged: false,
            user: null
        });
        localStorage.removeItem('user');
        localStorage.removeItem('isLogged');
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