/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import Select from 'react-select';
import cns from 'classnames';

export class SelectField extends React.Component {
  static propTypes = {
    ...fieldPropTypes,
    label: PropTypes.any,
    options: PropTypes.array,
  };

  handleChange = ({ value }) => {
    const { input: { onChange } } = this.props;
    onChange(value);
  };

  render() {
    const {
      label,
      input: { onChange, value },
      meta: { touched, error },
      options,
      ...tailProps
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
        <Select
          isSearchable
          isclearable={false}
          onChange={this.handleChange}
          options={options}
          value={options.filter(option => option.value === value)}
          {...tailProps}
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
