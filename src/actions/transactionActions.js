import { createAction } from "@reduxjs/toolkit";
import {fetchHistoryRequest, updateBalance} from './mainActions'

let timeout;

export const inputChanged = createAction("TRANSACTION_INPUT_CHANGED");
export const catchErr = createAction("TRANSACTION_CATCH_ERROR");
export const clearErr = createAction("TRANSACTION_CLEAR_ERROR");
export const handleAutocompleteSelect = createAction("AUTOCOMPLETE_ITEM_SELECTED");
export const clearMessage = createAction("CLEAR_MESSAGE");
export const createTransactionSuccess = createAction("CREATE_TRANSACTION_SUCCESS");
export const showDialog = createAction("SHOW_DIALOG");
export const removeDialog = createAction("REMOVE_DIALOG");
export const transactionRequest = createAction("CREATE_TRANSACTION_REQUEST");

export const createTransactionRequest = (token, recipient, amount) => {
    
    return (dispatch, getState, pwApi) => {
        timeout = setTimeout(() => {
            dispatch(transactionRequest())
        }, 300);
        dispatch(clearMessage());
        pwApi.createTransaction(token, recipient, amount)
            .then((data) => {
                clearTimeout(timeout);
                dispatch(createTransactionSuccess(data));
                dispatch(updateBalance(data.balance));
                dispatch(fetchHistoryRequest(token));
            })
            .catch((err) => {
                clearTimeout(timeout);
                dispatch(catchErr(err))
            });
    }
}
