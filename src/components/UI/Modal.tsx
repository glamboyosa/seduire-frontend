import styled from 'styled-components';
import React from 'react';
const ModalComponent = styled.div`
  position: fixed;
  z-index: 500;
  background-color: $color-white;
  width: 70%;
  border: 1px solid $color-grey;
  box-shadow: 0.1rem 0.1rem 0.1rem $color-black;
  padding: 1.6rem;
  left: 15%;
  top: 30%;
  font-size: 2rem;
  box-sizing: border-box;
  transition: all 0.3s ease-out;

  @media (min-width: 800px) {
    & {
      width: 50rem;
      left: calc(50% - 25rem);
    }
  }
`;
interface Props {
  children?: any;
}
const Modal = ({ children }: Props) => (
  <ModalComponent>{children}</ModalComponent>
);
export default Modal;
