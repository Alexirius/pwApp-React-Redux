import React from "react";
import Main from "./Main/Main";
import Login from "./Login/Login";
import ApiService from "../services/api-service";
import './App.css';

export default class App extends React.Component {

  api = new ApiService();

  initialState ={
    token: '',
    userId: '',
    userName: '',
    balance: '',
    failed: false   // failed: possible values: obj {status,text} || false 
  }

  state = this.initialState;

  handleLogin = (passObj, newAccount) => {
    if (newAccount) {
      const {password, passConfirm} = passObj;
      if (password !== passConfirm) {
        this.throwLocalError('', 'Password confirm mismatch!');
        this.setState({token: ''});
        return;
      }
    }
    this.api.getToken(passObj, newAccount)
      .then((token) => {this.loginOk(token)})
      .catch((err) => {this.catchError(err)});
  }

  loginOk = (token) => {this.api.getUserInfo(token)   // Sends request to server 
                                                      // for logged user info
    .then((res) => {
      const {name, id, balance} = res;
      this.setState({
        token: token,
        userName: name,
        userId: id,
        balance: balance,
        failed: false
      })
    })
    .catch((err) => {this.catchError(err)});
  }

  updateBalance = (balance) => {
    this.setState({balance});
  }

  throwLocalError = (status, text) => (
    this.setState({failed: {status, text}})
  )

  catchError = (err) => {
    console.log(err);
    const {status, text} = err;
    this.setState({failed:{status, text}});
  }

  clearErr = () => {
    this.setState({failed: false});
  }

  handleLogout = () => {
    console.log("this",this);
    this.setState(this.initialState);
  }

  render() {
    const {token, userName, balance, failed} = this.state;
    const appContent = (token) ?
      <Main userName={userName} balance={balance} token={token} failed={failed} 
            handleLogout={this.handleLogout}
            updateBalance={this.updateBalance}
            clearErr={this.clearErr}
            throwLocalError={this.throwLocalError}
            catchError={this.catchError} />
      : 
      <Login handleLogin={this.handleLogin}
            clearErr={this.clearErr} failed={failed} />;
    return (        
      <div className="App">
        {appContent}
      </div>
    )
  }
};
