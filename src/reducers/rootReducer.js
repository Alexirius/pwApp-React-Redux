import { combineReducers } from 'redux'
import loginReducer from './loginReducer';
import mainReducer from './mainReducer';
import filterReducer from './filterReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    main: mainReducer,
    filter: filterReducer,
    transaction: transactionReducer,
})

export default rootReducer;