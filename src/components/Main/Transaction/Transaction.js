import React from 'react';
import Dialog from '../../Dialog/Dialog';
import AutocompleteInput from '../../AutocompleteInput/AutocompleteInput';
import withPwApi from '../../hoc-helpers/withPwApi';
import PropTypes from 'prop-types';
import './Transaction.css';

class Transaction extends React.Component {
    static propTypes = {
		token: PropTypes.string.isRequired,
		clearErr: PropTypes.func.isRequired,
		error: PropTypes.string,
		throwLocalError: PropTypes.func.isRequired,
		catchError: PropTypes.func.isRequired,
		updateTransList: PropTypes.func.isRequired,
		updateBalance: PropTypes.func.isRequired,
	}

	state = {
		recipient: '',
		amount: '',
		isConfirmNeeded: false,
		message: null
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
		this.setState({message: null});
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
		const dialog = isConfirmNeeded && <Dialog header='Confirm Operation'
							message = {`Send ${amount} PW to ${recipient}?`}
							handleYes = {() => this.handleConfirm(true)}
							handleNo = {()=>this.handleConfirm(false)} />;

		return (
			<>
				<form className="transaction" onSubmit={this.onSubmit}>
					<h2>Create Transaction</h2>
					<AutocompleteInput name='recipient' value ={recipient}
						placeholder="Recipient's Name"
						handleChange={this.handleChange} 
						getData = {pwApi.getUsersList} getDataArgs = {[token]}
						onSelect={this.handleAutocompleteSelect}
						catchError={catchError} clearErr={clearErr} />
					<input type='number' id='amount' name='amount' placeholder="amount"
							value={amount} onChange = {this.handleChange} required />
					<button className='send_btn' type='submit'>Send</button>
					<div className="warning">{error}</div>
					<div className = 'message'>{message}</div>
				</form>
				{dialog}
			</>
		)
	}
}
export default withPwApi(Transaction);