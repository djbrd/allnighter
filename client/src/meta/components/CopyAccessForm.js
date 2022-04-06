import { useForm, Controller, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Button,
  // Container,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ControlledTextField from "../../common/components/ControlledTextField";
import ErrorSnackbar from "../../common/components/ErrorSnackbar";
import { setErrorsFromResponse } from "../../utils";
import { api } from "../../utils/api";

import Page from "../../common/components/Page";

const wantedMsgs = [
  "An invitation will be sent to you by email",
  "You'll be notified when a book is available",
  "You'll be notified when an epub is available",
  "You'll be notified when all-nighter is avaiable in the kindle store",
  "You'll be notified when recordings are available to download but in the meantime, they are available here with full access",
  "If you're very special I'll think about working on an another format",
];
const options = ["web", "book", "epub", "kindle", "mp3", "other"];
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
    email: Yup.string().required("Required").email(),
    ...optionShapes,
    otherDescription: Yup.string()
      .max(256)
      .when("other", {
        is: (other) => other === true,
        then: Yup.string().required("Please indicate what other format"),
      }),
    message: Yup.string().max(4000, "Please make your message a bit shorter"),
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
  });

const useStyles = makeStyles((theme) => ({
  singleInput: {
    maxWidth: "340px",
  },
}));

const CopyAccessForm = (props) => {
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
  const verticalPadding = 8;

  const classes = useStyles();

  return (
    // <Container maxWidth="xs" className={classes.container}>
    <Page>
      <Box pt={verticalPadding} pb={2}>
        <Typography variant="h1">promo copy/access</Typography>
      </Box>
      {isSubmitSuccessful ? (
        <>
          <Box pt={2}>
            {getCheckedOptions().map((option, index) => {
              return (
                <Box pb={2} key={option}>
                  <Typography>{wantedMsgs[index]}</Typography>
                </Box>
              );
            })}
          </Box>
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
              <div className={classes.singleInput}>
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
              </div>
            )}
            <div className={classes.singleInput}>
              <Controller
                name="email"
                control={control}
                render={(props) => (
                  <ControlledTextField
                    {...props}
                    type="email"
                    autofocus
                    required
                  />
                )}
              />
            </div>
            <Controller
              name="message"
              control={control}
              render={(props) => (
                <ControlledTextField {...props} multiline label="message" />
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
      {/* </Container> */}
    </Page>
  );
};

export default CopyAccessForm;
