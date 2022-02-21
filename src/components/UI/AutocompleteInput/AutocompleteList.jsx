import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

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
};

AutocompleteList.propTypes = {
    itemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    focusedItem: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
};
export default AutocompleteList;