import React from 'react';
import { connect } from 'react-redux';
import Dialog from '../../Dialog/Dialog';
import AutocompleteInput from '../../AutocompleteInput/AutocompleteInput';
import getUsersList from '../../../services/pw-api-service/getUsersList';
import { handleAutocompleteSelect, createTransactionRequest, showDialog, removeDialog,
	inputChanged, clearErr, catchErr} from '../../../actions/transactionActions';
import './Transaction.css';

const Transaction = ({recipient, error, message, amount, isConfirmNeeded, token,
			inputChanged, catchErr, clearErr, handleAutocompleteSelect,
			createTransactionRequest, showDialog, removeDialog, updateTransList,
			updateBalance}) => {
    
	const onSubmit = (ev) => {
		ev.preventDefault();
		if (!amount || parseFloat(amount) <= 0)  {		// Local validation
			return catchErr("Error: Invalid PW Amount")
		}
		showDialog();
    }

	const handleConfirm = (confirmed) => {
		removeDialog();
		if (confirmed) {
			createTransactionRequest(token, recipient, amount, updateTransList, updateBalance);
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
const mapStateToProps = ({loginState, transactionState}) => {
	const {recipient, error, message, amount, isConfirmNeeded} = transactionState;
	const {token} = loginState;
	return {recipient, error, message, amount, isConfirmNeeded, token}
}

const mapDispatchToProps = {
	inputChanged,
	catchErr,
	clearErr,
	handleAutocompleteSelect,
	createTransactionRequest,
	showDialog,
	removeDialog
}
export default connect(mapStateToProps, mapDispatchToProps) (Transaction);