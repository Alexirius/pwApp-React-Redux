import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter';
import HistoryContent from './HistoryContent';
import './History.css';

const History = ({ historyArray, filterString, filterFlag }) => {

	const filterArray = (arr) => {
		if (filterString.length) {          //filter table by any field values
			arr = arr.filter((curObj) => {
				return curObj.date.toUpperCase().includes(filterString.toUpperCase()) ||
					curObj.username.toUpperCase().includes(filterString.toUpperCase()) ||
					curObj.amount.toString().includes(filterString) ||
					curObj.balance.toString().includes(filterString)
			})
		}
		if (filterFlag === 'debit') {           // filter debit/credit
			arr = arr.filter(({ amount }) => amount > 0)
		} else if (filterFlag === 'credit') {
			arr = arr.filter(({ amount }) => amount < 0)
		}
		return arr;
	}
	const filteredArray = filterArray(historyArray);
	let historyContent;
	if (!historyArray.length) {
		historyContent = 'You have no Transactions History yet.';
	} else if (!filteredArray.length) {
		historyContent = 'No matches found.';
	} else {
		historyContent = <HistoryContent historyArray={filteredArray} />
	}

	return (
		<div className="history">
			<h2>Transactions History</h2>
			<Filter />
			{historyContent}
		</div>
	)
};

History.propTypes = {
	historyArray: PropTypes.arrayOf(PropTypes.shape({
		amount: PropTypes.number.isRequired,
		balance: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		username: PropTypes.string.isRequired
	})).isRequired,
	filterString: PropTypes.string.isRequired,
	filterFlag: PropTypes.oneOf(['all', 'debit', 'credit']).isRequired
}

export default History;