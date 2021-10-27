import { createAction } from "@reduxjs/toolkit";

export const handleLogout = createAction("LOGOUT");
export const newAccount = createAction("NEW_ACCOUNT");
export const notNewAccount = createAction("NOT_NEW_ACCOUNT");
export const inputChanged = createAction("LOGIN_INPUT_CHANGED");
export const catchErr = createAction("LOGIN_CATCH_ERROR");
export const authorizationSuccess = createAction("AUTHORIZATION_SUCCESS");

export const authorizationRequest = (passObj, isNewAccount) => {
    return (dispatch, getState, pwApi) => {
        pwApi.getToken (passObj, isNewAccount)
            .then((token) => {dispatch(authorizationSuccess(token))})
            .catch((err) => {dispatch(catchErr(err))})
    }
};
