import React, { useState } from 'react';
import gql from 'graphql-tag';
import * as Cart from '../../libs/gql/cart';
import { useQuery } from '@apollo/react-hooks';
import CartComponent from './cart';
import Nav from '../UI/Nav';
import useCartCalculator from '../../libs/hooks/useCartCalculator';
const CartContainer = () => {
  const GET_CART = gql`
    query {
      getCart {
        _id
        description
        price
        mediaUrl
        count
        creator
      }
    }
  `;
  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;
  const { data: cartData, loading, error } = useQuery<Cart.getCart, null>(
    GET_CART
  );
  const { data: cacheData } = useQuery(IS_LOGGED_IN);
  const { cartCount } = useCartCalculator(cartData?.getCart);
  console.log(cacheData.isLoggedIn);
  return cacheData.isLoggedIn ? (
    <div>
      <Nav cartCount={cartCount} />
      <CartComponent content={cartData} loading={loading} error={error} />
    </div>
  ) : (
    <div> you aren't logged in</div>
  );
};
export default CartContainer;
