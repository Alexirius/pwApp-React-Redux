import { createReducer } from '@reduxjs/toolkit';
import {
    catchErr, fetchUserInfoSuccess, fetchHistorySuccess,
    request, updateBalance
} from '../actions/mainActions';

const initialState = {
    username: '',
    userId: 0,
    balance: 0,
    loading: false,
    historyArray: [],
    error: '',
}

export default createReducer(initialState, {
    [catchErr.type]: (state, action) => {
        console.log(action.payload);
        return {
            ...state,
            loading: false,
            error: action.payload.toString(),
        };
    },
    [fetchUserInfoSuccess.type]: (state, action) => {
        const { username, id, balance } = action.payload;
        return {
            ...state,
            balance,
            username,
            userId: id,
            error: ''
        };
    },
    [fetchHistorySuccess.type]: (state, action) => ({
        ...state,
        loading: false,
        historyArray: action.payload,
        error: ''
    }),
    [request.type]: (state, action) => ({
        ...state,
        loading: true,
        historyArray: [],
        error: ''
    }),
    [updateBalance.type]: (state, action) => ({
        ...state,
        balance: action.payload
    }),
});