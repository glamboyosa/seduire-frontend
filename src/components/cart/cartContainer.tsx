import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import * as Cart from '../../libs/gql/cart';
import * as Stripe from '../../libs/gql/stripe';
import { useQuery, useMutation } from '@apollo/react-hooks';
import CartComponent from './cart';
import useTransformCart from '../../libs/hooks/useTransformCart';
import useContext from '../../libs/hooks/useContext';
import { Redirect } from '@reach/router';
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
  let content;
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
  const { setStripeHandler } = useContext();
  const [cart, setCart] = useState<
    {
      _id: string;
      mediaUrl: string;
      price: number;
      description: string;
      count: number;
      creator: string;
    }[]
  >(null!);
  const { priceArray } = useTransformCart(cart);
  const [currency] = useState('NGN');
  const incrementHandler = (id: string, count: number) => {
    console.log('count is', count);
    const newCart = [...cart];
    const index = newCart.findIndex(el => el._id === id);
    // have to mutably update state
    console.log(cart[index].count, cart[index].price);
    console.log(
      newCart[index].count + 1,
      newCart[index].price * (newCart[index].count + 1)
    );
    newCart[index].count = newCart[index].count + 1;
    newCart[index].price = newCart[index].price * newCart[index].count;
    setCart(newCart);
  };
  const decrementHandler = (id: string) => {
    const newCart = [...cart];
    const index = newCart.findIndex(el => el._id === id);
    // have to mutably update state
    newCart[index].count = newCart[index].count - 1;
    newCart[index].price = newCart[index].price * newCart[index].count;
    setCart(newCart);
  };
  const getStripeSecretHandler = () => {
    getStripeSecret({ variables: { amount: priceArray!, currency } });
  };
  useEffect(() => {
    if (cartData) {
      setCart(cartData.getCart);
    }
  }, [cartData]);
  useEffect(() => {
    transactionData &&
      setStripeHandler(
        transactionData.processTransaction.clientSecret,
        transactionData.processTransaction.publishableKey
      );
  }, [transactionData, setStripeHandler]);
  if (transactionData) {
    content = <Redirect to="/checkout" noThrow />;
  }
  return cacheData.isLoggedIn ? (
    <div>
      {content}
      <CartComponent
        getStripeSecretHandler={getStripeSecretHandler}
        incrementHandler={incrementHandler}
        decrementHandler={decrementHandler}
        content={cart}
        loading={loading}
        error={error}
      />
    </div>
  ) : (
    <Redirect to="/auth" noThrow />
  );
};
export default CartContainer;
