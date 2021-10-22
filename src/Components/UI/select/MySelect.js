import React from "react";
import classes from './MySelect.module.css'

function MySelect({options, defaultValue, value, onChange}) {
    return(
        <select className={classes.mySel} value={value} onChange={e => onChange(e.target.value)} >
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
                )}
        </select>
    );
}

export default MySelect;