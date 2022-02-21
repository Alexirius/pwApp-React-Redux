import React from "react";
import Main from "./Main/Main";
import Login from "./Login/Login.jsx";
import { useSelector } from 'react-redux';
import './App.css';

const App = () => {
    const token = useSelector(state => state.login.token);

    const appContent = (token) ? <Main /> : <Login />
    return (
        <div className="app">
            <div className="app-back" />
            {appContent}
        </div>
    )
};

export default App; 