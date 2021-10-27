import React from 'react';
import { connect } from 'react-redux';
import NewUser from './NewUser';
import RegisteredUser from './RegisteredUser';
import {newAccount, notNewAccount, authorizationRequest, inputChanged, catchErr} from '../../actions/loginActions';
import './Login.css';

const Login =({isNewAccount, email, username, password, passConfirm, error,
    newAccount, notNewAccount, inputChanged, catchErr, authorizationRequest}) => {

    const handleLogin = (ev) => {
        ev.preventDefault();
        if (isNewAccount && password !== passConfirm) {
            return catchErr('Error: Password confirm mismatch!')
        }
        const passObj = (isNewAccount) ? {username, email, password, passConfirm}
            : {email, password};
        authorizationRequest(passObj, isNewAccount);
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

const mapStateToProps = ({loginState}) => {
    const {email, password, username, passConfirm, isNewAccount, error} = loginState;
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
    authorizationRequest
}
export default connect(mapStateToProps, mapDispatchToProps) (Login);