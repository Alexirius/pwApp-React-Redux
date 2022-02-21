import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { filterStringChanged, handleFilterClear, handleFilterClick } from "../../../../actions/filterActions";
import './Filter.css';

const Filter = () => {
    console.log('Filter');

    const dispatch = useDispatch();
    const filterFlag = useSelector(state => state.filter.filterFlag);
    const filterString = useSelector(state => state.filter.filterString);

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
                onClick={(ev) => dispatch(handleFilterClick(ev.target.name))}
                className={classNames}> {label}
            </button>
        );
    });

    const onFilterClear = () => dispatch(handleFilterClear());

    return (
        <div className='filter'>
            <span className="input-wrap">
                <input type='text' name="filterString" value={filterString}
                    placeholder='filter' onChange={(ev) => dispatch(filterStringChanged(ev.target))}
                    title='Type smth to filter by any field, e.g. "11.09.2001" (by Date) or "G.Bush Jr." (by Name)' />
                <button className="clear"
                    onClick={onFilterClear}>&times;</button>
            </span>
            <span className='btn-group'>
                {buttons}
            </span>
        </div>
    )
}

export default Filter;