import { createAction } from "@reduxjs/toolkit";
let timeout;

export const catchErr = createAction("MAIN_CATCH_ERROR");
export const fetchUserInfoSuccess = createAction("FETCH_USER_INFO_SUCCESS");
export const fetchHistorySuccess = createAction("FETCH_HISTORY_SUCCESS");
export const updateBalance = createAction("UPDATE_BALANCE");
export const request = createAction("REQUEST");

export const fetchUserInfoRequest = (token) => {
    return (dispatch, getState, pwApi) => {
        pwApi.getUserInfo(token)
            .then((data) => { dispatch(fetchUserInfoSuccess(data)) })
            .catch((err) => { dispatch(catchErr(err.toString())) });
    }
};

export const fetchHistoryRequest = (token) => {
    return (dispatch, getState, pwApi) => {
        timeout=setTimeout(()=>{
            dispatch(request())}
        ,300)
        pwApi.getTransList(token)
            .then((data) => {
                clearTimeout(timeout);
                dispatch(fetchHistorySuccess(data));})
            .catch((err) => {
                clearTimeout(timeout);
                dispatch(catchErr(err.toString()))});
    }
};
