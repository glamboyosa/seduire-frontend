import React, { memo, useEffect } from 'react';
import * as Cart from '../../libs/gql/cart';
import styled from 'styled-components';
import { ApolloError } from 'apollo-boost';
import Spinner from '../UI/spinner';
import Modal from '../UI/Modal';
import { Link } from '@reach/router';
type AppProps = {
  content?: {
    _id: string;
    mediaUrl: string;
    price: number;
    description: string;
    count: number;
    creator: string;
  }[];
  loading: boolean;
  error?: ApolloError;
  incrementHandler: (id: string) => void;
  decrementHandler: (id: string) => void;
  removeItemHandler: (id: string) => void;
  getStripeSecretHandler: () => void;
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
  clip-path: circle(50% at 50% 50%);
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
  flex-direction: column;
  @media only screen and (max-width: 500px) {
    & {
      opacity: 0;
      visibility: hidden;
    }
  }
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
  @media only screen and (max-width: 800px) {
    & {
      font-size: 1rem;
    }
  }
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
const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
  font-family: inherit;
`;
const SlantedButton = styled.button`
  padding: 1rem 3rem;
  color: #000;
  cursor: pointer;
  text-transform: uppercase;
  display: inline-block;
  font-size: 1.5rem;
  font-family: inherit;
  background-color: #fff;
  border: 1px solid #fff;
  position: absolute;
  z-index: 3;
  top: -1rem;
  left: 1.2rem;
  white-space: nowrap;
  transition: all 0.5s;
  &:hover {
    transform: translateY(17rem);
    transform: translateX(-3px);
    top: -0.5rem;
  }
  & > * {
    color: #000;
    text-decoration: none;
    font-size: inherit;
  }
  @media only screen and (max-width: 500px) {
    & {
      font-size: 1rem;
    }
  }
`;
const CentralButton = styled.button`
  padding: 1rem 3rem;
  display: inline-block;
  white-space: nowrap;
  font-size: 1.5rem;
  background-color: #000;
  border: 1px solid #000;
  position: absolute;
  transition: all 0.5s;
  @media only screen and (max-width: 500px) {
    & {
      font-size: 1rem;
    }
  }
`;
const CartComponent = memo(
  ({
    content,
    error,
    loading,
    incrementHandler,
    decrementHandler,
    removeItemHandler,
    getStripeSecretHandler
  }: AppProps) => {
    if (loading && !content) {
      return <Spinner />;
    }
    if (error) {
      return <Modal>{error.message}</Modal>;
    }
    return (
      <Div>
        <Title>Shopping Cart</Title>
        {content?.map(item => {
          return (
            <CartContainer key={item._id}>
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
                <CartItemCountButton onClick={() => decrementHandler(item._id)}>
                  -
                </CartItemCountButton>
                <CartItemCount>{item.count}</CartItemCount>
                <CartItemCountButton onClick={() => incrementHandler(item._id)}>
                  +
                </CartItemCountButton>
              </CartItemCountContainer>
              <CartItemPrice>&#8358;{item.price}</CartItemPrice>
              <CartItemButton onClick={() => removeItemHandler(item._id)} />
            </CartContainer>
          );
        })}
        <div style={{ textAlign: 'center' }}>
          <ButtonContainer onClick={getStripeSecretHandler}>
            <SlantedButton onClick={getStripeSecretHandler}>
              Proceed to checkout
            </SlantedButton>
            <CentralButton onClick={getStripeSecretHandler}>
              Proceed to checkout
            </CentralButton>
          </ButtonContainer>
        </div>
      </Div>
    );
  }
);

export default CartComponent;
