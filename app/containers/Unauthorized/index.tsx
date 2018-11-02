import * as React from "react";
import { ComponentClass, PureComponent } from "react";
import { connect } from "react-redux";
import { CLIENT_PAGES } from "../../app/constants";
import { sget } from "../../helpers/handlers";
import { AUTH_USER_INFO } from "../../helpers/auth/constants";
import { LoginBox, LoginPage } from "./index.styled";

interface UnauthorizedProps {
  history: {
    push(path: string)
    replace(path: string)
  },
  children: JSX.Element,
  noRedirect?: boolean,
  isAuthenticated?: boolean
}

class Unauthorized extends PureComponent<UnauthorizedProps, {}> {

  componentWillMount() {
    const { isAuthenticated, history, noRedirect } = this.props;
    if (!noRedirect && isAuthenticated) {
      history.replace(CLIENT_PAGES.HOME);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <LoginPage>
        <LoginBox>
          <div className="login-logo">LOGO</div>
          <div className="login-box-body">{children}</div>
        </LoginBox>
      </LoginPage>
    );
  }
}

export default connect(
  ({ auth }: any) => ({
    isAuthenticated: sget(auth, `payload.${AUTH_USER_INFO}.id`) !== undefined
  }),
  null)
(Unauthorized);
