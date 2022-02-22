import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsSignedIn, selectIsAdmin } from "../selectors";

const AdminOutlet = () => {
  const isSignedIn = useSelector(selectIsSignedIn);
  const isAdmin = useSelector(selectIsAdmin);

  const location = useLocation();
  if (isSignedIn) {
    if (isAdmin) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  }
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default AdminOutlet;
