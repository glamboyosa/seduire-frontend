import React from 'react';
import * as Products from '../../libs/gql/products';
import styled from 'styled-components';
import Spinner from '../UI/spinner';
import Modal from '../UI/Modal';
import { ApolloError } from 'apollo-boost';
const Div = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem;
`;
const ProductImage = styled.img`
  width: 100%;
`;
const ProductContainer = styled.div`
  font-size: 2rem;
  text-align: center;
`;
const ProductsSizesContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: #e3e3e3;
  display: flex;
  justify-content: space-evenly;
`;
const ProductsSize = styled.span`
  width: 1.5rem;
  font-size: 1rem;
  background-color: #fff;
  padding: 1rem;
`;
const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
  margin-left: -20rem;
  font-family: inherit;
`;
const SlantedButton = styled.button`
  padding: 1rem 3rem;
  color: #000;
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
`;
type AppProps = {
  content?: Products.getProduct;
  loading: boolean;
  error?: ApolloError;
};
const SingleProductComponent = ({ content, loading, error }: AppProps) => {
  if (loading && !content) {
    return <Spinner />;
  }
  if (error) {
    return <Modal>{error.message}</Modal>;
  }

  return (
    <Div>
      <ProductImage src={content?.getProduct.mediaUrl} />
      <ProductContainer>
        <Title>{content?.getProduct.description}</Title>
        <p>by: {content?.getProduct.creator}</p>
        <ProductsSizesContainer>
          {content?.getProduct.size.map(size => (
            <ProductsSize>{size}</ProductsSize>
          ))}
        </ProductsSizesContainer>
        <ButtonContainer>
          <SlantedButton>ADD TO CART</SlantedButton>
          <CentralButton>&nbsp;</CentralButton>
        </ButtonContainer>
      </ProductContainer>
    </Div>
  );
};
export default SingleProductComponent;
