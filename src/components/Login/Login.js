import React from 'react';
import NewUser from './NewUser';
import RegisteredUser from './RegisteredUser';
import './Login.css';

export default class Login extends React.Component {

    initialState = {
        email: '',
        password: '',
        username: '',
        passConfirm: '',
        newAccount: false
    }
    state = this.initialState;

    handleChange = (ev) => {
        const {name, value} = ev.target;
        this.setState({
            [name]: value
        });
    }
    
    onSubmit = (ev) => {
        ev.preventDefault();
        const {username, email, password, newAccount, passConfirm} = this.state;
        const {handleLogin} = this.props;
        if (newAccount) {               // NEW user
            handleLogin({email, password, username, passConfirm}, true);
        } else {                        // REGISTERED user
            handleLogin({email, password}, false);
        }
    }
    
    registerMode = (newAcc) => {        // user is New (true) or Registered (false)
        this.setState({newAccount: newAcc});
        this.props.clearErr();
    };

    render() {
        const {email, password, username, passConfirm, newAccount} = this.state;
        const {failed} = this.props;

        const formContent = (newAccount) ? 
            <NewUser email={email} username={username} password={password} passConfirm={passConfirm}
                onChange= {this.handleChange} onModeChange= {()=>this.registerMode(false)} />
        :
            <RegisteredUser email={email} password={password}
                onChange={this.handleChange} onModeChange={()=>{this.registerMode(true)}} />;

        const warning = (failed) ? 
                <div className="warning">
                    Error {failed.status}: {failed.text}
                </div>
        : null;

        return (
            <div className="login-page">
                <form className="login-form" onSubmit={this.onSubmit} >
                    {formContent}
                    {warning}
                </form>
            </div>
        )
    }
};
