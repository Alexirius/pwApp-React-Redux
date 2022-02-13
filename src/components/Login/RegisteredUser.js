/* -- Login Form for Registered user -- */

import React from 'react';
import PropTypes from 'prop-types';

const RegisteredUser = ({email, password, onChange, onModeChange}) => {
    return (
        <>
            <h2>PW Application Login</h2>
            <input type="email" name="email" value={email} required
                placeholder="email" onChange={onChange} />
            <input type="password" name="password" value={password} required
                placeholder="password" onChange={onChange} />
            <button id="login-btn" type="submit">ENTER</button>
            <button id="register-btn" type="button" onClick={onModeChange}>
                Create Free Account</button>
        </>
    );
};

RegisteredUser.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onModeChange: PropTypes.func.isRequired
}
export default RegisteredUser;