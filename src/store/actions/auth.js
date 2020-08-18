import * as actions from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    }
}

const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    console.log('Auth logout action will be returned')
    return {
        type: actions.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(
            () => { dispatch(logout()) },
            expirationTime * 1000
        );
    }
}


export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD06_n0yVgUERctZkMM2BmKij_TP5HHbTs';
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD06_n0yVgUERctZkMM2BmKij_TP5HHbTs';
        }
        axios.post(url,
            authData)
            .then(response => {
                console.log(response.data)
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error.response);
                dispatch(authFail(error.response))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actions.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}