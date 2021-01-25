import React from 'react';

import classes from './Button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const button = (props) => (
    <button 
        disabled={props.disabled}
        className={[classes.Button, classes[props.type]].join(' ')}
        onClick={props.clicked}>
        
        {props.icon && <FontAwesomeIcon className={classes.Icon} icon={props.icon}/>}


        {props.children && <span>{props.children}</span>}
    </button>
)

export default button;