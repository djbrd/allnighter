import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  renderLinks = () =>
    this.props.authenticated ? (
      <>
        <Link to="/signout">Sign out</Link>
        <Link to="feature">Feature</Link>
      </>
    ) : (
      <>
        <Link to="/signup">Sign up</Link>
        <Link to="/signin">Sign in</Link>
      </>
    );

  render() {
    return (
      <div>
        <Link to="/">Redux Auth</Link>
        {this.renderLinks()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(Header);
