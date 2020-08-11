import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Checkout extends Component {



    checkoutContinued = () => {
        this.props.history.replace('checkout/contact-data');
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ingredients) {
            const burgerPurchased = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <React.Fragment>
                    {burgerPurchased}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued}>

                    </CheckoutSummary>
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </React.Fragment>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ig.ingredients,
        price: state.ig.price,
        purchased: state.ord.purchased
    }
}

export default connect(mapStateToProps)(Checkout);