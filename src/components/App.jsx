import React from "react";
import Main from "./Main/Main";
import Login from "./Login/Login.jsx";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

App.propTypes = {
    token: PropTypes.string.isRequired
}

const mapStateToProps = ({loginState}) => {
    return {token: loginState.token}};

export default connect(mapStateToProps)(App); 