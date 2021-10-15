import React, {useState} from 'react';
import Filter from './Filter/Filter';
import HistoryContent from './HistoryContent';
import './History.css';

const History = ({historyArray})=>{

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
	)
};
export default History;