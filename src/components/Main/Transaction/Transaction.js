import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../Dialog/Dialog';
import AutocompleteInput from '../../AutocompleteInput/AutocompleteInput';
import withPwApi from '../../hoc-helpers/withPwApi';
import './Transaction.css';

const Transaction = (props) => {

	const [state, setstate] = useState({
		recipient: '',
		amount: '',
		isConfirmNeeded: false,
		message: null
	})
	const {createTransaction, getUsersList} = props.pwApi;
	const handleChange = (ev) => {	// on inputs change
        const {name, value} = ev.target;
        setstate((state) =>{return {...state, [name]: value}});
    }

	const handleAutocompleteSelect = (userName) => {
		setstate((state)=>{return {...state, recipient: userName}});
	}

	const handleSubmit = (ev) => {
		ev.preventDefault();
		const {amount} = state;
		const {throwLocalError, clearErr} = props;
		setstate((state)=>{return {...state, message: null}});
		clearErr();
		if (!amount || parseFloat(amount) <= 0)  {		// Local validation
			throwLocalError("Invalid PW Amount");
			return false;
		}
		setstate((state)=>{return {...state, isConfirmNeeded: true}});
	}

	const handleConfirm = (confirmed) => {			// Send request to register new
													// transaction if confirmed by user
		setstate((state)=>{return {...state, isConfirmNeeded: false}});

		if (confirmed) {
			const {recipient, amount} = state;
			const {token, catchError, updateTransList, clearErr,
					updateBalance} = props;
			createTransaction(token, recipient, amount)
				.then((res) => {
					const {amount, username, balance} = res;
					clearErr();
					updateTransList();
					updateBalance(balance);
					setstate((state)=>{return {...state,
						message: `Success. You sent ${-amount} PW to ${username}.`}})
				})
				.catch((err) => {catchError(err)});
		}
	}

	const {recipient, amount, isConfirmNeeded, message} = state;
	const {token, error, catchError, clearErr} = props;
	const dialog = isConfirmNeeded &&
			<Dialog header='Confirm Operation'
					message = {`Send ${amount} PW to ${recipient}?`}
					handleYes = {() => handleConfirm(true)}
					handleNo = {()=>handleConfirm(false)} />;
	return (
		<>
			<form className="transaction" onSubmit={handleSubmit}>
				<h2>Create Transaction</h2>
				<AutocompleteInput name='recipient'
						value ={recipient}
						placeholder="Recipient's Name"
						handleChange={handleChange}
						getData = {getUsersList}
						getDataArgs = {[token]}
						handleSelect={handleAutocompleteSelect}
						catchError={catchError}
						clearErr={clearErr} />
				<input type='number' id='amount' name='amount' placeholder="amount"
						value={amount} onChange = {handleChange} required />
				<button className='send_btn' type='submit'>Send</button>
				<div className="warning">{error}</div>
				<div className = 'message'>{message}</div>
			</form>
			{dialog}
		</>
		);
};

Transaction.propTypes = {
	error: PropTypes.string,
	token: PropTypes.string.isRequired,
	catchError: PropTypes.func.isRequired,
	clearErr: PropTypes.func.isRequired,
	updateTransList: PropTypes.func.isRequired,
	updateBalance: PropTypes.func.isRequired,
	throwLocalError: PropTypes.func.isRequired,
};
export default withPwApi(Transaction);