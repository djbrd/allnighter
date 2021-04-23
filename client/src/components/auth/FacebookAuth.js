// import React, { useEffect } from "react";
// import useScript from "react-script-hook";
// import { useDispatch, useSelector } from "react-redux";
// import { facebookClientInit, facebookSignIn } from "../../auth/actions";

const FacebookAuth = () => {
  // const dispatch = useDispatch();
  // const facebookSignedIn = useSelector((state) => state.auth.facebookSignedIn);
  // const facebookClient = useSelector((state) => state.auth.facebookClient);
  // const facebookId = useSelector((state) => state.auth.facebookId);
  // console.log("facebookSignedIn", facebookSignedIn);
  // const onLoginStatusChange = (response) => {
  //   console.log("Login status change: ", response);
  //   if (response.status === "connected") {
  //     dispatch(facebookSignIn(response.authResponse));
  //   } else {
  //     dispatch(facebookSignIn(false));
  //   }
  // };
  // useEffect(() => {
  //   // Add async callback used by Facebook to window
  //   window.fbAsyncInit = () => {
  //     window.FB.init({
  //       appId: process.env.REACT_APP_FACEBOOK_APP_ID,
  //       cookie: true,
  //       xfbml: true,
  //       version: "v10.0",
  //     });
  //     dispatch(facebookClientInit(window.FB));
  //     console.log("In fbAsyncInit");
  //     window.FB.getLoginStatus((response) => {
  //       onLoginStatusChange(response);
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // const [loading, error] = useScript({
  //   src: "https://connect.facebook.net/en_US/sdk.js",
  // });
  // if (loading) return <h3>Loading</h3>;
  // if (error) return <h3>Failed to load facebook api</h3>;
  // const onSignIn = () => {
  //   facebookClient.login((response) => {
  //     onLoginStatusChange(response);
  //   });
  // };
  // const onSignOut = () => {
  //   facebookClient.api(
  //     `/${facebookId}/permissions`,
  //     "DELETE",
  //     {},
  //     (response) => {
  //       console.log("Response from delete permissions: ", response);
  //       onLoginStatusChange(response);
  //     }
  //   );
  //   // facebookClient.logout((response) => {
  //   //   console.log("Response from logout: ", response);
  //   //   onLoginStatusChange(response);
  //   // });
  // };
  // return facebookSignedIn ? (
  //   <button onClick={onSignOut}>Log out</button>
  // ) : (
  //   <button onClick={onSignIn}>Log in </button>
  // );
};

export default FacebookAuth;
