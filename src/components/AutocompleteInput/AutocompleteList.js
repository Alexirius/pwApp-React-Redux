import React from 'react';

const AutocompleteList = ({itemsList, focusedItem, onItemClick, listRef}) => {
    if (!itemsList.length) return null;
    return (
        <div id='autocomplete-list' ref={listRef}>
            {itemsList.map((item,ind) => {
                const {id, name} = item;
                return (
                    <div className={(ind===focusedItem)? 'listitem focused' : 'listitem'}
                            key={id} onClick={onItemClick}>
                        {name}
                    </div>
                )
            })}
        </div>
    );
}
export default AutocompleteList;