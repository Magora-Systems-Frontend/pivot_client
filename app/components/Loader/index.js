import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Wrapper } from './index.styled';

export default class Loader extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    isShow: PropTypes.bool,
  };

  static defaultProps = {
    isShow: false,
  };

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
