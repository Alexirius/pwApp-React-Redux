import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewUser from './NewUser';
import RegisteredUser from './RegisteredUser';
import { authorizationRequest, inputChanged, catchErr } from '../../actions/loginActions';
import './Login.css';

const Login = () => {
    const dispatch = useDispatch();

    const email = useSelector(state => state.login.email);
    const password = useSelector(state => state.login.password);
    const passConfirm = useSelector(state => state.login.passConfirm);
    const username = useSelector(state => state.login.username);
    const isNewAccount = useSelector(state => state.login.isNewAccount);
    const error = useSelector(state => state.login.error);

    const passObj = (isNewAccount) ? { username, email, password, passConfirm }
        : { email, password };

    const handleLogin = (ev) => {
        ev.preventDefault();
        if (!/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(email)) {
            return dispatch(catchErr('Error: Invalid email!'))
        }
        if (isNewAccount && password !== passConfirm) {
            return dispatch(catchErr('Error: Password confirm mismatch!'))
        }
        dispatch(authorizationRequest(passObj, isNewAccount));
    }

    const onChange = (ev) => dispatch(inputChanged(ev.target))

    const formContent = (isNewAccount) ?
        <NewUser {...passObj} onChange={onChange} />
        :
        <RegisteredUser {...passObj} onChange={onChange} />;

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

export default Login;