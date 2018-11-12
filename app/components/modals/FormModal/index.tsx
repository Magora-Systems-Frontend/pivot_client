import * as React from "react";

interface FormProps {
  onSubmit: (object) => void,
  hide: () => void,
  initialValues?: object,
}
interface Props {
  hide: () => void,
  options: {
    onSubmit: (object) => void,
    Form: React.ComponentClass<FormProps>,
    initialValues?: object,
  }
}
export default class FormModal extends React.Component<Props, {}> {

  handleSubmit = async (values) => {
    const { options: { onSubmit }, hide } = this.props;
    hide();
    onSubmit(values);
  };

  render() {
    const { hide, options: { Form, initialValues }  } = this.props;
    return (
      <div className="box box-primary">
        <div className="box-body">
          <Form
            onSubmit={this.handleSubmit}
            hide={hide}
            initialValues={initialValues}
          />
        </div>
      </div>
    );
  }
}
