import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import {Route,BrowserRouter} from 'react-router-dom';
import Orders from './containers/Orders/Orders'


function App() {
  return (
    <BrowserRouter>
    <div>
      <Layout>
        {/* <BurgerBuilder/>
        <Checkout/> */}
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/checkout'  component={Checkout}/>
        <Route path='/orders' component={Orders}/>
      </Layout>
    </div>
    </BrowserRouter>
  );
}

export default App;
