import React, {Component} from "react";

const CurrentUserContext = React.createContext();

export class CurrentUserProvider extends Component {
    state = {
        user: {
            isLogged: false
        },
    };

    getUser = () => {

    };

    login = (values) => {
       this.setState({
           user:{
               isLogged: true
           }
       })
    };

    logout = () => {

    };

    render() {
        const {children} = this.props;
        return (
            <CurrentUserContext.Provider
                value={{
                    login: this.login,
                    logout: this.logout,
                    user: this.state.user,
                }}
            >
                {children}
            </CurrentUserContext.Provider>
        )
    }
}

export const CurrentUserConsumer = CurrentUserContext.Consumer;