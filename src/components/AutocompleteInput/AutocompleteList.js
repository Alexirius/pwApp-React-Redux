import React from 'react';

const AutocompleteList = ({list, focusedItem, onItemClick}) => {
    if (!list.length) return null;
    return (
        <div id='autocomplete-list'>
            {list.map((item,ind) => {
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