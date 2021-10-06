import React from 'react';
import Dialog from '../../Dialog/Dialog';
import AutocompleteField from '../../AutocompleteField/AutocompleteField';
import withPwApi from '../../hoc-helpers/withPwApi';
import './Transaction.css';

class Transaction extends React.Component {


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
		
		if (!amount || parseFloat(amount) <= 0)  {		// Local validation
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
			const {token, catchError, updateTransList, clearErr,
					updateBalance, pwApi} = this.props;
			pwApi.createTransaction(token, recipient, amount)
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
		const {token, error, catchError, clearErr, pwApi} = this.props;
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
							getData = {pwApi.getUsersList} getDataArgs = {[token]}
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
export default withPwApi(Transaction);