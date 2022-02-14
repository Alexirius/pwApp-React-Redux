import React, { useEffect } from 'react';

const AutocompleteList = ({ itemsList, focusedItem, onItemClick, onBackClick }) => {
    useEffect(() => {
        document.body.onclick = onBackClick;
        return () => { document.body.onclick = undefined; }
    }, [onBackClick])
    return (
        <div id='autocomplete-list'>
            {itemsList.map((item, ind) => {
                const { id, name } = item;
                return (
                    <div className={(ind === focusedItem) ? 'listitem focused' : 'listitem'}
                        key={id} onClick={onItemClick}>
                        {name}
                    </div>
                )
            })}
        </div>
    );
}
export default AutocompleteList;