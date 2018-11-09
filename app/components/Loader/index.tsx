import * as React from 'react';
import { Spinner, Wrapper } from './index.styled';

interface Props {
  children: any,
  isShow: boolean,
}

export default class Loader extends React.PureComponent<Props, {}> {

  render() {
    const { isShow, children } = this.props;
    return (
      <Wrapper>
        {isShow ? (
          <Spinner>
            <i className="fa fa-lg fa-circle-o-notch fa-spin fa-fw" />
          </Spinner>
        ) : (
          children
        )}
      </Wrapper>
    );
  }
}
