import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Products from '../../libs/gql/products';
import * as Cart from '../../libs/gql/cart';
import gql from 'graphql-tag';
import Nav from '../UI/Nav';
import useCartCalculator from '../../libs/hooks/useCartCalculator';
import { useParams, Redirect } from '@reach/router';
import SingleProduct from './singleProduct';
const IndividualProductComponent = () => {
  const ID = useParams();
  const PRODUCTS = gql`
    query {
      getProduct(productId: "${ID.id}"){
        _id
        description
        creator
        price
        size
        mediaUrl
        count
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
  const ADD_TO_CART = gql`
    mutation($item: String!, $size: String!) {
      addToCart(item: $item, size: $size) {
        _id
        description
      }
    }
  `;
  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;
  let content;
  const { data, loading, error: productError } = useQuery<
    Products.getProduct,
    null
  >(PRODUCTS);
  const { data: cartData, refetch } = useQuery<Cart.getCart, null>(GET_CART);
  const [
    addToCart,
    { loading: cartLoading, data: addToCartData, error }
  ] = useMutation<Cart.addToCart, Cart.addToCartVariables>(ADD_TO_CART);
  const { data: cacheData } = useQuery(IS_LOGGED_IN);
  const [isAuth, setisAuth] = useState(false);

  const addToCartHandler = (
    id: string,
    size: string,
    e: React.SyntheticEvent
  ) => {
    e.preventDefault();
    if (!cacheData.isLoggedIn) {
      localStorage.setItem('size', size);
      localStorage.setItem('id', id);
      setisAuth(true);
    } else {
      addToCart({ variables: { item: id, size } });
    }
  };
  const { cartCount } = useCartCalculator(cartData?.getCart);
  if (addToCartData) {
    refetch();
  }
  if (isAuth) {
    content = <Redirect to="/auth" noThrow />;
  }

  return (
    <div>
      {content}
      <Nav cartCount={cartCount} />;
      <SingleProduct
        cartData={addToCartData}
        loading={loading}
        error={productError}
        content={data}
        cartHandler={addToCartHandler}
      />
    </div>
  );
};
export default IndividualProductComponent;
