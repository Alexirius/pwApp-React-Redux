const initialState = {
    username: '',
    userId: 0,
    balance: 0,
    loading: true,
    historyArray: [],
    error: ''
}
const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_INFO_SUCCESS':
            const {username, id, balance} = action.payload;
            return {...state,
                balance,
                username,
                userId: id,
                error: ''
            };
        case 'FETCH_HISTORY_REQUEST':
            return {...state,
                loading: true,
                historyArray: [],
                error: ''
            };
        case 'FETCH_HISTORY_SUCCESS':
            return {...state,
                loading: false,
                historyArray: action.payload,
                error: ''
            };
        case 'UPDATE_BALANCE':
            console.log();
            return {...state,
                balance: action.payload
            }
        default:
            return state;
    };
}
export default mainReducer;