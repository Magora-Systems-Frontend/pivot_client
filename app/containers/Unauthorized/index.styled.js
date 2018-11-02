import styled from 'styled-components';

export const LoginPage = styled.div.attrs({
  className: 'login-page',
})`
  min-height: 100%;
  height: 1px;
  text-align: center;
  overflow-y: auto;
  &:before {
    display: inline-block;
    vertical-align: middle;
    height: 60%;
    content: '';
  }
`;
export const LoginBox = styled.div.attrs({
  className: 'login-box',
})`
  text-align: left;
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 20px;
`;
