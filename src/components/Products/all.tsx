import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as Products from '../../libs/gql/products';
import * as Cart from '../../libs/gql/cart';
import gql from 'graphql-tag';
import Nav from '../UI/Nav';
import useCartCalculator from '../../libs/hooks/useCartCalculator';
const All = () => {
  const PRODUCTS = gql`
    query {
      getProducts {
        _id
        description
        creator
        sex
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
      }
    }
  `;
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
      {/* do not forget to pass down data, loading and product error*/}
    </div>
  );
};
export default All;
