import React from 'react';
import classes from './loadingIndicator.module.css';

const loadingIndicator = (props) => (
    <div className={classes.loader}><div></div><div></div><div></div><div></div></div>
);

export default loadingIndicator;