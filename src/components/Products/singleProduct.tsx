import React, { useState, useEffect } from 'react';
import * as Products from '../../libs/gql/products';
import styled from 'styled-components';
import Spinner from '../UI/spinner';
import Modal from '../UI/Modal';
import { ApolloError } from 'apollo-boost';
const Div = styled.div`
  width: 100%;
  display: flex;
  height: 90vh;
  margin-top: 5.5rem;
  @media only screen and (max-width: 800px) {
    & {
      flex-wrap: wrap;
    }
    .img-bg {
      width: 100% !important;
    }
  }
`;
const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem;
`;

const ProductContainer = styled.div`
  font-size: 2rem;
  position: relative;
  text-align: center;
  flex-grow: 1;
  justify-content: center;
`;
const ProductsSizesContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  margin-top: 8rem;
  margin-bottom: 5rem;
  background-color: #e3e3e3;
  display: flex;
  justify-content: space-around;
`;
const ProductsSize = styled.span`
  width: 1.5rem;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;
  padding: 1rem;
  transition: all 0.3s;
  &:active {
    background-color: #00ca56;
  }
  &:not(:active) {
    background-color: #fff;
  }
`;
const ProductsSizeBanner = styled.span`
  display: block;
  margin-top: 5rem;
  background-color: #e3e3e3;
  padding: 2rem;
  width: 100%;
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
  cartHandler: (id: string, size: string, e: React.SyntheticEvent) => void;
};
const SingleProductComponent = ({
  content,
  loading,
  error,
  cartHandler
}: AppProps) => {
  const [size, setSize] = useState<string>(null!);
  const [id, setId] = useState<string>(null!);
  useEffect(() => {
    if (content) {
      setId(content?.getProduct._id);
    }
  }, [content]);
  if (loading && !content) {
    return <Spinner />;
  }
  if (error) {
    return <Modal>{error.message}</Modal>;
  }

  return (
    <Div>
      <div
        className="img-bg"
        style={{
          height: '90vh',
          width: '45%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `linear-gradient(to right bottom,
            rgba(0,0,0,0.4),
            rgba(0,0,0,0.4)),
        url(${content?.getProduct.mediaUrl})`
        }}
      >
        &nbsp;
      </div>

      <ProductContainer>
        <Title>{content?.getProduct.description}</Title>
        <p>by: {content?.getProduct.creator}</p>
        {size && <ProductsSizeBanner>{size}</ProductsSizeBanner>}
        <ProductsSizesContainer>
          {content?.getProduct.size.map(size => (
            <ProductsSize onClick={e => setSize(e.currentTarget.innerText)}>
              {size}
            </ProductsSize>
          ))}
        </ProductsSizesContainer>
        <ButtonContainer>
          <SlantedButton onClick={e => cartHandler(id, size, e)}>
            ADD TO CART
          </SlantedButton>
          <CentralButton>ADD TO CART</CentralButton>
        </ButtonContainer>
      </ProductContainer>
    </Div>
  );
};
export default SingleProductComponent;
