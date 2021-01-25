import { parse } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import classes from './StatusIndicator.module.css';

const statusIndicator = (props) => {

    const onlineVal = parseInt(props.online);

    const classArr = [classes.StatusIndicator, onlineVal ? classes.Online : classes.Offline];


    return (
        <span className={classArr.join(' ')}>{onlineVal ? "Online" : "Offline"}</span>
    );
};

export default statusIndicator;