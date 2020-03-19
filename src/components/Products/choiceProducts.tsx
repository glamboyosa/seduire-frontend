import React from 'react';
import * as Products from '../../libs/gql/products';
import styled from 'styled-components';
import Spinner from '../UI/spinner';
import Modal from '../UI/Modal';
import { ApolloError } from 'apollo-boost';
import { Link } from '@reach/router';
const Div = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media only screen and (max-width: 750px) {
    & {
      justify-content: center;
    }
  }
`;
const Product = styled.div`
  max-width: 35rem;
  padding: 2rem;
  position: relative;
  .link {
    font-size: 1.2rem;
    display: block;
    margin: 1rem;
    text-align: center;
    text-decoration: none;
  }
`;
const ImageContainer = styled.figure`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;
const Image = styled.img`
  width: 65%;
  display: inline-block;
  box-shadow: 1rem 3rem 3rem rgba(0, 0, 0, 0.3);
`;
const PriceContainer = styled.figure`
  position: absolute;
  width: 5rem;
  height: 5rem;
  top: 0;
  right: 5rem;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #000;
`;
const Price = styled.figcaption`
  font-size: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
`;
type AppProps = {
  content?: Products.getCategory;
  loading: boolean;
  error?: ApolloError;
  choice: any;
};
const ProductsComponent = ({ content, loading, error, choice }: AppProps) => {
  if (loading && !content) {
    return <Spinner />;
  }
  if (error) {
    return <Modal>{error.message}</Modal>;
  }
  return (
    <Div>
      {content?.getCategory?.map(el => (
        <Product key={el._id}>
          <ImageContainer>
            <Image src={el.mediaUrl} />
            <PriceContainer>
              <Price>{el.price}</Price>
            </PriceContainer>
          </ImageContainer>
          <p
            style={{
              fontSize: '1.5rem',
              display: 'block',
              textAlign: 'center'
            }}
          >
            {el.description}
          </p>
          <Link className="link" to={`/products/${choice}/${el._id}`}>
            View Product...
          </Link>
        </Product>
      ))}
    </Div>
  );
};
export default ProductsComponent;
