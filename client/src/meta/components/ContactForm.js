import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, /*Container, */ Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ControlledTextField from "../../common/components/ControlledTextField";
import ErrorSnackbar from "../../common/components/ErrorSnackbar";
import { setErrorsFromResponse } from "../../utils";
import { api } from "../../utils/api";

import Page from "../../common/components/Page";

const useStyles = makeStyles((theme) => ({
  singleInput: {
    maxWidth: "340px",
  },
}));

const schema = Yup.object().shape({
  email: Yup.string().required("Required").email(),
  message: Yup.string()
    .required("Required")
    .max(4000, "Please make your message a bit shorter"),
});

const ContactForm = (props) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    defaultValues: { email: "", message: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post(`/contacts`, data);
    } catch (err) {
      setErrorsFromResponse(err.response, setError);
      throw new Error("Submit unsuccessful");
    }
  };

  const verticalPadding = 8;

  return (
    <Page>
      <Box pt={verticalPadding} pb={1}>
        <Typography variant="h1">contact</Typography>
      </Box>
      {isSubmitSuccessful ? (
        <>
          <Box pt={4}>
            <Typography>
              Thanks for the feedback, comment(s), questions(s), etc.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={classes.singleInput}>
              <Controller
                name="email"
                control={control}
                render={(props) => (
                  <ControlledTextField {...props} type="email" required />
                )}
              />
            </div>
            <Controller
              name="message"
              control={control}
              render={(props) => (
                <ControlledTextField {...props} multiline required autoFocus />
              )}
            />

            <Box pt={1} pb={verticalPadding}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Box>
          </form>
          <ErrorSnackbar
            message={errors.form?.message}
            clearErrors={clearErrors}
          />
        </>
      )}
    </Page>
  );
};

export default ContactForm;
