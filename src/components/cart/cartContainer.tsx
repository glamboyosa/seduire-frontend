import React, { useState } from 'react';
import gql from 'graphql-tag';
import * as Cart from '../../libs/gql/cart';
import * as Stripe from '../../libs/gql/stripe';
import { useQuery, useMutation } from '@apollo/react-hooks';
import CartComponent from './cart';
import Nav from '../UI/Nav';
import useCartCalculator from '../../libs/hooks/useCartCalculator';
import useTransformCart from '../../libs/hooks/useTransformCart';
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
  const PROCESS_TRX = gql`
    mutation($amount: [Float!]!, $currency: String!) {
      processTransaction(amount: $amount, currency: $currency) {
        publishableKey
        clientSecret
      }
    }
  `;

  const { data: cartData, loading, error } = useQuery<Cart.getCart, null>(
    GET_CART
  );
  const { data: cacheData } = useQuery(IS_LOGGED_IN);
  const [
    getStripeSecret,
    {
      data: transactionData,
      loading: transactionLoading,
      error: transactionError
    }
  ] = useMutation<Stripe.StripeTrx_Trx, Stripe.StripeTrxVariables>(PROCESS_TRX);
  const [newUserCart, setNewUserCart] = useState<
    { mediaUrl: string; price: number; description: string; count: number }[]
  >();
  const { priceArray } = useTransformCart(newUserCart);
  const { cartCount } = useCartCalculator(cartData?.getCart);
  const [cart, setCart] = useState<Cart.getCart>(null!);
  const [currency] = useState('NGN');
  const incrementHandler = (id: string) => {
    const newCart = [...cart.getCart];
    const index = newCart.findIndex(el => el._id === id);
    // have to mutably update state
    cart.getCart[index].count = cart.getCart[index].count + 1;
    newCart[index].count = newCart[index].count + 1;
    newCart[index].price = newCart[index].price * newCart[index].count;
    setNewUserCart(newCart);
  };
  const decrementHandler = (id: string) => {
    const newCart = [...cart.getCart];
    const index = newCart.findIndex(el => el._id === id);
    // have to mutably update state
    cart.getCart[index].count = cart.getCart[index].count - 1;
    newCart[index].count = newCart[index].count + 1;
    newCart[index].price = newCart[index].price * newCart[index].count;
    setNewUserCart(newCart);
  };
  if (!loading && cartData) {
    setCart(cartData);
  }
  console.log('user is authenticated in cartContainer?', cacheData.isLoggedIn);
  return cacheData.isLoggedIn ? (
    <div>
      <Nav cartCount={cartCount} />
      <CartComponent
        incrementHandler={incrementHandler}
        decrementHandler={decrementHandler}
        content={cart}
        loading={loading}
        error={error}
      />
    </div>
  ) : (
    <div> you aren't logged in</div>
  );
};
export default CartContainer;
