let timeout;

export const inputChanged = (ev) => ({
    type: 'TRANSACTION_INPUT_CHANGED', payload: ev.target
});

export const catchErr = (err) => ({
    type: 'TRANSACTION_CATCH_ERROR',
    payload: err.toString()
});

export const clearErr = () => ({
    type: 'TRANSACTION_CATCH_ERROR',
    payload: ''
});

export const handleAutocompleteSelect = (userName) => ({
    type: 'AUTOCOMPLETE_ITEM_SELECTED',
    payload: userName
});

const clearMessage = () => ({
    type: 'CLEAR_MESSAGE'
});

export const createTransactionRequest = (token, recipient, amount, updateTransList) => {
    timeout = setTimeout(()=>{
        return {type: 'CREATE_TRANSACTION_REQUEST'}
    },1000);
    clearMessage();
    console.log('authorizationRequest');
    return (dispatch, getState, pwApi) => {
    pwApi.createTransaction(token, recipient, amount)
        .then((data) => {
            clearTimeout(timeout);
            dispatch(createTransactionSuccess(data));
            dispatch(updateBalance(data.balance));
            updateTransList();
        })
        .catch((err) => {
            clearTimeout(timeout);
            dispatch(catchErr(err))});
    }
}

const createTransactionSuccess = (data) => ({
    type: 'CREATE_TRANSACTION_SUCCESS',
    payload: data
});

export const showDialog = () => ({
    type: 'SHOW_DIALOG'
});

export const removeDialog = () => ({
    type: 'REMOVE_DIALOG'
});

const updateBalance = (balance) => ({
    type: 'UPDATE_BALANCE',
    payload: balance
})