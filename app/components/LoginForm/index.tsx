import * as React from "react";
import { PureComponent } from "react";
import { Field, propTypes, reduxForm } from "redux-form";
import { InputField } from "../form";
import * as validations from "../../helpers/forms/validations";
import cns from "classnames";
import { LOGIN_FORM } from "./constants";

interface LoginFormProps {
  handleSubmit?(),

  onSubmit(values): Promise<any>,

  submitting?: boolean,
  error?: string
}

@reduxForm({
  form: LOGIN_FORM
})
export default class LoginForm extends PureComponent<LoginFormProps, {}> {
  static propTypes = {
    ...propTypes
  };

  render() {
    const { handleSubmit, submitting, error } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        method="post"
        className={cns("sign-in-form", {
          "has-error": error
        })}
      >
        <Field
          name="email"
          className="form-control"
          type="text"
          placeholder="Email"
          component={InputField}
          validate={[validations.required, validations.email]}
        />
        <Field
          name="password"
          type="password"
          className="form-control"
          placeholder="Password"
          validate={[validations.required]}
          component={InputField}
        />
        {error && <div className="help-block">{error}</div>}
        <div className="row">
          <div className="col-xs-12">
            <input
              value="Sign In"
              type="submit"
              disabled={submitting}
              className="btn btn-primary pull-right"
            />
          </div>
        </div>
      </form>
    );
  }
}
