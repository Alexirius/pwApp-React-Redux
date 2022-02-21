import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter/Filter';
import { fetchHistoryRequest } from "../../../actions/mainActions";
import HistoryContent from './HistoryContent';
import Spinner from "../../UI/Spinner/Spinner";
import './History.css';

const History = () => {

	const dispatch = useDispatch();
	const token = useSelector(state => state.login.token);
    const loading = useSelector(state => state.main.loading);

	useEffect(() => {
		dispatch(fetchHistoryRequest(token));
		// eslint-disable-next-line
	}, [])

	return (
		<div className="history">
			<h2>Transactions History</h2>
			<Filter />
			{(loading) ? <Spinner /> :<HistoryContent />}
		</div>
	)
};

export default History;