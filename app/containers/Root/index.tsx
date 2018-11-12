/**
 *
 * Root/index
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import * as React from "react";
import { Route, Switch } from "react-router-dom";
import App from "../App";
import Login from "../Login/index";
import Unauthorized from "../Unauthorized/index";
import { CLIENT_PAGES } from "../../app/constants";
import { Wrapper } from "./index.styled";
import Modal from "../Modal/index";

export default class Root extends React.Component<{}, {}> {
  render() {
    return (
      <Wrapper>
        <Switch>
          <Route
            path={CLIENT_PAGES.LOGIN}
            exact
            component={props => (
              <Unauthorized history={props.history}>
                <Login {...props} />
              </Unauthorized>
            )}
          />
          <Route path={CLIENT_PAGES.HOME} component={App}/>
        </Switch>
        <Modal />
      </Wrapper>
    );
  }
}
