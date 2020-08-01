import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary'
import classses from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    sideDrawerClosed=() =>{
         this.setState({showSideDrawer: false});
    }

    sideDrawerToggler = () =>{
        this.setState((prevState)=> {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    render(){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosed}/>
                <main className= {classses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;

