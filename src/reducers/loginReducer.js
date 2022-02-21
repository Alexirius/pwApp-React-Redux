import { createReducer } from '@reduxjs/toolkit';
import {
    handleLogout, newAccount, notNewAccount, inputChanged,
    catchErr, authorizationSuccess
} from '../actions/loginActions';

const initialState = {
    email: '',
    password: '',
    username: '',
    passConfirm: '',
    isNewAccount: false,
    error: '',
    token: ''
}
export default createReducer(initialState, {
    [handleLogout.type]: () => (initialState),

    [newAccount.type]: (state, action) => {
        return { ...state, isNewAccount: true, error: '' };
    },
    [notNewAccount.type]: (state, action) => ({
        ...state,
        isNewAccount: false,
        error: ''
    }),
    [inputChanged.type]: (state, action) => {
        const { name, value } = action.payload;
        return { ...state, [name]: value }
    },
    [catchErr.type]: (state, action) => {
        console.log(action.payload);
        return {
            ...state,
            error: action.payload.toString(),
        };
    },
    [authorizationSuccess.type]: (state, action) => ({
        ...state,
        token: action.payload,
        error: ''
    }),
});