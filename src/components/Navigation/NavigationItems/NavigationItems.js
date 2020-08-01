import classes from './NavigationItems.module.css'
import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
// import classes from './NavigationItems.module.css'

const navigationItems = (props)=>(
    <div className={classes.NavigationItems}>
        <NavigationItem link='/' >Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
    </div>
)

export default navigationItems;