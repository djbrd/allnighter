import React, { Component } from "react";

class GoogleAuth extends Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          clientId:
            "613329788394-a27qkojnfohbbdqundmutrvvumpbkr3a.apps.googleusercontent.com",
          scope: "email",
        })
        .then(
          () => {
            this.auth = window.gapi.auth2.getAuthInstance();
            this.setState({ isSignedIn: this.auth.isSignedIn.get() });
            this.auth.isSignedIn.listen(this.onAuthChange);
          },
          (err) => console.log("Failed to init auth2")
        );
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon" />
          Sign in
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
