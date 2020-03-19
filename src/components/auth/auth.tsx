import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import styled, { css } from 'styled-components';
import gql from 'graphql-tag';
import * as Login from '../../libs/gql/login';
import * as SignIn from '../../libs/gql/user';
import { Redirect } from '@reach/router';
import Modal from '../UI/Modal';
import Spinner from '../UI/spinner';
import useContext from '../../libs/hooks/useContext';
const Div = styled.div`
  text-align: center;
  position: relative;
  width: 90%;
  margin: 0 auto;
`;
const Title = styled.h1`
  display: inline-block;
  font-size: 2.5rem;
  margin-top: 1rem;
  @media only screen and (max-width: 800px) {
    & {
      font-size: 2.5rem;
    }
  }
`;
const Form = styled.form`
  display: block;
  text-align: center;
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-25%, 50%);
`;
const Input = styled.input.attrs(() => ({}))`
  width: 50%;
  display: block;
  font-family: inherit;
  padding: 1rem 2.5rem;
  margin-bottom: 1rem;
  border: none;
  outline: none;
  font-size: 1.5rem;
  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 800px) {
    & {
      font-size: 1.5rem;
    }
  }
`;
const Button = styled.button`
  padding: 1rem 3rem;
  display: inline-block;
  background-color: #00ca56;
  border: 1px solid #00ca56;
  color: #fff;
  display: inline-block;
  font-size: 2rem;
`;

const RedirectLink = styled.span`
  display: block;
  cursor: pointer;
  font-size: 1.5rem;
  color: -webkit-link;
  text-transform: underline;
  text-align: center;
  transform: ${props =>
    props.spellCheck ? ' translateY(25rem)' : ' translateY(40rem)'};
  top: 50%;
  left: 45%;
  position: absolute;
  @media only screen and (max-width: 800px) {
    left: 40%;
    transform: translateY(25rem);
    font-size: 1.5rem;
  }
  @media only screen and (max-width: 800px) {
    ${props =>
      !props.spellCheck &&
      css`
        & {
          transform: translateY(40rem);
        }
      `}
  }
`;
const Auth = () => {
  let content;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authPage, setAuthPage] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const { setTokenHandler } = useContext();
  const LOGIN_DETAILS = gql`
    query($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        expDate
        firstName
        exp
      }
    }
  `;
  const SIGNUP_DETAILS = gql`
    mutation(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      createUser(
        userInput: {
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
        }
      ) {
        _id
        firstName
        lastName
        email
      }
    }
  `;

  const [
    getUserDetails,
    { loading, error, data: loginResponse }
  ] = useLazyQuery<Login.login, Login.login_variables>(LOGIN_DETAILS);
  const [
    signUp,
    { loading: isSigningUp, error: signUpError, data: signUpResponse }
  ] = useMutation<SignIn.user, SignIn.user_variables>(SIGNUP_DETAILS);
  useEffect(() => {
    if (signUpResponse) {
      setIsSignedUp(true);
      setIsSignedIn(false);
      setAuthPage(true);
    }
    if (loginResponse) {
      setTokenHandler(loginResponse.login.token);
      localStorage.setItem('Auth Token', loginResponse.login.token);
      localStorage.setItem('expsIn', loginResponse.login.exp.toString());
      localStorage.setItem('expDate', loginResponse.login.expDate);
      setIsSignedUp(false);
      setIsSignedIn(true);
      setAuthPage(false);
    }
  }, [loginResponse, signUpResponse, setTokenHandler]);
  const authHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    authPage
      ? getUserDetails({ variables: { email, password } })
      : signUp({ variables: { firstName, lastName, email, password } });
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };
  if (loading || isSigningUp) return <Spinner />;
  if (error || signUpError)
    return (
      <Modal>Error: {`${error?.message} or ${signUpError?.message}`}</Modal>
    );
  if (loginResponse) {
    content = <Redirect to="/productchoice" noThrow />;
  }
  return authPage ? (
    <Div>
      {content}
      <Title>
        Welcome back, <div>{localStorage.getItem('firstName') ?? '😊'}</div>
      </Title>
      <Form onSubmit={authHandler}>
        <Input
          type="email"
          name="email"
          defaultValue={email}
          placeholder="Email Address"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          defaultValue={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <Button>&rarr;</Button>
      </Form>
      <RedirectLink
        spellCheck={authPage}
        onClick={() => setAuthPage(!authPage)}
      >
        Don't have an account ? Sign up
      </RedirectLink>
    </Div>
  ) : (
    <Div>
      <Title>Hi there, welcome to Seduire 😊</Title>
      <Form onSubmit={authHandler}>
        <Input
          type="text"
          name="firstName"
          defaultValue={email}
          placeholder="First Name"
          onChange={e => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          name="lastName"
          defaultValue={email}
          placeholder="Last Name"
          onChange={e => setLastName(e.target.value)}
        />
        <Input
          type="email"
          name="email"
          defaultValue={email}
          placeholder="Email Address"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          defaultValue={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button>&rarr;</Button>
      </Form>
      <RedirectLink
        spellCheck={authPage}
        onClick={() => setAuthPage(!authPage)}
      >
        Already have account ? Sign in
      </RedirectLink>
    </Div>
  );
};
export default Auth;
