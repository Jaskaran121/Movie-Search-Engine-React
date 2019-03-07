import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  renderNavLink = (label, toWhere) => {
    return (
      <NavLink className="nav-item nav-link" to={toWhere}>
        {label}
      </NavLink>
    );
  };
  render() {
    const {user} = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">React</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {this.renderNavLink("Movies", "/movies")}
            {this.renderNavLink("Customers", "/customers")}
            {this.renderNavLink("Rentals", "/rentals")}
            {!user && <React.Fragment>
            {this.renderNavLink("Login", "/login")}
            {this.renderNavLink("Register", "/register")}
            </React.Fragment>
            }
            {user && <React.Fragment>
            {this.renderNavLink(user.name, "/profile")}
            {this.renderNavLink("Logout", "/logout")}
            </React.Fragment>
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
