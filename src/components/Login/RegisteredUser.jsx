// -- Login Form for Registered user -- //

import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { newAccount } from '../../actions/loginActions';

const RegisteredUser = ({ email, password, onChange }) => {

    const dispatch = useDispatch();
    const toNewUser = () => dispatch(newAccount());

    return (
        <>
            <h2>PW Application Login</h2>
            <input type="email" name="email" value={email} required
                placeholder="email" onChange={onChange} />
            <input type="password" name="password" value={password} required
                placeholder="password" onChange={onChange} />
            <button id="login-btn" type="submit">ENTER</button>
            <button id="register-btn" type="button" onClick={toNewUser}>
                Create Free Account</button>
        </>
    )
}

RegisteredUser.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default RegisteredUser;