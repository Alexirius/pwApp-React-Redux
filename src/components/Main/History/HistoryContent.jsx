import React from 'react';

const HistoryContent = ({historyArray, filterString, filterFlag}) => {

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
                {renderTable(historyArray)}
            </tbody>
        </table>
    );
}

export default HistoryContent;