import React from 'react';
import styled from 'styled-components';
import CardSection from './cardSection';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { navigate } from '@reach/router';
import useContext from '../../libs/hooks/useContext';
import Modal from '../UI/Modal';
import Spinner from '../UI/spinner';
const Div = styled.div`
  background-image: linear-gradient(
    to right bottom,
    rgba(226, 88, 34, 0.9),
    rgba(226, 88, 34, 0.7)
  );
  position: relative;
  width: 100%;
  height: 100vh;
`;
const Label = styled.label`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;
const Form = styled.form`
  width: 70%;
  display: inline-block;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
  font-family: inherit;
  margin-top: 2rem;
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
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { stripeClientSecret, setStripeHandler } = useContext();
  setStripeHandler(
    localStorage.getItem('stripePublishable')!,
    localStorage.getItem('stripeClient')!
  );
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const result = await stripe!.confirmCardPayment(stripeClientSecret!, {
      payment_method: {
        card: elements!.getElement(CardElement)!,
        billing_details: {
          name: 'John Doe' ?? localStorage.getItem('fullName')
        }
      }
    });
    if (!result) {
      return <Spinner />;
    }
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      return <Modal>result.error.message</Modal>;
    } else {
      // The payment has been processed!
      if (result.paymentIntent?.status === 'succeeded') {
        // Show a success message to your customer
        navigate('/success');
      }
    }
  };
  return (
    <Div>
      <Form onSubmit={submitHandler}>
        <Label>Input card details</Label>
        <CardSection />
        <ButtonContainer>
          <SlantedButton disabled={!stripe}>complete purchase</SlantedButton>
          <CentralButton>complete purchase</CentralButton>
        </ButtonContainer>
      </Form>
    </Div>
  );
};

export default CheckoutForm;
