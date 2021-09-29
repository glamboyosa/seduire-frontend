import styled, {keyframes} from 'styled-components';

const rotateKeyframes = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
`;

const Container = styled.div``;



const Loading = styled.div`
  font-size: 3.5rem;
  margin-right: 1.5rem;
  animation: ${rotateKeyframes} 2s linear infinite;
`;


export {Center, Container, Loading};
