import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthForm from "./AuthForm";
import Loading from "../../common/components/Loading";

import { selectIsInitialising, selectIsSignedIn } from "../selectors";

const AuthPage = () => {
  const isInitialising = useSelector(selectIsInitialising);
  const isSignedIn = useSelector(selectIsSignedIn);
  const location = useLocation();

  if (isInitialising) {
    return <Loading />;
  }

  if (isSignedIn) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <AuthForm />;
};

export default AuthPage;
