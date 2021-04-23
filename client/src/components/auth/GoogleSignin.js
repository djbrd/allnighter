// import React, { useState } from "react";
// import { GoogleLogin } from "react-google-login";
// import { signin } from "../../auth/actions";
// import { connect } from "react-redux";
// import axios from "axios";

// const GoogleSignin = ({ signin, history }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleLoginSuccess = async (data) => {
//     console.log(data);
//     const { tokenId } = data;
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, {
//       tokenId,
//     });
//     const { token } = res.data;
//     signin(token);
//     history.push("/feature");
//   };

//   const handleLoginError = (response) => {
//     console.log("Error: ", response);
//     setIsSubmitting(false);
//   };

//   return (
//     <GoogleLogin
//       clientId="613329788394-a27qkojnfohbbdqundmutrvvumpbkr3a.apps.googleusercontent.com"
//       buttonText="Log in with Google"
//       onSuccess={handleLoginSuccess}
//       onFailure={handleLoginError}
//       cookiePolicy="none"
//       responseType="token"
//       onRequest={() => setIsSubmitting(true)}
//       disabled={isSubmitting}
//     />
//   );
// };

// export default connect(null, { signin })(GoogleSignin);
