import React from 'react';
import * as Cart from '../../libs/gql/cart';
import styled from 'styled-components';
import { ApolloError } from 'apollo-boost';
import Spinner from '../UI/spinner';
import Modal from '../UI/Modal';
type AppProps = {
  content?: Cart.getCart;
  loading: boolean;
  error?: ApolloError;
};
const Div = styled.div`
  padding-top: 7rem;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`;
const CartContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`;
const CartItemImageContainer = styled.figure`
  width: 7rem;
  height: 7rem;
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
  position: absolute;
  top: 0;
  left: 5rem;
  flex-direction: column; /* probably gonna replace you with flex-direction*/
`;
const CartItemDescriptionBig = styled.span`
  font-size: 1rem;
  text-align: center;
`;
const CartItemDescriptionSmall = styled.span`
  font-size: 1rem;
  text-align: center;
  color: rgba(0, 0, 0, 1);
`;
const CartItemCountContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const CartItemCountButton = styled.span`
  font-size: 3rem;
  cursor: pointer;
`;
const CartItemCount = styled.span`
  border: 1px solid #000;
  height: 1rem;
  padding: 1rem;
`;
const CartItemPrice = styled.div`
  position: relative;
  font-size: 2rem;
`;
const CartItemButton = styled.label`
  position: relative;
  &,
  &::after,
  &::before {
    height: 3px;
    display: inline-block;
    width: 3rem;
  }
  & {
    background-color: transparent;
  }
  &::after,
  &::before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    background-color: #000;
  }
  &::after {
    transform: rotate(135deg);
  }
  &::before {
    transform: rotate(-135deg);
  }
`;
const CartComponent = ({ content, error, loading }: AppProps) => {
  if (loading && !content) {
    return <Spinner />;
  }
  if (error) {
    return <Modal>{error.message}</Modal>;
  }
  return (
    <Div>
      <Title>Shopping Cart</Title>
      {content?.getCart.map(item => {
        return (
          <CartContainer>
            <CartItemImageContainer>
              <CartItemImage src={item.mediaUrl} />
            </CartItemImageContainer>
            <CartItemDescriptionContainer>
              <CartItemDescriptionBig>
                {item.description}
              </CartItemDescriptionBig>
              <CartItemDescriptionSmall>
                by {item.creator}
              </CartItemDescriptionSmall>
            </CartItemDescriptionContainer>
            <CartItemCountContainer>
              <CartItemCountButton>-</CartItemCountButton>
              <CartItemCount>{item.count}</CartItemCount>
              <CartItemCountButton>+</CartItemCountButton>
            </CartItemCountContainer>
            <CartItemPrice>&#8358;{item.price}</CartItemPrice>
            <CartItemButton />
          </CartContainer>
        );
      })}
    </Div>
  );
};
export default CartComponent;
