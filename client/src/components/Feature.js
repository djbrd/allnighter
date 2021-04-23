import React, { Component } from "react";
import requireAuth from "../auth/components/requireAuth";

class Feature extends Component {
  render() {
    return <h3>Feature</h3>;
  }
}

export default requireAuth(Feature);
