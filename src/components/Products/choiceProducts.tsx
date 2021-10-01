import React, { memo } from "react";
import * as Products from "../../libs/gql/products";
import styled from "styled-components";
import Modal from "../UI/Modal";
import { ApolloError } from "apollo-boost";
import { Link } from "@reach/router";
import { Center, Loading } from "../utils/utils.style";
const Div = styled.div`
  margin-top: 4rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
`;
const Product = styled.div`
  max-width: 35rem;
  padding: 2rem;
  margin-bottom: 6rem;
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
  height: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;
const Image = styled.img`
  width: 70%;
  height: 80%;
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
const ProductsComponent = memo(
  ({ content, loading, error, choice }: AppProps) => {
    if (loading && !content) {
      return (
        <Center>
          <Loading>🚀</Loading>
        </Center>
      );
    }

    if (error) {
      return <Modal>{error.message}</Modal>;
    }
    const renderImages = () => {
      console.log(window.scrollY);
      if (window.scrollY >= 30) {
        const images: NodeListOf<HTMLImageElement> =
          document.querySelectorAll(".images");

        images.forEach(async (image, index) => {
          console.log(image.dataset.src);

          if (image.complete) {
            image.src = image.dataset.src!;
            console.log(`image at ${index} has fully loaded`);
          }
        });
      }
    };
    React.useEffect(() => {
      document.addEventListener("scroll", renderImages);
      return () => document.removeEventListener("scroll", renderImages);
    }, []);
    return (
      <Div>
        {content?.getCategory?.map((el) => (
          <Product key={el._id}>
            <ImageContainer>
              <Image
                src="https://ik.imagekit.io/demo/img/image8.jpeg?tr=w-400,h-300,bl-30,q-50"
                className="images"
                data-src={el.mediaUrl}
              />
              <PriceContainer>
                <Price>{el.price}</Price>
              </PriceContainer>
            </ImageContainer>
            <p
              style={{
                fontSize: "1.5rem",
                display: "block",
                textAlign: "center",
              }}
            >
              {el.description}
            </p>
            <Link className="link" to={`/product/${el._id}`}>
              View Product...
            </Link>
          </Product>
        ))}
      </Div>
    );
  }
);

export default ProductsComponent;
