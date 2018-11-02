import React from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

export class InputField extends React.PureComponent {
  static propTypes = {
    label: PropTypes.any,
  };

  render() {
    const {
      input, label, meta: { touched, error }, ...tailProps
    } = this.props;
    return (
      <div
        className={cns('form-group', {
          'has-error': touched && error,
        })}
      >
        <label>
          {label}
        </label>
        <input
          className="form-control"
          type="text"
          tabIndex={0}
          {...tailProps}
          {...input}
        />
        {
          touched && error
          && (
            <div className="help-block">
              {error}
            </div>
          )
        }
      </div>
    );
  }
}
