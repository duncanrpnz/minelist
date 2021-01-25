import React from 'react';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li onClick={() => props.click()} className={classes.NavigationItem}>
        <a>{props.children}</a>
    </li>
);

export default navigationItem;