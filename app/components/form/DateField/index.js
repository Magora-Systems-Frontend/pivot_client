/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import cns from 'classnames';

export class DateField extends React.Component {
  static propTypes = {
    ...fieldPropTypes,
    label: PropTypes.any,
    options: PropTypes.array,
  };

  handleChange = (date) => {
    const { input: { onChange } } = this.props;
    onChange(date ? date.unix() : null);
  };

  render() {
    const {
      label,
      input: { onChange, value },
      meta: { touched, error },
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
        <DatePicker
          isClearable
          className="form-control"
          selected={value ? moment.unix(value) : null}
          onChange={this.handleChange}
          dateFormat="DD MMM YYYY"
          placeholderText="select"
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
