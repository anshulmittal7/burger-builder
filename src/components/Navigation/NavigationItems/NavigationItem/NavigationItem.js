import React from 'react'
import classes from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/* <a href={props.link}  */}
        <NavLink to={props.link}  exact
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);


export default navigationItem;