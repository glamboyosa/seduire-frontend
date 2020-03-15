import React from 'react';
import styled, { css } from 'styled-components';
import emptyCart from '../../resources/images/undraw_online_shopping_ga73.png';
const SideDrawer = styled.div`
  position: fixed;
  width: 25rem;
  height: 100vh;
  right: 0;
  top: 0;
  background-color: #fff;
  z-index: 1000;
  padding: 1rem 3rem;
  ${props =>
    props.spellCheck &&
    css`
      transform: translateX(200rem);
      opacity: 0;
      visibility: hidden;
    `}
`;
const ButtonHandler = styled.div`
  position: absolute;
  top: 0;
  right: 0.5rem;
`;
const Button = styled.label`
  position: relative;
  margin-top: 2rem;
  &,
  &::after,
  &::before {
    width: 3rem;
    height: 3px;
    display: inline-block;
    background-color: #000;
  }
  &::after,
  &::before {
    content: '';
    left: 0;
    top: 0;
    position: absolute;
  }
  & {
    background-color: transparent;
  }
  &::after {
    transform: rotate(135deg);
  }
  &::before {
    transform: rotate(-135deg);
  }
`;
const CartItemContainer = styled.div`
  display: block;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 2rem;
`;
const CartItem = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;
const Price = styled.p`
  font-size: 1.5rem;
`;
const ImageContainer = styled.figure`
  width: 10rem;
  height: 10rem;
  clip-path: circle(50% at 50% 50%);
  position: relative;
  margin-right: 1rem;
`;
const Image = styled.img`
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Empty = styled.span`
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 100%);
`;
type AppProps = {
  closed: boolean;
  clicked: () => void;
  content:
    | {
        mediaUrl: string;
        price: number;
        description: string;
      }[]
    | [];
};
const SideDrawerComponent = ({ closed, clicked, content }: AppProps) => {
  console.log(content);
  return (
    <SideDrawer spellCheck={closed}>
      <ButtonHandler>
        <Button onClick={clicked} />
      </ButtonHandler>
      {content.length !== 0 ? (
        content!.slice(0, 3).map(el => {
          return (
            <CartItemContainer>
              <CartItem>
                <ImageContainer>
                  <Image src={el.mediaUrl} />
                </ImageContainer>
                <Title>{el.description}</Title>
                <Price>&#8358;{el.price}</Price>
              </CartItem>
            </CartItemContainer>
          );
        })
      ) : (
        <img
          alt="empty cart "
          src={emptyCart}
          style={{
            width: '90%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
          }}
        />
      )}
      {content.length !== 0 ? (
        <span>view rest of cart...</span>
      ) : (
        // <Link href="/cart">View rest of cart...</Link>
        <Empty>Cart is empty. Start shopping now.</Empty>
      )}
    </SideDrawer>
  );
};
export default SideDrawerComponent;
