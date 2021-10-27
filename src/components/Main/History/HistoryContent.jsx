import React from 'react';
import PropTypes from 'prop-types';

const HistoryContent = ({historyArray}) => {

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
};

HistoryContent.propTypes = {
    historyArray: PropTypes.arrayOf(PropTypes.shape({
		amount: PropTypes.number.isRequired,
		balance: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		username: PropTypes.string.isRequired
	})).isRequired}

export default HistoryContent;