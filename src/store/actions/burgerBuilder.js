import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const setIngredients = (value) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        value: value
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        console.log('inside init ingredients')
        axios.get('https://myreacta.firebaseio.com/ingredients.json')
            .then(response => {
                // this.props.onIngredientsSet(response.data);
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
}