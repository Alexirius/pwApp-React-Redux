import React from 'react';
import { connect } from 'react-redux';
import Dialog from '../../Dialog/Dialog';
import AutocompleteInput from '../../AutocompleteInput/AutocompleteInput';
import withPwApi from '../../hoc-helpers/withPwApi';
import { catchErr, clearErr, inputChanged, handleAutocompleteSelect,
	createTransactionRequest, createTransactionSuccess,
	showDialog, removeDialog, clearMessage} from '../../../actions/actions';
import './Transaction.css';

let timeout;

const Transaction = ({pwApi, recipient, error, message, amount, isConfirmNeeded,
					token,
					inputChanged, catchErr, clearErr, handleAutocompleteSelect,
					createTransactionRequest, createTransactionSuccess,
					showDialog, removeDialog, clearMessage, updateTransList}) => {
    
	const {createTransaction, getUsersList} = pwApi;

	const onSubmit = (ev) => {
		ev.preventDefault();
		if (!amount || parseFloat(amount) <= 0)  {		// Local validation
			return catchErr("Error: Invalid PW Amount")
		}
		showDialog();
    }

	const handleConfirm = (confirmed) => {	// Send request to register new
											// transaction if user confirmed
		removeDialog();
		if (confirmed) {
			timeout = setTimeout(()=>{
				createTransactionRequest();
			},1000);
			clearMessage();
			createTransaction(token, recipient, amount)
				.then((data) => {
					clearTimeout(timeout);
					createTransactionSuccess(data);
					updateTransList();
				})
				.catch((err) => {
					clearTimeout(timeout);
					catchErr(err)});
		}
	}

	const dialog = isConfirmNeeded && <Dialog header='Confirm Operation'
						message = {`Send ${amount} PW to ${recipient}?`}
						handleYes = {() => handleConfirm(true)}
						handleNo = {()=>handleConfirm(false)} />;

	return (
		<>
			<form className="transaction" onSubmit={onSubmit}>
				<h2>Create Transaction</h2>
				<AutocompleteInput name='recipient' value ={recipient}
					placeholder="Recipient's Name"
					handleChange={inputChanged} 
					getData = {getUsersList} getDataArgs = {[token]}
					onSelect={handleAutocompleteSelect}
					catchError={catchErr} clearErr={clearErr} />
				<input type='number' id='amount' name='amount' placeholder="amount"
						value={amount} onChange = {inputChanged} required />
				<button className='send_btn' type='submit'>Send</button>
				<div className="warning">{error}</div>
				<div className = 'message'>{message}</div>
			</form>
			{dialog}
		</>
		)
}
const mapStateToProps = (
			{recipient, error, message, amount, isConfirmNeeded, token}) => {
	return {recipient, error, message, amount, isConfirmNeeded, token}
}

const mapDispatchToProps = {
	inputChanged,
	catchErr,
	clearErr,
	handleAutocompleteSelect,
	createTransactionRequest,
	createTransactionSuccess,
	showDialog,
	removeDialog,
	clearMessage
}
export default withPwApi( connect(mapStateToProps, mapDispatchToProps) (Transaction));