import { createAction } from "@reduxjs/toolkit";

let timeout;

export const inputChanged = createAction("TRANSACTION_INPUT_CHANGED");
export const catchErr = createAction("TRANSACTION_CATCH_ERROR");
export const clearErr = createAction("TRANSACTION_CLEAR_ERROR");
export const handleAutocompleteSelect = createAction("AUTOCOMPLETE_ITEM_SELECTED");
export const clearMessage = createAction("CLEAR_MESSAGE");
export const createTransactionSuccess = createAction("CREATE_TRANSACTION_SUCCESS");
export const showDialog = createAction("SHOW_DIALOG");
export const removeDialog = createAction("REMOVE_DIALOG");

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
const updateBalance = (balance) => ({
    type: 'UPDATE_BALANCE',
    payload: balance
});