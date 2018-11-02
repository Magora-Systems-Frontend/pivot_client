import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as autoBind from "react-autobind";
import cns from "classnames";
import * as authActions from "../../helpers/auth/actions";
import { CLIENT_PAGES } from "../../app/constants";
import Header from "./Header/index";
import Home from "../Home/index";
import NotFoundPage from "../NotFoundPage/index";
import { ROUTES } from "./constants";
import { ContentWrapper, Main, Wrapper } from "./index.styled";
import { sget } from "../../helpers/handlers";
import { AUTH_USER_INFO } from "../../helpers/auth/constants";
import { bindActionCreators } from "redux";

interface AppProps {
  isAuthenticated: boolean,
  history: {
    push(path: string)
  },
  location: {
    pathname: string
  },

  logout()
}

interface AppState {
  sidebarOpen: boolean
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    autoBind(this);
  }

  componentWillMount(): void {
    const { isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      history.push(CLIENT_PAGES.LOGIN);
    }
  }

  async handleLogout(): Promise<void> {
    const { logout } = this.props;
    logout();
  }

  handleToggleSidebar(): void {
    const { sidebarOpen } = this.state;
    this.setState({
      sidebarOpen: !sidebarOpen
    });
  }

  getRoutes() {
    return ROUTES.map(route => {
      if (!route.childrenArray) {
        return (
          <Route
            exact
            path={route.path}
            component={route.component}
            key={route.path}
          />
        );
      }

      return (
        <Route
          path={route.path}
          key={route.path}
          component={() => (
            <Switch>
              {route.childrenArray.map(childRoute => (
                <Route
                  exact
                  path={route.path + childRoute.path}
                  component={childRoute.component}
                  key={route.path + childRoute.path}
                />
              ))}
              <Route component={NotFoundPage}/>
            </Switch>
          )}
        />
      );
    });
  }

  render() {
    const { isAuthenticated } = this.props;
    const { sidebarOpen } = this.state;

    if (!isAuthenticated) return null;
    return (
      <Main
        className={cns("skin-blue sidebar-mini", {
          "sidebar-open": sidebarOpen,
          "sidebar-collapse": !sidebarOpen
        })}
      >
        <Wrapper>
          <Header
            toggleSidebar={this.handleToggleSidebar}
            handleLogout={this.handleLogout}
          />
          <ContentWrapper>
            <section className="content">
              <Switch>
                {this.getRoutes()}
                <Route component={Home}/>
              </Switch>
            </section>
          </ContentWrapper>
        </Wrapper>
      </Main>
    );
  }
}

export default connect(({ auth }: any): any => {
    return {
      isAuthenticated: sget(auth, `payload.${AUTH_USER_INFO}.id`) !== undefined
    };
  },
  (dispatch): any => {
    return {
      logout: bindActionCreators(authActions.logout, dispatch)
    };
  }
)(App);

