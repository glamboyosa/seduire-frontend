import React from 'react';
import Home from '../pages/index';
import ProductChoice from '../pages/productchoice';
import Auth from '../pages/auth';
import { Router } from '@reach/router';
const Routes = () => (
  <Router>
    <Home path="/" />
    <ProductChoice path="/productchoice" />
    <Auth path="auth" />
  </Router>
);
export default Routes;
