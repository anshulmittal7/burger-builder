import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class Orders extends Component{

    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
                .then(response => {
                    let fetchedOrders=[];
                    // console.log(response.data);
                    for(let key in response.data){
                        fetchedOrders.push({
                            ...response.data[key],
                            id: key
                        })
                    }
                    // console.log(fetchedOrders)
                    this.setState({loading:false, orders:fetchedOrders});
                })
                .catch(error=> {
                    this.setState({loading:false});
                    console.log(error)})
    }
    render(){
        // let myorders = null;
        // if(!this.state.loading){
        //     myorders=[]
        //     for( let order of this.state.orders){
        //         myorders.push(
        //             <Order ingredients={order.ingredients} price={order.price} key={order.id}/>
        //         )
        //     }
        // }
        return(
            <div>
                {this.state.orders.map(order=>(
                     <Order ingredients={order.ingredients} price={+order.price} key={order.id}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);