import React from "react";
import PropTypes from 'prop-types';
import './Filter.css';

const Filter = ({filterString, onFilterChange, filterFlag, onFilterClick, onFilterClear})  => {

    const filterButtons = [
        { name: 'all', label: 'All' },
        { name: 'debit', label: 'Debit Only' },
        { name: 'credit', label: 'Credit Only' }
    ];

    const buttons = filterButtons.map(({ name, label }) => {
        const isActive = (name === filterFlag);
        const classNames = 'btn' + (isActive ? ' active' : '');
        return (
            <button key={name}
                name={name}
                type="button"
                onClick={(ev) => onFilterClick(ev.target.name)}
                className={classNames}> {label}
            </button>
        );
    });
    
    return (
        <div className='filter'>
            <span className="input-wrap">
                <input type='text' name="filter_string" value={filterString}
                    placeholder='filter' onChange = {(ev) => onFilterChange(ev.target.value)} 
                    title='Type smth to filter by any field, e.g. "9/11/2001" (by Date) or "G.Bush Jr." (by Name)' />
                <button className="clear"
                        onClick={onFilterClear}>&times;</button>
            </span>
            <span className='btn-group'>
                {buttons}
            </span>
        </div>
    );
};

Filter.propTypes = {
    filterString: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    filterFlag: PropTypes.oneOf(['all', 'debit', 'credit']).isRequired,
    onFilterClick: PropTypes.func.isRequired,
    onFilterClear: PropTypes.func.isRequired
}
export default Filter;