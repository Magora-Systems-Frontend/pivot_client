import styled from 'styled-components';

export const Main = styled.div`
  height: 100%;
  width: 100%;
`;

export const Wrapper = styled.div.attrs({
  className: 'wrapper',
})``;

export const ContentWrapper = styled.div.attrs({
  className: 'content-wrapper',
})`
  min-height: calc(100% - 50px);
`;
