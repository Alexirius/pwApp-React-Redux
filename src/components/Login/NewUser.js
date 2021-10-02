// Register New User form

import React from "react";

const NewUser = ({email, username, password, passConfirm, onChange, onModeChange}) => {
    return (
        <React.Fragment>
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
            <button id="register-btn" type="button" onClick={onModeChange}>
                Have PW Account</button>
        </React.Fragment>
    )
}
export default NewUser;