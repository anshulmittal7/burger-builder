import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        authForm: {

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 6
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignUp: false
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onResetAuthRedirectPath();
        }
    }

    checkValidity = (rules, value) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minlength) {
            isValid = value.length >= rules.minlength && isValid;
        }

        if (rules.maxlength) {
            isValid = value.length <= rules.maxlength && isValid;
        }

        return isValid;
    }


    inputChangedHandler(event, controlName) {

        const authForm = {
            ...this.state.authForm,
        }
        const changedInputControl = {
            ...this.state.authForm[controlName],
            value: event.target.value,
            touched: true,
            valid: this.checkValidity(this.state.authForm[controlName].validation, event.target.value)
        };

        authForm[controlName] = changedInputControl;
        let formIsValid = true;

        for (let inputProperty in authForm) {
            formIsValid = formIsValid && authForm[inputProperty].valid;
        }

        console.log(formIsValid)

        this.setState({
            authForm: authForm,
            formIsValid: formIsValid
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthenticate(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    }

    onSwitchMethodClicked = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }
        let form = (
            <form onSubmit={this.onSubmitHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button disabled={!this.state.formIsValid} btnType="Success">Submit</Button>
                <Button clicked={this.onSwitchMethodClicked}
                    btnType="Danger">Switch to {!this.state.isSignUp ? 'SignUp' : 'SignIn'}</Button>

            </form>
        );

        if (this.props.loading)
            form = <Spinner />;

        let errorMessage = null;
        if (this.props.error)
            errorMessage = 'Error : ' + this.props.error.data.error.message;

        return (
            <div className={classes.Auth}>
                {this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null}
                {form}
                <p>{errorMessage}</p>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        buildingBurger: state.ig.buildingBurger
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticate: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onResetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);