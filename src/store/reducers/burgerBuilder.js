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
    buildingBurger: false
}

const setIngredients = (state, action) => {
    const updatedIngredients = {
        salad: action.value.salad,
        bacon: action.value.bacon,
        cheese: action.value.cheese,
        meat: action.value.meat,
    };
    return updateObject(state, { ingredients: updatedIngredients, error: false, price: 4, buildingBurger: false });
}

const addIngredients = (state, action) => {
    const updatedIng = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 })
    const updatedPrice = state.price + INGREDIENTS_PRICES[action.ingredientName]
    return updateObject(state, { ingredients: updatedIng, price: updatedPrice, buildingBurger: true })
}

const removeIngredients = (state, action) => {
    const updatedIn = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 })
    const updatedPr = state.price - INGREDIENTS_PRICES[action.ingredientName]
    return updateObject(state, { ingredients: updatedIn, price: updatedPr, buildingBurger: true })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.ADD_INGREDIENTS: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state
    }
}

export default reducer;