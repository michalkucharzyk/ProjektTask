import React from "react";
import "./index.scss";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomeView from "../HomeView/HomeView";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LoginView from "../LoginView/LoginView";
import RegisterView from "../RegisterView/RegisterView";
import {CurrentUserProvider} from "../../context/CurrentUserContext";
import DashboardView from "../DashboardView/DashboardView";
import ListTaskView from "../ListTaskView/ListTaskView";

class Root extends React.Component {
    render() {
        return (
            <CurrentUserProvider>
                <BrowserRouter>
                    <Header/>
                        <Switch>
                            <Route exact path="/" component={HomeView}/>
                            <Route exact path="/login" component={LoginView}/>
                            <Route exact path="/register" component={RegisterView}/>
                            <Route exact path="/dashboard" component={DashboardView}/>
                            <Route exact path="/dashboard/:name-:id" component={ListTaskView}/>
                        </Switch>
                    <Footer/>
                </BrowserRouter>
            </CurrentUserProvider>
        );
    }
}

export default Root;
