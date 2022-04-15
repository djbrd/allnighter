import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Typography, Box } from "@mui/material";

import ErrorSnackbar from "../../common/components/ErrorSnackbar";
import { setErrorsFromResponse } from "../../utils";
import { api } from "../../utils/api";

import ContactFragment, { contactSchema } from "./ContactFragment";
import Page from "../../common/components/Page";

const schema = contactSchema;

const AccessForm = (props) => {
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
      data["web"] = true;
      await api.post(`/accessBids`, data);
    } catch (err) {
      setErrorsFromResponse(err.response, setError);
      throw new Error("Submit unsuccessful");
    }
  };

  return (
    <Page>
      <Box pb={1}>
        <Typography variant="h1">get full access</Typography>
      </Box>
      {isSubmitSuccessful ? (
        <>
          <Box pt={2} pb={2}>
            <Typography>Thank you for your interest</Typography>
          </Box>
          <Box pb={2}>
            <Typography>An invitation will be sent to you</Typography>
          </Box>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <ContactFragment control={control} isSubmitting={isSubmitting} />
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

export default AccessForm;
