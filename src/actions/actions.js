const newAccount = () => ({type: 'NEW_ACCOUNT'});

const notNewAccount = () => ({type: 'NOT_NEW_ACCOUNT'});

const inputChanged = (ev) => ({type: 'INPUT_CHANGED', payload: ev.target});

const catchErr = (err) => ({type: 'CATCH_ERROR', payload: err});

const clearErr = () => ({type: 'CATCH_ERROR', payload: ''});

const clearMessage = () => ({type: 'CLEAR_MESSAGE'});

const authorizationSuccess = (token) => {
    return {type: 'AUTHORIZATION_SUCCESS',
            payload: token}
}
const fetchUserInfoSuccess = (data) => {
    return {type: 'FETCH_USER_INFO_SUCCESS',
            payload: data}
}
const handleLogout = () => {
    return {type: 'LOGOUT'}
}
const handleFilterClear = () => {
    return {type: 'FILTER_STRING_CLEARED'}
}
const handleFilterClick = (flag) => {
    return {type: 'FILTER_FLAG_CHANGED',
            payload: flag}
}
const fetchHistoryRequest = () => {
    return {type: 'FETCH_HISTORY_REQUEST'}
}
const fetchHistorySuccess = (array) => {
    return {type: 'FETCH_HISTORY_SUCCESS',
            payload: array}
}
const handleAutocompleteSelect = (userName) => {
    return {type: 'AUTOCOMPLETE_ITEM_SELECTED',
            payload: userName}
}
const createTransactionRequest = () => {
    return {type: 'CREATE_TRANSACTION_REQUEST'}
}
const createTransactionSuccess = (data) => {
    return {type: 'CREATE_TRANSACTION_SUCCESS',
            payload: data}
}
const showDialog = () => {
    return {type: 'SHOW_DIALOG'}
}
const removeDialog = () => {
    return {type: 'REMOVE_DIALOG'}
}

export {
    newAccount,
    notNewAccount,
    inputChanged,
    catchErr,
    clearErr,
    authorizationSuccess,
    fetchUserInfoSuccess,
    handleLogout,
    handleFilterClear,
    handleFilterClick,
    fetchHistoryRequest,
    fetchHistorySuccess,
    handleAutocompleteSelect,
    createTransactionRequest,
    createTransactionSuccess,
    showDialog,
    removeDialog,
    clearMessage
};