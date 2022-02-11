import React, {useState,useCallback,useMemo} from "react";
import Main from "./Main/Main";
import Login from "./Login/Login";
import withPwApi from "./hoc-helpers/withPwApi";
import './App.css';

const App = ({pwApi}) => {

  const initialState = useMemo(()=> {return {
    token: '',
    userId: '',
    userName: '',
    balance: '',
    error: null
  }},[])
  const [state, setstate] = useState(initialState)
  const {getToken, getUserInfo} = pwApi;

  const handleLogin = (passObj, isNewAccount) => {
    if (isNewAccount) {
      const {password, passConfirm} = passObj;
      if (password !== passConfirm) {
        throwLocalError('Password confirm mismatch!');
        setstate((state) => {return {...state, token: '' }});
        return;
      }
    }
    getToken(passObj, isNewAccount)
      .then((token) => {loginOk(token)})
      .catch((err) => {catchError(err)});
  }

  const loginOk = (token) => {getUserInfo(token)   // Sends request to server 
                                                      // for logged user info
    .then((res) => {
      const {name, id, balance} = res;
      setstate({
        token,
        userName: name,
        userId: id,
        balance,
        error: null
      })
    })
    .catch((err) => {catchError(err)});
  }

  const updateBalance = (balance) => {
    setstate((state) => {return {...state, balance}});
  }

  const throwLocalError = (text) => (
    setstate((state) => {return {...state, error: `Error: ${text}`}})
  )

  const catchError = (err) => {
    console.error(err);
    setstate((state)=>{return {...state, error: err.toString()}});
  }

  const clearErr = () => {
    setstate((state) => {return {...state, error: null}});
  }

  const handleLogout = useCallback(() => {setstate(initialState)}, [initialState]);

  const {token, userName, balance, error} = state;
  const appContent = (token) ?
    <Main userName={userName} balance={balance} token={token} error={error}
            handleLogout={handleLogout}
            updateBalance={updateBalance}
            clearErr={clearErr}
            throwLocalError={throwLocalError}
            catchError={catchError} />
  : 
    <Login handleLogin={handleLogin}
          clearErr={clearErr} error={error} />;
  return (
    <>
      <div className="app-back" />
      <div className="app">
        {appContent}
      </div>
    </>
  )
};
export default withPwApi(App);