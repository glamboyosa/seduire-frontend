import React from 'react';
import Home from '../pages/index';
import ProductChoice from '../pages/productchoice';
import Auth from '../pages/auth';
import AllProducts from '../pages/products';
import FilteredProducts from '../pages/filteredProducts';
import { Router } from '@reach/router';
const Routes = () => (
  <Router>
    <Home path="/" />
    <ProductChoice path="/productchoice" />
    <Auth path="auth" />
    <AllProducts path="products" />
    <FilteredProducts path="products/:choice" />
  </Router>
);
export default Routes;
