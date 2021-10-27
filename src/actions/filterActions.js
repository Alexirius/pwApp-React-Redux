export const handleFilterClear = () => ({
    type: 'FILTER_STRING_CLEARED'
});

export const handleFilterClick = (flag) => ({
    type: 'FILTER_FLAG_CHANGED',
    payload: flag
});

export const inputChanged = (ev) => ({
    type: 'FILTER_STRING_CHANGED',
    payload: ev.target
});
