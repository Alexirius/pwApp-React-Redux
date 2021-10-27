import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '../../Dialog/Dialog';
import AutocompleteInput from '../../AutocompleteInput/AutocompleteInput';
import getUsersList from '../../../services/pw-api-service/getUsersList';
import { handleAutocompleteSelect, createTransactionRequest, showDialog, removeDialog,
	inputChanged, clearErr, catchErr, clearMessage} from '../../../actions/transactionActions';
import './Transaction.css';

const Transaction = ({recipient, error, message, amount, isConfirmNeeded, token, username,
			inputChanged, catchErr, clearErr, handleAutocompleteSelect, clearMessage,
			createTransactionRequest, showDialog, removeDialog, updateTransList}) => {
    
	const onSubmit = (ev) => {
		ev.preventDefault();
		clearMessage();
		if (!amount || parseFloat(amount) <= 0)  {		// Local validation
			return catchErr("Error: Invalid PW Amount")
		}
		if (recipient === username) {
			return catchErr("Error: You can't send PW to yourself.")
		}
		console.log(recipient, username);
		showDialog();
    }

	const handleConfirm = (confirmed) => {
		removeDialog();
		if (confirmed) {
			createTransactionRequest(token, recipient, amount, updateTransList);
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
					handleChange={ev=>inputChanged(ev.target)} 
					getData = {getUsersList} getDataArgs = {[token]}
					onSelect={handleAutocompleteSelect}
					catchError={catchErr} clearErr={clearErr} />
				<input type='number' id='amount' name='amount' placeholder="amount"
						value={amount} onChange = {ev=>inputChanged(ev.target)} required />
				<button className='send_btn' type='submit'>Send</button>
				<div className="warning">{error}</div>
				<div className = 'message'>{message}</div>
			</form>
			{dialog}
		</>
		)
};

Transaction.propTypes = {
	recipient: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]).isRequired,
	isConfirmNeeded: PropTypes.bool.isRequired,
	token: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	inputChanged: PropTypes.func.isRequired,
	catchErr: PropTypes.func.isRequired,
	clearErr: PropTypes.func.isRequired,
	handleAutocompleteSelect: PropTypes.func.isRequired,
	clearMessage: PropTypes.func.isRequired,
	createTransactionRequest: PropTypes.func.isRequired,
	showDialog: PropTypes.func.isRequired,
	removeDialog: PropTypes.func.isRequired,
	updateTransList: PropTypes.func.isRequired
}

const mapStateToProps = ({loginState, transactionState, mainState}) => {
	const {recipient, error, message, amount, isConfirmNeeded} = transactionState;
	const {token} = loginState;
	const {username} = mainState;
	return {recipient, error, message, amount, isConfirmNeeded, token, username}
}

const mapDispatchToProps = {
	inputChanged,
	catchErr,
	clearErr,
	handleAutocompleteSelect,
	createTransactionRequest,
	showDialog,
	removeDialog,
	clearMessage
}
export default connect(mapStateToProps, mapDispatchToProps) (Transaction);