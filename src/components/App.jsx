import React from "react";
import Main from "./Main/Main";
import Login from "./Login/Login.jsx";
import { connect } from 'react-redux';
import './App.css';

const App = ({token}) => {
    const appContent = (token) ? <Main /> : <Login />
    return (
        <div className="app">
            <div className="app-back" />
            {appContent}
        </div>
    )
};
const mapStateToProps = ({loginState}) => {
    return {token: loginState.token}};

export default connect(mapStateToProps)(App); 