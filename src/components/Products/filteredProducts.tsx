import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as Products from '../../libs/gql/products';
import * as Cart from '../../libs/gql/cart';
import gql from 'graphql-tag';
import Nav from '../UI/Nav';
import useCartCalculator from '../../libs/hooks/useCartCalculator';
import ProductsComponent from './choiceProducts';
import { useParams } from '@reach/router';
const All = () => {
  const sex = useParams();
  console.log('param is', sex);
  sex.choice === 'men' ? (sex.choice = 'Male') : (sex.choice = 'Female');
  console.log(sex.choice);
  const PRODUCTS = gql`
    query {
      getCategory(sex: "${sex.choice}"){
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
      }
    }
  `;

  const { data, loading, error: productError } = useQuery<
    Products.getCategory,
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
