import React from "react";
import Main from "./Main/Main";
import Login from "./Login/Login";
import withPwApi from "./hoc-helpers/withPwApi";
import './App.css';

class App extends React.Component {

  initialState ={
    token: '',
    userId: '',
    userName: '',
    balance: '',
    error: null
  }

  state = this.initialState;

  handleLogin = (passObj, newAccount) => {
    if (newAccount) {
      const { password, passConfirm } = passObj;
      if (password !== passConfirm) {
        this.throwLocalError('Password confirm mismatch!');
        this.setState({ token: '' });
        return;
      }
    }
    this.props.pwApi.getToken(passObj, newAccount)
      .then((token) => { this.loginOk(token) })
      .catch((err) => { this.catchError(err) });
  }

  loginOk = (token) => {this.props.pwApi.getUserInfo(token)   // Sends request to server 
                                                      // for logged user info
    .then((res) => {
      const {name, id, balance} = res;
      this.setState({
        token,
        balance,
        userName: name,
        userId: id,
        error: null
      })
    })
    .catch((err) => {this.catchError(err)});
  }

  updateBalance = (balance) => {
    this.setState({balance});
  }

  throwLocalError = (text) => (
    this.setState({error: `Еrror: ${text}`})
  )

  catchError = (err) => {
    console.log(err);
    this.setState({error: err.toString()});
  }

  clearErr = () => {
    this.setState({error: null});
  }

  handleLogout = () => {
    this.setState(this.initialState);
  }

  render() {
    const {token, userName, balance, error} = this.state;
    const appContent = (token) ?
      <Main userName={userName} balance={balance} token={token} error={error} 
            handleLogout={this.handleLogout}
            updateBalance={this.updateBalance}
            clearErr={this.clearErr}
            throwLocalError={this.throwLocalError}
            catchError={this.catchError} />
    : 
      <Login handleLogin={this.handleLogin}
            clearErr={this.clearErr} error={error} />;
    return (
        <div className="App">
          {appContent}
        </div>
    )
  }
};
export default withPwApi(App);