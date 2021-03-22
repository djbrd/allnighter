import React, { Component } from "react";
import requireAuth from "./auth/requireAuth";

class Feature extends Component {
  render() {
    return <h3>Feature</h3>;
  }
}

export default requireAuth(Feature);
