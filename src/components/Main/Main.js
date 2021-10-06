import React from "react";
import Header from "./Header/Header";
import History from "./History/History";
import Transaction from "./Transaction/Transaction";
import withPwApi from "../hoc-helpers/withPwApi";
import Spinner from "../Spinner/Spinner";
import './Main.css';

class Main extends React.Component {

    timeout = '';

    state = {
		historyArray: [],
        loading: false
    }

    updateTransList = () => {        // Sends request to server for Transactions History
        const {token, catchError, clearErr, pwApi} = this.props;
        this.timeout = setTimeout(()=>{
            this.setState({loading: true});  // state.loading is used for showing Spinner
        },1000);                             // if loading lasts longer than 1 sec
		pwApi.getTransList(token)
			.then((res) => {
                clearTimeout(this.timeout);
                clearErr();
				this.setState({historyArray: res, loading: false});
			})
            .catch((err) => {catchError(err)});
    }

	componentDidMount () {
		this.updateTransList();
	}

    render () {
        const {token, clearErr, error, throwLocalError, catchError, 
                updateBalance, ...headerProps} = this.props;
        const {historyArray, loading} = this.state;
        const spinner = (loading) ? <Spinner /> : null;
        return (
            <div className = 'main'>
                <Header {...headerProps} />
                <Transaction token = {token} clearErr={clearErr} error={error} 
                    throwLocalError={throwLocalError} catchError={catchError}
                    updateTransList={this.updateTransList}
                    updateBalance={updateBalance} />
                <History historyArray={historyArray} />
                {spinner}
            </div>
        )
    }
}
export default withPwApi(Main);