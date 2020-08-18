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
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props){
    //         this.state = {...}
    //     }
    // }  

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onIngredientsSet();
        // axios.get('https://myreacta.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.props.onIngredientsSet(response.data);
        //         console.log(response.data)
        //         //this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         console.log('got an error')
        //         this.setState({ error: true })
        //     })
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
        if (this.props.isAuthenticated)
            this.setState({ purchasing: true })
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();

        this.props.history.push('/checkout');
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
        console.log(this.props.error);

        let burger = this.props.error ? <p>Some error occurred</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientsAdded}
                    ingredientRemoved={this.props.onIngredientsRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated} />
            </Aux>;


            orderSummary = <OrderSummary
                ingredient={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />;

        }

        return (
            <div>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ig.ingredients,
        price: state.ig.price,
        error: state.ig.error,
        isAuthenticated: state.auth.token != null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsSet: () => dispatch(actions.initIngredients()),//{ type: 'SET_INGREDIENTS', value: ig }),
        onIngredientsAdded: (igName) => dispatch(actions.addIngredients(igName)),
        onIngredientsRemoved: (igName) => dispatch(actions.removeIngredients(igName)),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));