import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import {Route} from 'react-router-dom'

class Checkout extends Component{
    state={
        ingredients:{
            salad:1,
            cheese:1,
            meat:1,
            bacon:1
        },
        price: null
    }

    componentDidMount(){
        const searchParams = this.props.location.search;
        console.log(searchParams);
        const query = new URLSearchParams(this.props.location.search);
        console.log(query);
        let ingredients = null;
        for (let param of query.entries()) {
         console.log(param); // yields ['start', '5']
         if(param[0]==='order'){
            this.setState({ingredients:JSON.parse(param[1]).ingredients})
            this.setState({price:JSON.parse(param[1]).price})
         }
        }
    }
    checkoutContinued=()=>{
        this.props.history.replace('checkout/contact-data');
    }

    checkoutCancelled = () =>{
        this.props.history.goBack();
    }

    render(){
        return(
            <React.Fragment>
                <CheckoutSummary 
                    ingredients = {this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}>

                </CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'} 
                    render={(props)=><ContactData {...props} ingredients={this.state.ingredients} price={this.state.price}/>}
                />
            </React.Fragment>
        );
    }
}

export default Checkout;