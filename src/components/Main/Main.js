import React from "react";
import { connect } from 'react-redux';
import Header from "./Header/Header";
import History from "./History/History";
import Transaction from "./Transaction/Transaction";
import withPwApi from "../hoc-helpers/withPwApi";
import Spinner from "../Spinner/Spinner";
import {catchErr, fetchUserInfoSuccess, fetchHistoryRequest, 
        fetchHistorySuccess} from "../../actions/actions";
import './Main.css';

class Main extends React.Component {
    
    updateUserInfo = () => {
        const {token,fetchUserInfoSuccess,pwApi} = this.props;
        pwApi.getUserInfo(token)                 // Sends request to server 
                                                // for logged user info
            .then((data) => {fetchUserInfoSuccess(data)})
            .catch((err) => {catchErr(err)});
    }

    updateTransList = () => {        // Sends request to server for Transactions History
        const {pwApi,token,fetchHistoryRequest, fetchHistorySuccess} = this.props;
        this.timeout = setTimeout(()=>{
            fetchHistoryRequest(); // state.loading is used for showing Spinner
        },1000);                  // if loading lasts longer than 1 sec
		pwApi.getTransList(token)
			.then((data) => {
                clearTimeout(this.timeout);
                fetchHistorySuccess(data);
			})
            .catch((err) => {
                clearTimeout(this.timeout);
                catchErr(err)});
    }

	componentDidMount () {
		this.updateUserInfo();
		this.updateTransList();
	}

    render () {
        const {historyArray, filterString, filterFlag, loading} = this.props;
        const spinner = (loading) ? <Spinner /> : null;
        return (
            <div className = 'main'>
                <Header />
                <Transaction updateTransList={this.updateTransList}/>
                <History historyArray={historyArray} 
                        filterString={filterString} filterFlag={filterFlag} />
                {spinner}
            </div>
        )
    }
}
const mapStateToProps = ({token, loading, historyArray, filterString,
                        filterFlag}) => {
    return {
        token,
        loading,
        historyArray,
        filterString,
        filterFlag
    }
}
const mapDispatchToProps = {
    catchErr,
    fetchUserInfoSuccess,
    fetchHistoryRequest,
    fetchHistorySuccess
}
export default withPwApi( connect(mapStateToProps, mapDispatchToProps) (Main));