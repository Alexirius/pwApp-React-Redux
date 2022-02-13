import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter';
import HistoryContent from './HistoryContent';
import './History.css';

const History = React.memo(({historyArray})=>{

	const [filterString, setfilterString] = useState('');
	const [filterFlag, setfilterFlag] = useState('all');
			// filterFlag: possible values: 'all' || 'debit' || 'credit'

	const handleFilterChange = (string) => {setfilterString(string)};
	
	const handleFilterClick = (flag) => {setfilterFlag(flag)};

	const handleFilterClear = () => {setfilterString('')};

	return (
		<div className="history">
			<h2>Transactions History</h2>
			<Filter filterString={filterString}
					onFilterChange={handleFilterChange}
					filterFlag={filterFlag}
					onFilterClick={handleFilterClick}
					onFilterClear={handleFilterClear} />
			<HistoryContent historyArray={historyArray}
					filterString={filterString} filterFlag={filterFlag} />
		</div>
	);
});

History.propTypes = {
	historyArray: PropTypes.arrayOf(PropTypes.shape({
		amount: PropTypes.number.isRequired,
		balance: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		username: PropTypes.string.isRequired
	})).isRequired,
}
export default History;