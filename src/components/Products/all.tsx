import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as Products from '../../libs/gql/products';
import * as Cart from '../../libs/gql/cart';
import gql from 'graphql-tag';
import Nav from '../UI/Nav';
import useCartCalculator from '../../libs/hooks/useCartCalculator';
import ProductsComponent from './products';
const All = () => {
  const PRODUCTS = gql`
    query {
      getProducts {
        _id
        description
        creator
        price
        mediaUrl
      }
    }
  `;

  const GET_CART = gql`
    query {
      getCart {
        _id
        description
        price
        mediaUrl
        count
      }
    }
  `;
  // move this logic into the checkout component to redirect users
  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;

  const { data: cacheData } = useQuery(IS_LOGGED_IN);
  console.log('is user logged in', cacheData.isLoggedIn);
  const { data, loading, error: productError } = useQuery<
    Products.getProducts,
    null
  >(PRODUCTS);
  const { data: cartData, loading: cartLoading, error: cartError } = useQuery<
    Cart.getCart,
    null
  >(GET_CART);
  const { cartCount } = useCartCalculator(cartData?.getCart);
  return (
    <div>
      <Nav cartCount={cartCount} />;
      <ProductsComponent
        content={data}
        loading={loading}
        error={productError}
      />
    </div>
  );
};
export default All;
