import { createReducer } from '@reduxjs/toolkit';
import {
    inputChanged, catchErr, clearErr, handleAutocompleteSelect, transactionRequest,
    clearMessage, createTransactionSuccess, showDialog, removeDialog,
} from '../actions/transactionActions';

const initialState = {
    recipient: '',
    amount: '',
    error: '',
    message: '',
    isConfirmNeeded: false
}

export default createReducer(initialState, {
    [catchErr.type]: (state, action) => {
        console.log(action.payload);
        return {
            ...state,
            error: action.payload.toString(),
        };
    },
    [clearErr.type]: (state, action) => ({
        ...state,
        error: '',
    }),
    [inputChanged.type]: (state, action) => {
        const { name, value } = action.payload;
        return {
            ...state,
            [name]: value,
        };
    },
    [handleAutocompleteSelect.type]: (state, action) => ({
        ...state,
        recipient: action.payload
    }),
    [showDialog.type]: (state, action) => ({
        ...state,
        isConfirmNeeded: true,
        error: ''
    }),
    [removeDialog.type]: (state, action) => ({
        ...state,
        isConfirmNeeded: false,
    }),
    [clearMessage.type]: (state, action) => ({
        ...state,
        message: ''
    }),
    [transactionRequest.type]: (state, action) => ({
        ...state,
        loading: true,
        error: ''
    }),
    [createTransactionSuccess.type]: (state, action) => ({
        ...state,
        balance: action.payload.balance,
        loading: false,
        error: '',
        message: `Success. You sent ${-action.payload.amount} PW to ${action.payload.username}.`
    }),
});