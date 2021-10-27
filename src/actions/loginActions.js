export const newAccount = () => ({
    type: 'NEW_ACCOUNT'
});

export const notNewAccount = () => ({
    type: 'NOT_NEW_ACCOUNT'
});

export const inputChanged = (ev) => ({
    type: 'LOGIN_INPUT_CHANGED',
    payload: ev.target
});

export const catchErr = (err) => ({
    type: 'LOGIN_CATCH_ERROR',
    payload: err.toString()
});

const authorizationSuccess = (token) => ({
    type: 'AUTHORIZATION_SUCCESS',
    payload: token
});

export const authorizationRequest = (passObj, isNewAccount) => {
    return (dispatch, getState, pwApi) => {
        pwApi.getToken (passObj, isNewAccount)
            .then((token) => {dispatch(authorizationSuccess(token))})
            .catch((err) => {dispatch(catchErr(err))})
    }
};

