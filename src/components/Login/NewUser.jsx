// Register New User form

import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { notNewAccount } from '../../actions/loginActions';

const NewUser = ({ email, username, password, passConfirm, onChange }) => {
    const dispatch = useDispatch();
    const toSignIn = () => dispatch(notNewAccount());
    return (
        <>
            <h2>Get Free PW account</h2>
            <input type="email" name="email" value={email} required
                placeholder="email" onChange={onChange} />
            <input type="text" name="username" value={username} required
                placeholder="username" autoComplete='off' onChange={onChange} />
            <input type="password" name="password" value={password} required
                placeholder="password" onChange={onChange} />
            <input type="password" name="passConfirm" value={passConfirm} required
                placeholder="confirm password" onChange={onChange} />
            <button id="login-btn" type="submit">submit</button>
            <button id="register-btn" type="button" onClick={toSignIn}>
                Have PW Account</button>
        </>
    )
}
NewUser.propTypes = {
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passConfirm: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}
export default NewUser;