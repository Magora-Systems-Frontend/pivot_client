import * as React from "react";
import { Link } from "react-router-dom";
import { CLIENT_PAGES } from "../../../app/constants";
import { LogoutButton } from "./index.styled";

interface HeaderProps {
  toggleSidebar(),

  handleLogout()
}

export default class Header extends React.Component<HeaderProps, {}> {

  render() {
    const { toggleSidebar, handleLogout } = this.props;
    return (
      <header className="main-header">
        <Link to={CLIENT_PAGES.HOME} className="logo">
          <span className="logo-lg">Class Scheduler</span>
          <span className="logo-mini"><b>P</b></span>
        </Link>
        <nav className="navbar navbar-static-top">
          <button className="sidebar-toggle" type="button" onClick={toggleSidebar}>
            <span className="sr-only">Toggle navigation</span>
          </button>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li>
                <LogoutButton type="button" onClick={handleLogout}>
                  <i className="fa fa-lg fa-sign-out"/>
                </LogoutButton>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
