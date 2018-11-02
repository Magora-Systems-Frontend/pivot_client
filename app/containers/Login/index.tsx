import * as React from "react";
import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as autoBind from "react-autobind";
import LoginForm from "../../components/LoginForm/index";
import * as actions from "../Login/actions";
import { CLIENT_PAGES } from "../../app/constants";
import { writeToLocalState } from "../../helpers/localstorage";
import { AUTH_USER_INFO } from "../../helpers/auth/constants";

interface LoginProps {
  login(values)

  history: {
    push(path: string)
  }
}

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(actions.login, dispatch)
});

class Login extends Component<LoginProps, {}> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  async handleSubmit(values): Promise<void> {
    const { login, history } = this.props;
    const userInfo = await login(values);
    writeToLocalState(AUTH_USER_INFO, userInfo);
    history.push(CLIENT_PAGES.HOME);
  }

  render() {
    return (
      <React.Fragment>
        <p className="login-box-msg">Login In</p>
        <LoginForm onSubmit={this.handleSubmit}/>
      </React.Fragment>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
