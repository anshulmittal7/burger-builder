import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const INGREDIENTS_PRICES = {
    salad: 1,
    cheese: 0.6,
    bacon: 0.5,
    meat: 1.3
}

const initialState = {
    ingredients: null,
    price: 4,
    error: false,

}


const reducer = (state = initialState, action) => {
    console.log(action)

    switch (action.type) {
        case actionTypes.SET_INGREDIENTS:
            // console.log(action)
            const updatedIngredients = {
                salad: action.value.salad,
                bacon: action.value.bacon,
                cheese: action.value.cheese,
                meat: action.value.meat,
            };
            return updateObject(state, { ingredients: updatedIngredients, error: false, price: 4 });

        case actionTypes.ADD_INGREDIENTS:
            const updatedIng = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 })
            const updatedPrice = state.price + INGREDIENTS_PRICES[action.ingredientName]
            return updateObject(state, { ingredients: updatedIng, price: updatedPrice })

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIn = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 })
            const updatedPr = state.price - INGREDIENTS_PRICES[action.ingredientName]
            return updateObject(state, { ingredients: updatedIn, price: updatedPr })

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true })

        default: return state
    }

    // return state;
}

export default reducer;