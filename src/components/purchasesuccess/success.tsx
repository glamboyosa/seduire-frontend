import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from '@reach/router';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
const Div = styled.div`
  text-align: center;
`;
const Text = styled.p`
  font-size: 2rem;
`;
export default () => {
  let content;
  const [time, setTime] = useState(false);
  setTimeout(() => setTime(true), 3000);
  if (time) {
    content = <Redirect to="/" noThrow />;
  }
  return (
    <Div>
      {content}
      <IoIosCheckmarkCircleOutline
        style={{ fontSize: '15rem', color: 'green' }}
      />
      <Text>
        Thank you for choosing Seduire{' '}
        <span role="img" aria-label="smiley emoji">
          😊
        </span>
      </Text>
    </Div>
  );
};
