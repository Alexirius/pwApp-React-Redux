import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import History from "./History/History";
import Transaction from "./Transaction/Transaction";
import withPwApi from "../hoc-helpers/withPwApi";
import Spinner from "../Spinner/Spinner";
import './Main.css';

let timeout = '';

const Main = (props) => {
    const [state, setstate] = useState({
		historyArray: [],
        loading: false
    });
    const {getTransList} = props.pwApi;
    const updateTransList = () => {        // Sends request to server for Transactions History
        const {token, catchError, clearErr} = props;
        timeout = setTimeout(()=>{
            setstate((state)=>{return {...state, loading: true}});  // state.loading is used for showing Spinner
        },1000);                             // if loading lasts longer than 1 sec
		getTransList(token)
			.then((res) => {
                clearTimeout(timeout);
                clearErr();
				setstate({historyArray: res, loading: false});
			})
            .catch((err) => {
                clearTimeout(timeout);
                catchError(err)
            });
    }
    // eslint-disable-next-line
    useEffect(() => {updateTransList()}, [])

    const {token, clearErr, error, throwLocalError, catchError, 
            updateBalance, ...headerProps} = props;
    const {historyArray, loading} = state;
    const spinner = (loading) ? <Spinner /> : null;
    return (
        <div className = 'main'>
            <Header {...headerProps} />
            <Transaction token = {token} clearErr={clearErr} error={error} 
                throwLocalError={throwLocalError} catchError={catchError}
                updateTransList={updateTransList}
                updateBalance={updateBalance} />
            <History historyArray={historyArray} />
            {spinner}
        </div>
    )
}
export default withPwApi(Main);