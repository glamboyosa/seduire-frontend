import React from 'react';
import * as Cart from '../../libs/gql/cart';
import styled from 'styled-components';
import { ApolloError } from 'apollo-boost';
type AppProps = {
  content: Cart.getCart;
  loading: boolean;
  error: ApolloError;
};
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`;
const CartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CartItemImageContainer = styled.figure`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  position: relative;
`;
const CartItemImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
`;
const CartItemDescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* probably gonna replace you with flex-direction*/
`;
const CartItemDescriptionBig = styled.span`
  font-size: 2rem;
  font-weight: 400;
`;
const CartItemDescriptionSmall = styled.span`
  font-size: 1.5rem;
  font-weight: 200;
  color: #e3e3e3;
`;
const CartItemCountContainer = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
`;
const CartItemCountButton = styled.span`
  font-weight: 500;
`;
const CartItemCount = styled.span`
  border: 1px solid #000;
  font-weight: 600;
`;
const CartItemPrice = styled.div`
  &::before {
    position: absolute;
    top: -1rem;
    left: 0;
    content: '&#8358;';
  }
`;

const CartComponent = () => {};
export default CartComponent;
