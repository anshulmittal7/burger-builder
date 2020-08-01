import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Auxillary/Auxillary'

const INGREDIENTS_PRICES={
    salad: 1,
    cheese: 0.6,
    bacon: 0.5,
    meat: 1.3
}

class BurgerBuilder extends Component{

    // constructor(props){
    //     super(props){
    //         this.state = {...}
    //     }
    // }

    state ={
        ingredients:null,
        totalPrice:4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://myreacta.firebaseio.com/ingredients.json')
            .then(response=>{
                this.setState({ingredients: response.data})
            })
            .catch(error=>{
                console.log('got an error')
                this.setState({error: true})
            })
    }

    addIngredientHandler= type=>{
        const oldCount = this.state.ingredients[type];
        const newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type]=oldCount+1;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_PRICES[type];

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(newIngredients);

    }

    removeIngredientHandler= type=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0 )
            return;
        const newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type]=oldCount-1;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENTS_PRICES[type];

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(newIngredients);
    }

    updatePurchaseState = (ingredients) =>{
        // const ingredients = {
        //     ...this.state.ingredients
        // }

        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey]
            })
            .reduce( (iv, cv)=> iv+=cv ,0)

        this.setState({
            purchasable: sum>0
        })
    }

    purchaseHandler = () =>{
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () =>{
        // this.setState({loading:true});
        const order={
            ingredients: this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Anshul',
                address:{
                    street:'TestStreet1',
                    zip:'1100',
                    country:'Test'
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
        }
        // axios.post('/orders.json', order)
        //         .then(response => {
        //              this.setState({loading:false, purchasing: false});
        //             console.log(response)})
        //         .catch(error=> {
        //             this.setState({loading:false , purchasing:false});
        //             console.log(error)})

        this.props.history.push('/checkout?order='+JSON.stringify(order));
    }

    render(){
        const disabledInfo ={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        // console.log(disabledInfo)

        let orderSummary = null ;

        
        console.log(this.state.ingredients);
        console.log(this.state.error);

        let burger = this.state.error ? <p>Some error occurred</p>: <Spinner/>;

        if(this.state.ingredients)
            {
                burger = <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                            ingredientAdded={this.addIngredientHandler}
                            ingredientremoved={this.removeIngredientHandler}
                            disabled = {disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}/>
                </Aux>;
                orderSummary = <Spinner/>
                if(!this.state.loading){
                    orderSummary = <OrderSummary 
                    ingredient = {this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}>
                </OrderSummary>;
                }
            }

        return(
            <div>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios);