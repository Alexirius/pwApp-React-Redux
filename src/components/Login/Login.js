import React from 'react';
import NewUser from './NewUser';
import RegisteredUser from './RegisteredUser';
import PropTypes from 'prop-types';
import './Login.css';

export default class Login extends React.Component {
    static propTypes = {
        handleLogin: PropTypes.func.isRequired,
        clearErr: PropTypes.func,
        error: PropTypes.string
    }
    static defaultProps = {
        clearErr: ()=>{},
        error: null
    }

    initialState = {
        email: '',
        password: '',
        username: '',
        passConfirm: '',
        isNewAccount: false
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
        const {username, email, password, passConfirm, isNewAccount} = this.state;
        const {handleLogin} = this.props;
        if (isNewAccount) {               // NEW user
            handleLogin({email, password, username, passConfirm}, true);
        } else {                        // REGISTERED user
            handleLogin({email, password}, false);
        }
    }
    
    registerMode = (isNew) => {        // user is New (true) or Registered (false)
        this.setState({isNewAccount: isNew});
        this.props.clearErr();
    };

    render() {
        const {email, password, username, passConfirm, isNewAccount} = this.state;
        const {error} = this.props;

        const formContent = (isNewAccount) ? 
            <NewUser email={email} username={username} password={password} passConfirm={passConfirm}
                onChange= {this.handleChange} onModeChange= {()=>this.registerMode(false)} />
        :
            <RegisteredUser email={email} password={password}
                onChange={this.handleChange} onModeChange={()=>{this.registerMode(true)}} />;

        return (
            <div className="login-page">
                <form className="login-form" onSubmit={this.onSubmit} >
                    {formContent}
                    <div className="warning">
                        {error}
                    </div>
                </form>
            </div>
        )
    }
};
