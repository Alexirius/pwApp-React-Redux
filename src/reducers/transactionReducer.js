const initialState = {
    recipient: '',
    amount: '',
    error: '',
    message: '',
    isConfirmNeeded: false
}
const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TRANSACTION_INPUT_CHANGED':
            const { name, value } = action.payload;
            return {...state,
                [name]: value,
            };
        case 'AUTOCOMPLETE_ITEM_SELECTED':
            return {...state,
                recipient: action.payload};
        case 'TRANSACTION_CATCH_ERROR':
            console.log(action.payload);
            return {...state,
                error: action.payload.toString(),
                message: ''
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
        default:
            return state;
    };
}
export default transactionReducer;