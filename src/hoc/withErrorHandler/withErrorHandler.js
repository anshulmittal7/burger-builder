 import React, { Component } from'react'
import Aux from '../Auxillary/Auxillary'
import Modal from '../../components/UI/Modal/Modal'


const withErrorHandler = (WrappedComponent, axios)=>{
    return (
        class extends Component{
            state={
                error:null
            }

            //constructor(props){
                //super(props);
            componentWillMount(){
                this.reqInterceptor = axios.interceptors.request.use(req=>req, error=>this.setState({error:error}));
                this.resInterceptor = axios.interceptors.response.use(res=>res, error=>{
                    console.log(error)
                    this.setState({error:error})});

            }

            componentWillUnmount(){
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);

            }

            errorConfirmedHandler = () =>{
                this.setState({error:null})
            }

            render(){
                return(
                    <Aux>
                        <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                            {this.state.error? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props}/>
                    </Aux>
                )
            }
        }
    )
}

export default withErrorHandler;