import React from 'react';
import ApiService from '../../../services/api-service';
import Dialog from '../../Dialog/Dialog';
import AutocompleteField from '../../AutocompleteField/AutocompleteField';
import './Transaction.css';

export default class Transaction extends React.Component {

	api = new ApiService();

	state = {
		recipient: '',
		amount: '',
		isConfirmNeeded: false,
		message: ''
	}

	handleChange = (ev) => {	// on inputs change
        const {name, value} = ev.target;
        this.setState({
            [name]: value
        });
    }

	handleAutocompleteSelect = (userName) => {
		this.setState({recipient: userName});
	}

	onSubmit = (ev) => {
		ev.preventDefault();
		const {amount} = this.state;
		const {throwLocalError, clearErr} = this.props;
		this.setState({message: ''});
		clearErr();
		
		if (!amount || parseInt(amount) <= 0)  {		// Local validation
			throwLocalError("Invalid PW Amount");
			return false;
		}
		this.setState({isConfirmNeeded: true});
	}

	handleConfirm = (confirmed) => {				// Send request to register new
													// transaction if user confirmed
		this.setState({isConfirmNeeded: false});

		if (confirmed) {
			const {recipient, amount} = this.state;
			const {token, catchError, updateTransList, clearErr, updateBalance} = this.props;
			this.api.createTransaction(token, recipient, amount)
				.then((res) => {
					const {amount, username, balance} = res;
					clearErr();
					updateTransList();
					updateBalance(balance);
					this.setState({message: `Success. You sent ${-amount} PW to ${username}.`})
				})
				.catch((err) => {catchError(err)});
		}
	}

	render() {

		const {recipient, amount, isConfirmNeeded, message} = this.state;
		const {token, error, catchError, clearErr} = this.props;
		console.log(error);
        const warning = (error)? <div className="warning">
                {error}
            </div> : null;
		const messageDiv = (message.length) ? <div className = 'message'>{message}</div> : ''
		const dialog = (isConfirmNeeded) ? <Dialog header='Confirm Operation'
							message = {`Send ${amount} PW to ${recipient}?`}
							handleYes = {() => this.handleConfirm(true)}
							handleNo = {()=>this.handleConfirm(false)} />
						: null;

		return (
			<div>
				<form className="transaction" onSubmit={this.onSubmit}>
					<h2>Create Transaction</h2>

					<AutocompleteField name='recipient' value ={recipient} 
							placeholder="Recipient's Name"
							handleChange={this.handleChange} 
							getData = {this.api.getUsersList} getDataArgs = {[token]}
							onSelect={this.handleAutocompleteSelect}
							catchError={catchError} clearErr={clearErr} />
					<input type='number' id='amount' name='amount' placeholder="amount"
							value={amount} onChange = {this.handleChange} required />
					<button className='send_btn' type='submit'>Send</button>
					{warning}
					{messageDiv}
				</form>
				{dialog}
			</div>
		)
	}
}
