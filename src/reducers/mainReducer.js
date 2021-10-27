import { createReducer } from '@reduxjs/toolkit';
import { catchErr, fetchUserInfoSuccess, fetchHistorySuccess,
    fetchHistoryRequest} from '../actions/mainActions';

const initialState = {
    username: '',
    userId: 0,
    balance: 0,
    loading: true,
    historyArray: [],
    error: '',
}

export default createReducer(initialState, {
    [catchErr.type]: (state, action) => {
        console.log(action.payload);
        return {...state,
            loading: false,
            error: action.payload.toString(),
        };
    },
    [fetchUserInfoSuccess.type]: (state, action) => {
        const {username, id, balance} = action.payload;
        return {...state,
            balance,
            username,
            userId: id,
            error: ''
        };
    },
    [fetchHistorySuccess.type]: (state, action) => ({...state,
            loading: false,
            historyArray: action.payload,
            error: ''
    }),
    [fetchHistoryRequest.type]: (state, action) => ({...state,
        loading: true,
        historyArray: [],
        error: ''
    }),
    UPDATE_BALANCE: (state, action) => ({...state,
        balance: action.payload
    }),
});