import { useForm, Controller, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import ControlledTextField from "../../common/components/ControlledTextField";
import ErrorSnackbar from "../../common/components/ErrorSnackbar";
import { setErrorsFromResponse } from "../../utils";
import { api } from "../../utils/api";

import Page from "../../common/components/Page";
import ContactFragment, { contactSchema } from "./ContactFragment";

const wantedMsgs = {
  book: "You'll be notified when a book becomes available",
  epub: "You'll be notified when an epub becomes available",
  kindle:
    "You'll be notified when all-nighter becomes available in the kindle store",
  mp3: "You'll be notified when recordings become available to download but in the meantime, they are available here with full access",
  other: "If you're very special I'll think about working on an another format",
};
const options = ["book", "epub", "kindle", "mp3", "other"];
const optionDefaults = options.reduce((defaults, option) => {
  defaults[option] = false;
  return defaults;
}, {});
const optionShapes = options.reduce((shapes, option) => {
  shapes[option] = Yup.boolean();
  return shapes;
}, {});

const schema = Yup.object()
  .shape({
    ...optionShapes,
    otherDescription: Yup.string()
      .max(256)
      .when("other", {
        is: (other) => other === true,
        then: Yup.string().required("Please indicate what other format"),
      }),
  })
  .test("formats", (formats) => {
    if (!options.some((option) => formats[option])) {
      return new Yup.ValidationError(
        "Please select at least one format",
        null,
        "formats"
      );
    }
    return true;
  })
  .concat(contactSchema);

const useStyles = makeStyles((theme) => ({
  singleInput: {
    maxWidth: "50%",
  },
}));

const CopyForm = (props) => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      otherDescription: "",
      ...optionDefaults,
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post(`/accessBids`, data);
    } catch (err) {
      setErrorsFromResponse(err.response, setError);
      throw new Error("Submit unsuccessful");
    }
  };

  const getCheckedOptions = () => {
    return options.filter((option) => getValues(option));
  };

  // Watch other to prompt text input
  const watchOther = useWatch({ control, name: "other" });

  const classes = useStyles();

  return (
    <Page>
      <Box pb={2}>
        <Typography variant="h1">get a copy</Typography>
      </Box>
      {isSubmitSuccessful ? (
        <>
          <Box pt={2} pb={2}>
            <Typography>Thank you for your interest</Typography>
          </Box>
          {getCheckedOptions().map((option) => {
            return (
              <Box pb={2} key={option}>
                <Typography>{wantedMsgs[option]}</Typography>
              </Box>
            );
          })}
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl required error={!!errors.formats} component="fieldset">
              <FormLabel component="legend">preferred format(s)</FormLabel>
              <FormGroup row>
                {options.map((option) => {
                  return (
                    <Controller
                      name={option}
                      key={option}
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          label={option}
                          control={
                            <Checkbox
                              {...field}
                              name={option}
                              color="default"
                            />
                          }
                        />
                      )}
                    />
                  );
                })}
              </FormGroup>
              {!!errors.formats && (
                <FormHelperText>
                  Please select at least one format
                </FormHelperText>
              )}
            </FormControl>
            {watchOther && (
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="otherDescription"
                    control={control}
                    render={(props) => (
                      <ControlledTextField
                        {...props}
                        label={"other format"}
                        required
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
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

export default CopyForm;
