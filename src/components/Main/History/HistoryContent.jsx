import React from 'react';
import { useSelector } from 'react-redux';

const HistoryContent = () => {

    const historyArray = useSelector(state => state.main.historyArray);
    const filterString = useSelector(state => state.filter.filterString);
    const filterFlag = useSelector(state => state.filter.filterFlag);

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
			arr = arr.filter(({amount}) => amount > 0)
		} else if (filterFlag === 'credit') {
			arr = arr.filter(({amount}) => amount < 0)
		}
		return arr;
	}

    const renderTable = (arr) => {
		return arr.map( (item) => {
			const {id, date, username, amount, balance} = item;
			return (
				<tr key = {id}>
					<td>{date}</td>
					<td>{username}</td>
					<td>{amount}</td>
					<td>{balance}</td>
				</tr>
			)
		});
	}

    if (!historyArray.length) {
        return 'You have no Transactions History yet.';
    }
	const filteredArray = filterArray(historyArray);
    if (!historyArray.length) {
        return 'No matches found.';
    }

    const tHead = (
        <thead>
            <tr key = '000'>
                <th>Date</th>
                <th>Recipient/&shy;Sender</th>
                <th>Amount</th>
                <th>Balance</th>
            </tr>
        </thead>
    );

    return (
        <table className="history-table">
            {tHead}
            <tbody>
                {renderTable(filteredArray)}
            </tbody>
        </table>
    );
};

export default HistoryContent;