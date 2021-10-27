import { createReducer } from '@reduxjs/toolkit';
import {handleFilterClear , handleFilterClick, filterStringChanged} from '../actions/filterActions';

const initialState = {
    filterString: '',
    filterFlag: 'all',      // possible values: 'all' || 'debit' || 'credit'
}

export default createReducer(initialState, {
    [handleFilterClear.type]: (state, action) => ({...state,
        filterString: ''
    }),
    [handleFilterClick.type]: (state, action) => ({...state,
        filterFlag: action.payload
    }),
    [filterStringChanged.type]: (state, action) => {
        const { name, value } = action.payload;
        return {...state,
            [name]: value,
        };
    }
});