import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, navigate } from '@reach/router';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import * as Cart from '../../libs/gql/cart';
import { FaShoppingBag } from 'react-icons/fa';
import SideDrawer from '../UI/sidedrawer';
import { useQuery } from 'react-apollo';

type AppProps = {
  cartCount: Number;
};
const Container = styled.div`
  width: 100%;
  position: relative;
  background-color: #fff;
  position: fixed;
  transition: all 0.1s;
  z-index: 300;
  height: ${props => (props.spellCheck ? '50vh' : '5rem')};
  box-shadow: ${props => props.spellCheck && '0 1rem 1rem rgba(0,0,0,0.5)'};
  @media only screen and (max-width: 800px) {
    margin-top: 0;
  }
`;
const Logo = styled.div`
  position: absolute;

  top: 1rem;
  left: 1rem;
  font-size: 2rem;
  .span {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;
const Navigation = styled.nav`
  position: absolute;
  top: 1rem;
  right: 4rem;
  font-size: 1.5rem;
  display: inline-block;
  text-transform: uppercase;
  .navigation {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
  }
  .navigation__item {
    margin-left: 1rem;
  }
  .navigation__item--cart {
    position: relative;
  }
  .navigation__item a {
    text-decoration: none;
    color: inherit;
  }
  .navigation__item--link {
    font-size: 2rem;
    color: #000;
    position: absolute;
    top: 0;
    left: 0;
  }
  @media only screen and (max-width: 800px) {
    & {
      visibility: ${props => (props.spellCheck ? 'visible;' : 'hidden;')};
      top: ${props => props.spellCheck && '50%;'};

      left: ${props => props.spellCheck && '50%;'};
      transform: ${props => props.spellCheck && 'translate(-50%, -50%);'};
      width: ${props => props.spellCheck && '100%;'};
    }
    .navigation {
      flex-direction: ${props => props.spellCheck && 'column'};
      justify-items: ${props => props.spellCheck && 'space-evenly'};
      align-items: ${props => props.spellCheck && 'center'};
      display: ${props => props.spellCheck && 'flex'};
    }
    .navigation__item {
      margin-bottom: ${props => props.spellCheck && '3rem'};
    }
  }
`;
const Label = styled.label.attrs(() => ({
  for: 'checkbox'
}))`
  position: relative;
  float: right;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
  &,
  &::after,
  &::before {
    background-color: #000;
    width: 3rem;
    height: 3px;
    display: inline-block;
  }
  &::after,
  &::before {
    content: '';
    position: absolute;
    left: 0;
  }
  &::before {
    top: -1rem;
  }

  &::after {
    top: 1rem;
  }
  ${props =>
    props.spellCheck &&
    css`
      & {
        background-color: transparent;
      }
      &::after,
      &::before {
        top: 0;
      }
      &::after {
        transform: rotate(135deg);
      }
      &::before {
        transform: rotate(-135deg);
      }
    `}
  @media only screen and (max-width: 800px) {
    & {
      margin-top: 2rem;
      opacity: 1;
      visibility: visible;
    }
  }
`;
const Input = styled.input.attrs(() => ({
  type: 'checkbox'
}))`
  display: inline-block;
  width: 0;
`;
const CartCount = styled.figure`
  width: 2rem;
  height: 2rem;
  clip-path: circle(50% at 50% 50%);
  background-color: #fff;
  position: absolute;
  top: -1.5rem;
  right: -3rem;
  color: #000;
  text-align: center;
`;
const CartCountProp = styled.figcaption`
  display: inline-block;
  font-size: 1rem;
`;
const Nav = ({ cartCount }: AppProps) => {
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
  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;
  const [checkedState, setCheckedState] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const [getCart, { data, loading, error }] = useLazyQuery<Cart.getCart, null>(
    GET_CART
  );
  const { data: cacheData } = useQuery(IS_LOGGED_IN);
  console.log(loading);
  console.log(error);
  const closedHandler = () => {
    getCart();
    setIsClosed(!isClosed);
  };
  const logoutHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.removeItem('Auth Token');
    localStorage.removeItem('expsIn');
    localStorage.removeItem('expDate');
    navigate('/');
  };
  return (
    <Container spellCheck={checkedState}>
      <SideDrawer clicked={closedHandler} closed={isClosed} content={data} />
      <Logo>
        <Link className="span" to="/">
          <span className="span">Seduire</span>
        </Link>
      </Logo>
      <Input
        checked={checkedState}
        onChange={() => setCheckedState(!checkedState)}
        id="checkbox"
      />
      <Label spellCheck={checkedState} htmlFor="checkbox" />
      {/*Using spellcheck bc that's the only T or F element and TS throws bc there exists no 'checkedState' prop*/}
      <Navigation spellCheck={checkedState}>
        <ul className="navigation">
          {cacheData.isLoggedIn && (
            <li className="navigation__item">
              <span style={{ cursor: 'pointer' }} onClick={logoutHandler}>
                Logout
              </span>
            </li>
          )}
          <li className="navigation__item">
            <Link to="/auth">
              {cacheData.isLoggedIn
                ? `hi, ${localStorage.getItem('firstName') ?? ''}`
                : 'Log In/Sign Up'}
            </Link>
          </li>
          <li className="navigation__item">
            <div className="navigation__item--cart">
              <CartCount>
                <CartCountProp>{cartCount}</CartCountProp>
              </CartCount>
              <span onClick={closedHandler}>
                <FaShoppingBag className="navigation__item--link" />
              </span>
            </div>
          </li>
        </ul>
      </Navigation>
    </Container>
  );
};
export default Nav;
