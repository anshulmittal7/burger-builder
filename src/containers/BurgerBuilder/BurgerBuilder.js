import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Auxillary/Auxillary';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'




class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props){
    //         this.state = {...}
    //     }
    // }

    state = {
        // totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://myreacta.firebaseio.com/ingredients.json')
            .then(response => {
                this.props.onIngredientsSet(response.data);
                console.log(response.data)
                //this.setState({ingredients: response.data})
            })
            .catch(error => {
                console.log('got an error')
                this.setState({ error: true })
            })
    }



    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.props.ingredients
        // }

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((iv, cv) => iv += cv, 0)

        // this.setState({
        //     purchasable: sum > 0
        // })
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        // this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Anshul',
                address: {
                    street: 'TestStreet1',
                    zip: '1100',
                    country: 'Test'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        // axios.post('/orders.json', order)
        //         .then(response => {
        //              this.setState({loading:false, purchasing: false});
        //             console.log(response)})
        //         .catch(error=> {
        //             this.setState({loading:false , purchasing:false});
        //             console.log(error)})

        this.props.history.push('/checkout?order=' + JSON.stringify(order));
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // console.log(disabledInfo)

        let orderSummary = null;


        console.log(this.props.ingredients);
        console.log(this.state.error);

        let burger = this.state.error ? <p>Some error occurred</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientsAdded}
                    ingredientRemoved={this.props.onIngredientsRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler} />
            </Aux>;
            orderSummary = <Spinner />
            if (!this.state.loading) {
                orderSummary = <OrderSummary
                    ingredient={this.props.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.price}>
                </OrderSummary>;
            }
        }

        return (
            <div>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ig.ingredients,
        price: state.ig.price
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsSet: (ig) => dispatch({ type: 'SET_INGREDIENTS', value: ig }),
        onIngredientsAdded: (igName) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: igName }),
        onIngredientsRemoved: (igName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName }),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));