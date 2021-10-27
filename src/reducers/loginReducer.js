const initialState = {
    email: '',
    password: '',
    username: '',
    passConfirm: '',
    isNewAccount: false,
    error: ''
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return initialState;
        case 'NEW_ACCOUNT':
            console.log('state',state);
            return {...state,
                isNewAccount: true,
                error: ''
            };
        case 'NOT_NEW_ACCOUNT':
            return {...state,
                isNewAccount: false,
                error: ''
            };
        case 'LOGIN_INPUT_CHANGED':
            const { name, value } = action.payload;
            return {...state,
                [name]: value,
            };
        case 'AUTHORIZATION_SUCCESS':
            return {...state,
                token: action.payload,
                error: ''
            };
        case 'LOGIN_CATCH_ERROR':
            console.log(action.payload);
            return {...state,
                error: action.payload.toString(),
            };
        default:
            return state;
    };
}
export default loginReducer;