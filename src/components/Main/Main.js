import React from "react";
import Header from "./Header/Header";
import History from "./History/History";
import Transaction from "./Transaction/Transaction";
import withPwApi from "../hoc-helpers/withPwApi";
import Spinner from "../Spinner/Spinner";
import PropTypes from 'prop-types';
import './Main.css';

class Main extends React.Component {
    static propTypes = {
        userName: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        token: PropTypes.string.isRequired,
        error: PropTypes.string,
        handleLogout: PropTypes.func.isRequired,
        updateBalance: PropTypes.func.isRequired,
        clearErr: PropTypes.func.isRequired,
        throwLocalError: PropTypes.func.isRequired,
        catchError: PropTypes.func.isRequired
    }

    state = {
        historyArray: [],
        loading: false
    }

    timeout = '';

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