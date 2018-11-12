import * as React from "react";
import { PureComponent } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { InputField } from "../form";
import * as validations from "../../helpers/forms/validations";
import cns from "classnames";

@reduxForm({
  form: 'CLASS_FORM'
})
export default class ClassForm extends PureComponent<InjectedFormProps<{}>, {}> {

  render() {
    const { handleSubmit, submitting, error, hide } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        method="post"
        className={cns("sign-in-form", {
          "has-error": error
        })}
      >
        <Field
          name="name"
          className="form-control"
          type="text"
          placeholder="Please enter name..."
          component={InputField}
          validate={[validations.required]}
        />
        {error && <div className="help-block">{error}</div>}
        <div className="row">
          <div className="col-xs-12">
            <input
              value="Cancel"
              type="button"
              onClick={hide}
              className="btn btn-default pull-left"
            />
            <input
              value="Submit"
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
