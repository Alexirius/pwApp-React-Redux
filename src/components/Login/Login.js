import React from 'react';
import { connect } from 'react-redux';
import NewUser from './NewUser';
import RegisteredUser from './RegisteredUser';
import withPwApi from '../hoc-helpers/withPwApi';
import {newAccount, notNewAccount, inputChanged, catchErr,
        authorizationSuccess} from '../../actions/actions';
import './Login.css';

const Login =({isNewAccount, email, username, password, passConfirm, error,
            newAccount, notNewAccount, inputChanged, catchErr,
            authorizationSuccess, pwApi}) => {

    const {getToken} = pwApi;

    const handleLogin = (ev) => {
        ev.preventDefault();
        if (isNewAccount && password !== passConfirm) {
            return catchErr('Error: Password confirm mismatch!')
        }
        const passObj = (isNewAccount) ? {username, email, password, passConfirm}
            : {email, password};
        getToken (passObj, isNewAccount)
            .then((token) => {authorizationSuccess(token)})
            .catch((err) => {catchErr(err)})
    }

    const formContent = (isNewAccount) ? 
        <NewUser email={email} username={username} password={password} passConfirm={passConfirm}
            onChange= {inputChanged} onModeChange= {notNewAccount} />
    :
        <RegisteredUser email={email} password={password}
            onChange={inputChanged} onModeChange={newAccount} />;
    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin} >
                {formContent}
                <div className="warning">
                    {error}
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = ({email, password, username, passConfirm, 
                        isNewAccount, error}) => {
    return {
        email,
        password,
        username,
        passConfirm,
        isNewAccount,
        error
    }
}
const mapDispatchToProps = {
    newAccount,
    notNewAccount,
    inputChanged,
    catchErr,
    authorizationSuccess
}
export default withPwApi( connect(mapStateToProps, mapDispatchToProps) (Login));