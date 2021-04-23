import React, { Component } from "react";
import { connect } from "react-redux";
import { selectIsSignedIn } from "../selectors";

const requireAuth = (ChildComponent) => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    // Return to index if not authorised
    shouldNavigateAway() {
      if (!this.props.auth) {
        console.log("pushing back");
        this.props.history.push("/");
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { auth: selectIsSignedIn(state) };
  }
  return connect(mapStateToProps)(ComposedComponent);
};

export default requireAuth;
