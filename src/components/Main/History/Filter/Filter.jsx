import React from "react";
import { connect } from 'react-redux';
import {inputChanged, handleFilterClear, handleFilterClick} from "../../../../actions/filterActions";
import './Filter.css';

const Filter = ({filterString, inputChanged, filterFlag, handleFilterClick, handleFilterClear})  => {

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
                onClick={(ev) => handleFilterClick(ev.target.name)}
                className={classNames}> {label}
            </button>
        );
    });
    
    return (
        <div className='filter'>
            <span className="input-wrap">
                <input type='text' name="filterString" value={filterString}
                    placeholder='filter' onChange = {(ev) => inputChanged(ev)}
                    title='Type smth to filter by any field, e.g. "11.09.2001" (by Date) or "G.Bush Jr." (by Name)' />
                <button className="clear"
                        onClick={handleFilterClear}>&times;</button>
            </span>
            <span className='btn-group'>
                {buttons}
            </span>
        </div>
    )
}
const mapStateToProps = ({filterState}) => { 
    const {filterString, filterFlag} = filterState;
    return {
        filterString,
        filterFlag
}};
const mapDispatchToProps = {
    inputChanged,
    handleFilterClear,
    handleFilterClick
}
export default  connect(mapStateToProps, mapDispatchToProps) (Filter);