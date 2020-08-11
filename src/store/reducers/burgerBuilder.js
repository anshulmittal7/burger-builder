import * as actionTypes from '../actions/actionTypes';

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
            console.log(action)
            return {
                ...state,
                ingredients: {
                    salad: action.value.salad,
                    bacon: action.value.bacon,
                    cheese: action.value.cheese,
                    meat: action.value.meat,
                },
                error: false,
                price: 4
            }

        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENTS_PRICES[action.ingredientName]

            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENTS_PRICES[action.ingredientName]
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default: return state
    }

    // return state;
}

export default reducer;