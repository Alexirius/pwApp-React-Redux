import React, {useState} from 'react';
import NewUser from './NewUser';
import RegisteredUser from './RegisteredUser';
import './Login.css';

const Login = ({handleLogin, clearErr, error}) => {
    
    const initialState = {
        email: '',
        password: '',
        username: '',
        passConfirm: '',
        isNewAccount: false
    }
    const [state, setstate] = useState(initialState);

    const handleChange = (ev) => {
        const {name, value} = ev.target;
        setstate((state) => {return {...state, [name]: value}});
    }
    
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const {username, email, password, passConfirm, isNewAccount} = state;
        if (isNewAccount) {               // NEW user
            handleLogin({email, password, username, passConfirm}, true);
        } else {                        // REGISTERED user
            handleLogin({email, password}, false);
        }
    }
    
    const setRegisterMode = (isNew) => {        // user is New (true) or Registered (false)
        setstate((state) => {return {...state, isNewAccount: isNew}});
        clearErr();
    };

    const {email, password, username, passConfirm, isNewAccount} = state;
    const formContent = (isNewAccount) ? 
        <NewUser email={email} username={username} password={password} passConfirm={passConfirm}
            onChange= {handleChange} onModeChange= {()=>setRegisterMode(false)} />
    :
        <RegisteredUser email={email} password={password}
            onChange={handleChange} onModeChange={()=>{setRegisterMode(true)}} />;

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit} >
                {formContent}
                <div className="warning">
                    {error}
                </div>
            </form>
        </div>
    )
};
export default Login;