import React from "react";
import "./index.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomeView from "../HomeView/HomeView";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AppContext from "../../context/contextApp";
import LoginView from "../LoginView/LoginView";
import RegisterView from "../RegisterView/RegisterView";
import {CurrentUserProvider} from "../../context/CurrentUserContext";

class Root extends React.Component {
    state = {
        user:{
            isLogged:false
        }
    };
    render() {
        return (
            <CurrentUserProvider>
                <BrowserRouter>
                    <Header/>
                        <Switch>
                            <Route exact path="/" component={HomeView}/>
                            <Route exact path="/login" component={LoginView}/>
                            <Route exact path="/register" component={RegisterView}/>
                        </Switch>
                    <Footer/>
                </BrowserRouter>
            </CurrentUserProvider>
        );
    }
}

export default Root;
