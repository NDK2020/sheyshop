import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import {BrowserRouter, Route, Router} from "react-router-dom"
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import OrderInfoPage from './pages/OrderInfoPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Route path='/' component={Home} exact/>
        <Route path='/product/:id' component={ProductPage} />
        <Route path='/cart' component={CartPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/orders' component={OrderPage} />
        <Route path='/orderinfo/:orderid' component={OrderInfoPage} />
        <Route path='/profile' component={ProfilePage}/>
        <Route path='/admin' component={AdminPage}/>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
