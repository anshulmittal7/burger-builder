import React from 'react'
import Logo from '.././../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary'

const sideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses[1] = classes.Open;
    }

    return (
        <Aux>
            <Backdrop show={props.open}
                clicked={props.closed} />
            <div className={attachedClasses.join(' ')} >
                <Logo height="11%" className={classes.Logo} />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer   