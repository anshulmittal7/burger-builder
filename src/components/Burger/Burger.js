import React from 'react'
import BurgerIngredient from './BurgerIngredients/BurgerIngredient'
import classes from './Burger.module.css';


const burger = props =>{

    let transformedIngredients = Object.keys(props.ingredients).map(
        igKey=>{
            return [...Array(props.ingredients[igKey])].map(
                (_,ind)=>
                    <BurgerIngredient key={igKey+ind} type ={igKey}></BurgerIngredient>
            )
        }
    )
    .reduce(
        (arr, el)=>{
            return arr.concat(el)
        },
        []
    );

    // console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Add ingredients First!!</p>
    }
    

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default burger;