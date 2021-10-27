import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewUser from './NewUser';
import RegisteredUser from './RegisteredUser';
import {newAccount, notNewAccount, authorizationRequest, inputChanged, catchErr} from '../../actions/loginActions';
import './Login.css';

const Login =({isNewAccount, email, username, password, passConfirm, error,
    newAccount, notNewAccount, inputChanged, catchErr, authorizationRequest}) => {

    const handleLogin = (ev) => {
        ev.preventDefault();
        if (!/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(email)) {
            return catchErr('Error: Invalid email!')
        }
        if (isNewAccount && password !== passConfirm) {
            return catchErr('Error: Password confirm mismatch!')
        }
        const passObj = (isNewAccount) ? {username, email, password, passConfirm}
            : {email, password};
        authorizationRequest(passObj, isNewAccount);
    }

    const formContent = (isNewAccount) ? 
        <NewUser email={email} username={username} password={password} passConfirm={passConfirm}
            onChange= {(ev)=> inputChanged(ev.target)} onModeChange= {notNewAccount} />
    :
        <RegisteredUser email={email} password={password}
            onChange={(ev)=> inputChanged(ev.target)} onModeChange={newAccount} />;
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

Login.propTypes = {
    isNewAccount: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passConfirm: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    newAccount: PropTypes.func.isRequired,
    notNewAccount: PropTypes.func.isRequired,
    inputChanged: PropTypes.func.isRequired,
    catchErr: PropTypes.func.isRequired,
    authorizationRequest: PropTypes.func.isRequired
}

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