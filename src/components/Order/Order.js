import React, {Component} from 'react';
import classes from './Order.module.css'

class Order extends Component{
    render(){

        let ingredients = [];
        for(let ig in this.props.ingredients){
            ingredients.push({name:ig, amount:this.props.ingredients[ig]})
        }
        
        let outputIngredients = ingredients.map(ig=>{
            return(
            <span 
            style={{
                display:'inline-block',
                textTransform:'capitalize',
                margin: '0 8px',
                padding:'5px',
                border: '1px solid #ccc'
            }}
            key={ig.name}> {ig.name} ({ig.amount})</span>
            )
        })

        return(
            <div className={classes.Order}>
               <p>Ingredients : {outputIngredients}</p>
                <p>Price: <strong>USD {this.props.price.toFixed(2)}</strong></p>
            </div>
        )
    }
    
}

export default Order