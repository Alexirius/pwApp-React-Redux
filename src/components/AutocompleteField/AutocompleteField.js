/* Reuseable Component for Autocomplete field

props:
    name: string;
    value: string;
    placeholder: string;
    handleChange: function - field value change handler, arg: (event);
    getData: async function => promise - gets autocomlete list, args: (any);
    getDataArgs: array - args list for getData function;
    onSelect: function - autocomplete select handler, arg: (selected string);
    catchError: function - error handler, arg: (error: error);
    clearErr: function - clears error, arg: none.
*/
 
import React from "react";
import AutocompleteList from "./AutocompleteList";
import './AutocompleteField.css'

export default class AutocompleteField extends React.Component {

    state = {
		itemsList: [],
		focusedItem: 0,
	}

    onChange = (ev) => {
        const {handleChange} = this.props;
        handleChange(ev);
        const {value} = ev.target;
        if (value.length) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout( 
                this.enableAutocomplete(value), 300)
        } else {
            this.disableAutocomplete();
        }
    }

    enableAutocomplete = (string) => {
		const {catchError, clearErr, getData, getDataArgs} = this.props;

		getData(...getDataArgs, string)	// Getting filtered Users List
			.then((res) => {
				clearErr();
				if (res.length) {
					document.body.addEventListener('click', this.onBodyClick);
					this.setState({itemsList: res});
				} else {
					this.disableAutocomplete();
				}
			})
			.catch((err) => {catchError(err)});
	};

    onBodyClick = (ev) => {		// Click out of Autocomplete List area
		if (!document.getElementById('autocomplete-list').contains(ev.target)) {
			this.disableAutocomplete();
		}
	}

    disableAutocomplete = () => {
		this.setState({itemsList: [], focusedItem: 0});
		document.body.removeEventListener('click', this.onBodyClick);
	}

    onItemClick = (ev) => {		// Click on Autocomplete List Item
        const {onSelect} = this.props;
        onSelect(ev.target.innerText);
		this.disableAutocomplete();
	}

    onKeyPressed = (ev) => {		// keyboard handler for autocomplete
		const {focusedItem, itemsList} = this.state;
		const {keyCode} = ev;
		if(keyCode === 40) { 					// arrow down
			this.focusItem(focusedItem+1);
		} else if(keyCode === 38) { 			//arrow up
			this.focusItem(focusedItem-1);
		} else if(keyCode === 27) { 			// escape
			this.disableAutocomplete();
		} else if(keyCode === 13) { 			// enter
			ev.preventDefault();
			if (itemsList.length) {
                const {onSelect} = this.props;
                onSelect(itemsList[focusedItem].name);
				this.disableAutocomplete();
			}
		}
	}

    focusItem = (index) => {	            // in autocomplete list
		const {itemsList} = this.state;
		if (index > itemsList.length - 1) return this.focusItem(0);
		if (index < 0) return this.focusItem(itemsList.length - 1);
		this.setState({focusedItem: index});
	}

    render () {
        const {name,value,placeholder=''} = this.props;
        const {itemsList, focusedItem} = this.state;
        return (
            <span className='autocomplete-wrap'>
                <input type="text" name={name} value={value} id="autocomplete_field"
                    placeholder={placeholder} autoComplete='off' required
                    onChange = {this.onChange} onKeyDown = {this.onKeyPressed}/>
                <AutocompleteList
                    list={itemsList}
                    focusedItem={focusedItem}
                    onItemClick={this.onItemClick} />
            </span>
        )
    }
}