import React, { Component } from "react";
import { Formik, Form } from "formik";
import TextInput from "../inputs/textInput";
import * as Yup from "yup";
import axios from "axios";
import { connect } from "react-redux";
import { signin } from "../../actions";

class Signin extends Component {
  render() {
    return (
      <>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={async (values, actions) => {
            try {
              const res = await axios.post(
                "http://localhost:3090/signin",
                values
              );
              const { token } = res.data;
              this.props.signin(token);
              this.props.history.push("/feature");
            } catch (e) {
              if (e.response.status === 422) {
                for (const fieldKey in e.response.data) {
                  const msg = e.response.data[fieldKey];
                  actions.setFieldError(fieldKey, msg);
                }
              } else if (e.response.status === 401) {
                actions.setFieldError("password", "Invalid password");
              }
            }
          }}
        >
          {(props) => (
            <Form>
              <TextInput label="Email Address" name="email" type="email" />

              <TextInput label="Password" name="password" type="password" />

              <button
                type="submit"
                disabled={props.isSubmitting || !props.isValid || !props.dirty}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default connect(null, { signin })(Signin);
