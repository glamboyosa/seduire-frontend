import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import * as Cart from '../../libs/gql/cart';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from 'react-apollo';
const Div = styled.div`
  text-align: center;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const ItemComponent = styled.div`
  margin-top: 10rem;
  padding: 1rem 3rem;
  width: 28rem;
  max-width: 35rem;
  height: 30rem;
  box-shadow: 0.5rem 3rem 5rem rgba(0, 0, 0, 0.6);
  transition: all 0.2s;
  position: relative;
  &:hover {
    transform: translateY(-2rem);
  }
`;
const ItemText = styled.p`
  font-size: 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LinkContainer = styled.span`
  position: absolute;
  top: 25rem;
  display: inline-block;
  a {
    text-decoration: none;
    font-size: 1.5rem;
    color: #000;
    text-transform: uppercase;
    transition: all 0.3s;
  }
  a:hover {
    padding: 0.5rem;
    background-color: #00ca56;
  }
`;
const ProductChoice = () => {
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
  const [
    addToCart,
    { loading: cartLoading, data: addToCartData, error }
  ] = useMutation<Cart.addToCart, Cart.addToCartVariables>(ADD_TO_CART);
  const { data: cacheData } = useQuery(IS_LOGGED_IN);
  useEffect(() => {
    localStorage.getItem('id') &&
      localStorage.getItem('size') &&
      cacheData.isLoggedIn &&
      addToCart({
        variables: {
          item: localStorage.getItem('id')!,
          size: localStorage.getItem('size')!
        }
      });
  }, [addToCart, cacheData]);
  return (
    <Div>
      <ItemComponent>
        <ItemText>Shop Men's Clothing</ItemText>
        <LinkContainer>
          <Link to="/products/men">Take me there &rarr;</Link>
        </LinkContainer>
      </ItemComponent>
      <ItemComponent>
        <ItemText>Shop Women's Clothing</ItemText>
        <LinkContainer>
          <Link to="/products/women">Take me there &rarr;</Link>
        </LinkContainer>
      </ItemComponent>
      <ItemComponent>
        <ItemText>Shop All Clothing</ItemText>
        <LinkContainer>
          <Link to="/products">Take me there &rarr;</Link>
        </LinkContainer>
      </ItemComponent>
    </Div>
  );
};

export default ProductChoice;
