import React, { Suspense, lazy } from 'react';
import Home from '../pages/index';
import ProductChoice from '../pages/productchoice';
import Auth from '../pages/auth';
import AllProducts from '../pages/products';
import FilteredProducts from '../pages/filteredProducts';
import IndividualProduct from '../pages/individualProducts';
import Success from '../pages/success';
import { Router } from '@reach/router';
import Spinner from '../components/UI/spinner';
const Routes = () => {
  const Cart = lazy(() => import('../pages/cart'));
  const Checkout = lazy(() => import('../pages/checkout'));
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Home path="/" />
        <ProductChoice path="/product-choice" />
        <Auth path="auth" />
        <AllProducts path="products" />
        <IndividualProduct path="product/:id" />
        <FilteredProducts path="products/:choice" />
        <Cart path="cart" />
        <Checkout path="checkout" />
        <Success path="success" />
      </Router>
    </Suspense>
  );
};
export default Routes;
