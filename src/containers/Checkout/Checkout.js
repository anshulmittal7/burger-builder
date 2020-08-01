import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

class Checkout extends Component {



    checkoutContinued = () => {
        this.props.history.replace('checkout/contact-data');
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <React.Fragment>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}>

                </CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ig.ingredients,
        price: state.ig.price
    }
}

export default connect(mapStateToProps)(Checkout);