import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from "./Header/Header";
import History from "./History/History";
import Transaction from "./Transaction/Transaction";
import Spinner from "../Spinner/Spinner";
import {fetchUserInfoRequest, fetchHistoryRequest} from "../../actions/mainActions";
import './Main.css';

class Main extends React.Component {

    static propTypes = {
        token: PropTypes.string,
        loading: PropTypes.bool,
        historyArray: PropTypes.array,
        filterString: PropTypes.string,
        filterFlag: PropTypes.oneOf(['all', 'debit', 'credit'])
    }
    
    updateUserInfo = () => {
        const {token,fetchUserInfoRequest} = this.props;
        fetchUserInfoRequest(token);
    }

    updateTransList = () => {
        const {token,fetchHistoryRequest} = this.props;
        fetchHistoryRequest(token);
    }

	componentDidMount () {
		this.updateUserInfo();
		this.updateTransList();
	}

    render () {
        const {historyArray, filterString, filterFlag, loading, error} = this.props;
        const spinner = (loading) ? <Spinner /> : null;
        const history = (error) ?
            <div className='warning'> {error} </div>
        :
            <History historyArray={historyArray} filterString={filterString}
                    filterFlag={filterFlag} />
        return (
            <div className = 'main'>
                <Header />
                <Transaction updateTransList={this.updateTransList}/>
                {history}
                {spinner}
            </div>
        )
    }
}
const mapStateToProps = ({loginState, mainState, filterState}) => {
    
    const {token} = loginState;
    const {loading, historyArray, error} = mainState;
    const {filterString, filterFlag} = filterState;
    return {
        error,
        token,
        loading,
        historyArray,
        filterString,
        filterFlag
    }
}
const mapDispatchToProps = {
    fetchUserInfoRequest,
    fetchHistoryRequest,
}
export default connect(mapStateToProps, mapDispatchToProps) (Main);