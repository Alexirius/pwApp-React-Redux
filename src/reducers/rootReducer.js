import { combineReducers } from 'redux'
import loginReducer from './loginReducer';
import mainReducer from './mainReducer';
import filterReducer from './filterReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
    loginState:  loginReducer,
    mainState:   mainReducer,
    filterState: filterReducer,
    transactionState: transactionReducer,
})

export default rootReducer;