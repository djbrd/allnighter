import React from "react";
import { Link } from "react-router-dom";
import AuthLink from "../auth/components/AuthLink";

const Header = () => {
  return (
    <div>
      <Link to="/">Redux Auth</Link>
      <AuthLink />
    </div>
  );
};

export default Header;
