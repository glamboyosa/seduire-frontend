import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as Products from '../../libs/gql/products';
import * as Cart from '../../libs/gql/cart';
import gql from 'graphql-tag';
import Nav from '../UI/Nav';
import useCartCalculator from '../../libs/hooks/useCartCalculator';
import { useParams } from '@reach/router';
const IndividualProductComponent = () => {
  const ID = useParams();
  const PRODUCTS = gql`
    query {
      getProduct(sex: "${ID.id}"){
        _id
        description
        creator
        price
        size
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
  const ADD_TO_CART = gql`
    mutation($item: String!, $size: String!) {
      addToCart(item: $item, size: $size) {
        _id
        description
      }
    }
  `;
  const { data, loading, error: productError } = useQuery<
    Products.getProduct,
    null
  >(PRODUCTS);
  const { data: cartData, loading: cartLoading, error: cartError } = useQuery<
    Cart.getCart,
    null
  >(GET_CART);
  const { cartCount } = useCartCalculator(cartData?.getCart);
};
export default IndividualProductComponent;
