let timeout;

export const catchErr = (err) => ({
    type: 'MAIN_CATCH_ERROR',
    payload: err.toString()
});

export const fetchUserInfoRequest = (token) => {
    return (dispatch, getState, pwApi) => {
        pwApi.getUserInfo(token)
            .then((data) => {dispatch(fetchUserInfoSuccess(data))})
            .catch((err) => {dispatch(catchErr(err))});
    }
};

const fetchUserInfoSuccess = (data) => ({
    type: 'FETCH_USER_INFO_SUCCESS',
    payload: data
});

export const fetchHistoryRequest = (token) => {
    timeout = setTimeout(()=>{
        return {type: 'FETCH_HISTORY_REQUEST'}
    },1000);
    return (dispatch, getState, pwApi) => {
        pwApi.getTransList(token)
			.then((data) => {
                clearTimeout(timeout);
                dispatch(fetchHistorySuccess(data));
			})
            .catch((err) => {
                clearTimeout(timeout);
                dispatch(catchErr(err))});
    }
};

const fetchHistorySuccess = (array) => ({
    type: 'FETCH_HISTORY_SUCCESS',
    payload: array
});