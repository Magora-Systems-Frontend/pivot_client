import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const Spinner = styled.div`
  position: absolute;
  border-radius: 50%;
  left: calc(50% - 35px);
  top: 15%;
  max-width: 70px;
  z-index: 100;
`;
