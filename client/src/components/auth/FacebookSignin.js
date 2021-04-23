import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { signin, signout } from "../../auth/actions";
import { connect } from "react-redux";
import axios from "axios";

const FacebookSignin = ({ signin, history }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSuccess = async (response) => {
    console.log("Login success", response);
    const { accessToken } = response;
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/facebook`, {
        access_token: accessToken,
      });
      const { token } = res.data;
      signin(token);
      history.push("/feature");
    } catch (error) {
      console.log("Error: ", error);
      signout();
    }
  };

  const handleLoginError = (response) => {
    console.log("Error: ", response);
    setIsSubmitting(false);
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      // autoLoad={true}
      fields="name,email"
      callback={handleLoginSuccess}
      onFailure={handleLoginError}
      cssClass="my-facebook-button-class"
      icon="fa-facebook"
      onClick={() => setIsSubmitting(true)}
      isDisabled={isSubmitting}
    />
  );
};

export default connect(null, { signin })(FacebookSignin);
