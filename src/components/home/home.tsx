import bg2 from "../../resources/images/bg2.jpg";
import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
const Div = styled.div`
  text-align: center;
  height: 100vh;
  background-image: url("${bg2}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const CenterOfThePage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.h1`
  font-size: 4.5rem;
  display: block;
  color: #000;
  margin-bottom: 2rem;
`;
const SecondaryTitle = styled.span`
  font-size: 3.5rem;
  display: block;
  margin-top: 1rem;
  color: #000;
`;
const ButtonContainer = styled.div`
  position: relative;
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
const Home = () => (
  <Div>
    <CenterOfThePage>
      <Title>
        Seduire
        <SecondaryTitle>Amazing pieces handpicked just for you.</SecondaryTitle>
      </Title>
      <ButtonContainer>
        <SlantedButton>
          {/*REMEMBER TO PUT A REACH LINK HERE*/}
          <Link to="/product-choice">Take me there</Link>
        </SlantedButton>
        <CentralButton>Go Shopping</CentralButton>
      </ButtonContainer>
    </CenterOfThePage>
  </Div>
);

export default Home;
