import React, { Component } from 'react'
import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {


    componentDidUpdate(){
        console.log('[Order Summmary] updated');
    }

    render(){

        let ingredientSummary = null;
    
        ingredientSummary = Object.keys(this.props.ingredient).map(
            igKey=>{
                return(
                    <li key={igKey}>
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>:
                        {this.props.ingredient[igKey]}
                    </li>
                )
            }
        )
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A deliciour burger with following ingredients:</p>
                <ul> 
                    {ingredientSummary}
                </ul>
                <strong>Total Price : {this.props.price.toFixed(2)}</strong>
                <p>Place Order? </p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary