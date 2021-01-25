import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

import {useRouter} from 'next/router';

const navigationItems = (props) => {
    const router = useRouter();

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem click={() => router.push('/')}>Home</NavigationItem>
            <NavigationItem click={() => router.push('/')}>Go Sponsored</NavigationItem>
        </ul>
    );
}

export default navigationItems;