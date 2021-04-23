import React from "react";
import { GoogleLogout } from "react-google-login";
import { signout } from "../../actions";
import { connect } from "react-redux";

const GoogleSignout = () => {
  const handleLogoutSuccess = () => {
    this.props.signout();
    this.props.history.push("/");
  };

  const handleLogoutError = (response) => {
    console.log("Error: ", response);
  };

  return (
    <GoogleLogout
      clientId="613329788394-a27qkojnfohbbdqundmutrvvumpbkr3a.apps.googleusercontent.com"
      onLogoutSuccess={handleLogoutSuccess}
      onFailure={handleLogoutError}
      buttonText="Sign out of google"
    />
  );
}

export default connect(null, { signout })(GoogleSignout);