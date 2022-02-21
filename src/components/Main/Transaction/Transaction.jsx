import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../../UI/Dialog/Dialog';
import AutocompleteInput from '../../UI/AutocompleteInput/AutocompleteInput';
import getUsersList from '../../../services/pw-api-service/getUsersList';
import { handleAutocompleteSelect, createTransactionRequest, showDialog, removeDialog,
	inputChanged, clearErr, catchErr, clearMessage} from '../../../actions/transactionActions';
import Spinner from "../../UI/Spinner/Spinner";
import './Transaction.css';

const Transaction = () => {

	const dispatch = useDispatch();
    const token = useSelector(state => state.login.token);
    const amount = useSelector(state => state.transaction.amount);
    const recipient = useSelector(state => state.transaction.recipient);
    const isConfirmNeeded = useSelector(state => state.transaction.isConfirmNeeded);
    const error = useSelector(state => state.transaction.error);
    const message = useSelector(state => state.transaction.message);
    const username = useSelector(state => state.main.username);
    const loading = useSelector(state => state.transaction.loading);

	const onSubmit = (ev) => {
		ev.preventDefault();
		dispatch(clearMessage());
		if (!amount || parseFloat(amount) <= 0)  {		// Local validation
			return dispatch(catchErr("Error: Invalid PW Amount"))
		}
		if (recipient === username) {
			return dispatch(catchErr("Error: You can't send PW to yourself."))
		}
		dispatch(showDialog());
    }

	const handleConfirm = (confirmed) => {
		dispatch(removeDialog());
		if (confirmed) {
			dispatch(createTransactionRequest(token, recipient, amount));
		}
	}

	const onAutocompleteSelect = (userName) => {
		dispatch(handleAutocompleteSelect(userName))
	}

	const dialog = isConfirmNeeded && <Dialog header='Confirm Operation'
						message = {`Send ${amount} PW to ${recipient}?`}
						handleYes = {() => handleConfirm(true)}
						handleNo = {()=>handleConfirm(false)} />;

	if (loading) return <Spinner />
	return (
		<>
			<form className="transaction" onSubmit={onSubmit}>
				<h2>Create Transaction</h2>
				<AutocompleteInput name='recipient' value ={recipient}
					placeholder="Recipient's Name"
					handleChange={ev=>dispatch(inputChanged(ev.target))} 
					getData = {getUsersList} getDataArgs = {[token]}
					handleSelect={onAutocompleteSelect}
					catchError={catchErr} clearErr={clearErr} />
				<input type='number' id='amount' name='amount' placeholder="amount"
						value={amount} onChange = {ev=>dispatch(inputChanged(ev.target))} required />
				<button className='send_btn' type='submit'>Send</button>
				<div className="warning">{error}</div>
				<div className = 'message'>{message}</div>
			</form>
			{dialog}
		</>
	)
};

export default Transaction;