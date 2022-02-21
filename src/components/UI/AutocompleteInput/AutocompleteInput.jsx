/* Reuseable Component for Autocomplete input with keyboard support.
    supported keys: <Up> & <Down> arrows, <Esc>, <Enter>
    Can be used with both controlled & uncontrolled inputs
*/

import React, { useState } from "react";
import PropTypes from 'prop-types';
import AutocompleteList from "./AutocompleteList";
import './AutocompleteInput.css'

let timeout;

const AutocompleteInput = ({ name = 'autocomplete',
    value = undefined,        // if is applied to uncontrolled input
    placeholder = 'autocomplete',
    handleChange = () => { },
    getData,
    getDataArgs = [],
    handleSelect,
    catchError = () => { },
    clearErr = () => { } }) => {

    const [itemsList, setItemsList] = useState([]);
    const [focusedItem, setFocusedItem] = useState(0);

    const onChange = (ev) => {
        handleChange(ev);
        const { value } = ev.target;
        if (value.length) {
            clearTimeout(timeout);
            timeout = setTimeout(() => enableAutocomplete(value), 300);
        } else {
            disableAutocomplete();
        }
    }

    const enableAutocomplete = (string) => {
        getData(...getDataArgs, string)	        // Getting List from server
            .then((res) => {
                clearErr();
                if (res.length) {
                    setItemsList(res);
                } else {
                    disableAutocomplete();
                }
            })
            .catch((err) => { catchError(err) });
    };

    const disableAutocomplete = () => {
        setItemsList([]);
        setFocusedItem(0);
    }

    const onItemClick = (ev) => {		// Click on Autocomplete List Item
        handleSelect(ev.target.innerText);
        disableAutocomplete();
    }

    const onKeyPressed = (ev) => {		// keyboard handler for autocomplete
        const { keyCode } = ev;
        switch (keyCode) {
            case 40:  					    // arrow down
                focusItem(focusedItem + 1);
                break;
            case 38: 			            //arrow up
                focusItem(focusedItem - 1);
                break;
            case 27: 			            // escape
                disableAutocomplete();
                break;
            case 13: 			            // enter
                ev.preventDefault();
                if (itemsList.length) {
                    handleSelect(itemsList[focusedItem].name);
                    disableAutocomplete();
                }
                break;
            default:
        }
    }

    const focusItem = (index) => {	            // in autocomplete list
        if (index > itemsList.length - 1) return focusItem(0);
        if (index < 0) return focusItem(itemsList.length - 1);
        setFocusedItem(index);
    }

    const list = !!itemsList.length &&
        <AutocompleteList
            itemsList={itemsList}
            focusedItem={focusedItem}
            onItemClick={onItemClick}
            onBackClick={disableAutocomplete}
        />;
    return (
        <span className='autocomplete-wrap'>
            <input type="text" name={name} value={value} id="autocomplete-input"
                placeholder={placeholder} autoComplete='off'
                onChange={onChange} onKeyDown={onKeyPressed} />
            {list}
        </span>
    )
};

AutocompleteInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func,         // input value change handler, arg: (event)
    getData: PropTypes.func.isRequired,   // async (...getDataArgs, searchString) => [{id, name}]
    getDataArgs: PropTypes.array,         // args list for getData function
    handleSelect: PropTypes.func.isRequired,  // arg: (selected_string)
    catchError: PropTypes.func,           // error handler, arg: (error)
    clearErr: PropTypes.func              // arg: none
};

export default AutocompleteInput;