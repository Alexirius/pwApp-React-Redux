import React from 'react';
import Filter from './Filter/Filter';
import HistoryContent from './HistoryContent';
import './History.css';

export default class History extends React.Component {

	state={
		filterString: '',
		filterFlag: 'all'	// possible values: 'all' || 'debit' || 'credit'
	}

	handleFilterChange = (string) => {
		this.setState({
			filterString: string
		})
	}
	
	handleFilterClick = (flag) => {
		this.setState({
			filterFlag: flag
		})
	}

	handleFilterClear = () => {
		this.setState({
			filterString: ''
		})
	}

	render() {
		let {historyArray} = this.props;
		const {filterString, filterFlag} = this.state;
		return (
			<div className="history">
				<h2>Transactions History</h2>
				<Filter filterString={filterString}
						onFilterChange={this.handleFilterChange}
						filterFlag={filterFlag}
						onFilterClick={this.handleFilterClick}
						onFilterClear={this.handleFilterClear} />
				<HistoryContent historyArray={historyArray}
						filterString={filterString} filterFlag={filterFlag} />
			</div>
		)
	}
};