const initialState = {
    filterString: '',
    filterFlag: 'all',      // possible values: 'all' || 'debit' || 'credit'
}
const filterReducer = (state = initialState, action) => {
    console.log('reducer:',action.type);
    switch (action.type) {
        case 'FILTER_STRING_CLEARED':
            return {...state, 
                filterString: ''};
        case 'FILTER_FLAG_CHANGED':
            return {...state, 
                filterFlag: action.payload};
        case 'FILTER_STRING_CHANGED':
            const { name, value } = action.payload;
            return {...state,
                [name]: value,
            };
        default:
            return state;
    };
}
export default filterReducer;