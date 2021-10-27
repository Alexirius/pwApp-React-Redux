import React from "react";
import { connect } from 'react-redux';
import Header from "./Header/Header";
import History from "./History/History";
import Transaction from "./Transaction/Transaction";
import Spinner from "../Spinner/Spinner";
import {fetchUserInfoRequest, fetchHistoryRequest, catchErr} from "../../actions/mainActions";
import './Main.css';

class Main extends React.Component {
    
    updateUserInfo = () => {
        const {token,fetchUserInfoRequest} = this.props;
        fetchUserInfoRequest(token);
    }

    updateTransList = () => {        // Sends request to server for Transactions History
        const {token,fetchHistoryRequest} = this.props;
        fetchHistoryRequest(token);
    }

    // updateBalance = (balance) => {

    // }

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
const mapStateToProps = ({loginState, mainState, filterState}) => {
    
    const {token} = loginState;
    const {loading, historyArray} = mainState;
    const {filterString, filterFlag} = filterState;
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
    fetchUserInfoRequest,
    fetchHistoryRequest,
}
export default connect(mapStateToProps, mapDispatchToProps) (Main);