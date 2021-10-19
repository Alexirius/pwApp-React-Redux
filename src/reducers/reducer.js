const initialState = {
    email: '',
    password: '',
    username: '',
    passConfirm: '',
    isNewAccount: false,
    token: '',
    error: '',
    balance: 0,
    userId: 0,
    loading: false,   // for showing Spinner if loading lasts longer than 1 sec
    historyArray: [],
    filterString: '',
    filterFlag: 'all',      // possible values: 'all' || 'debit' || 'credit'
    recipient: '',
    amount: '',
    isConfirmNeeded: false,
    message: ''
};

const reducer = (state = initialState, action) => {
    console.log('reducer:',action.type);
    switch (action.type) {
        case 'LOGOUT':
            return initialState;
        case 'NEW_ACCOUNT':
            return {...state,
                isNewAccount: true,
                error: ''
            };
        case 'NOT_NEW_ACCOUNT':
            return {...state,
                isNewAccount: false,
                error: ''
            };
        case 'INPUT_CHANGED':
            const { name, value } = action.payload;
            return {...state,
                [name]: value,
            };
        case 'CATCH_ERROR':
            return {...state,
                error: action.payload.toString(),
                loading: false
            };
        case 'AUTHORIZATION_SUCCESS':
            return {...state,
                token: action.payload,
                error: ''
            };
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
        case 'FILTER_STRING_CLEARED':
            return {...state, 
                filterString: ''};
        case 'FILTER_FLAG_CHANGED':
            return {...state, 
                filterFlag: action.payload};
        case 'AUTOCOMPLETE_ITEM_SELECTED':
            return {...state,
                recipient: action.payload};
        case 'CREATE_TRANSACTION_REQUEST':
            return {...state,
                loading: true,
                error: '',
                message: ''};
        case 'CREATE_TRANSACTION_SUCCESS':
            return {...state,
                balance: action.payload.balance,
                loading: false,
                error: '',
                message: `Success. You sent ${-action.payload.amount} PW to ${action.payload.username}.`
            };
        case 'SHOW_DIALOG':
            return {...state,
                isConfirmNeeded: true,
                error: ''
            };
        case 'REMOVE_DIALOG':
            return {...state,
                isConfirmNeeded: false,
            };
        case 'CLEAR_MESSAGE':
            return {...state,
                message: ''
            };
        default:
            return state;
    };
};
export default reducer;