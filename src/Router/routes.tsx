import React from 'react';
import Home from '../pages/index';
import ProductChoice from '../pages/productchoice';
import Auth from '../pages/auth';
import AllProducts from '../pages/products';
import FilteredProducts from '../pages/filteredProducts';
import IndividualProduct from '../pages/individualProducts';
import Cart from '../pages/cart';
import { Router } from '@reach/router';
const Routes = () => (
  <Router>
    <Home path="/" />
    <ProductChoice path="/productchoice" />
    <Auth path="auth" />
    <AllProducts path="products" />
    <IndividualProduct path="product/:id" />
    <FilteredProducts path="products/:choice" />
    <Cart path="cart" />
  </Router>
);
export default Routes;
