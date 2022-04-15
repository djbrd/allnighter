import { useState } from "react";
import {
  Button,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  // FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  useTheme,
} from "@mui/material";
import { Controller } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SmsIcon from "@mui/icons-material/Sms";
import { WhatsappIcon, TelegramIcon } from "react-share";
import * as Yup from "yup";

import ControlledTextField from "../../common/components/ControlledTextField";

export const contactSchema = Yup.object().shape(
  {
    email: Yup.string()
      .email()
      .when("phone", {
        is: (val) => !val || val.length === 0,
        then: Yup.string().required("Email or phone number is required"),
      }),
    phone: Yup.string().when("email", {
      is: (val) => !val || val.length === 0,
      then: Yup.string().required("Email or phone number is required"),
    }),
    message: Yup.string()
      .required("Required")
      .max(4000, "Please make your message a bit shorter"),
  },
  ["email", "phone"]
);

const ControlledPhoneInput = (props) => {
  const {
    field,
    fieldState: { error },
  } = props;

  return (
    <TextField
      {...field}
      label="phone"
      error={!!error}
      helperText={error ? error.message : null}
      variant="outlined"
      margin="normal"
      fullWidth
      InputProps={{
        startAdornment: <InputAdornment position="start">+</InputAdornment>,
      }}
    />
  );
};

const ContactFragment = ({ control, isSubmitting, requireMessage }) => {
  const theme = useTheme();
  const size = theme.spacing(3);
  const borderRadius = theme.spacing(3);

  const [emailOrPhone, setEmailOrPhone] = useState("email");
  const handleChange = (event) => {
    setEmailOrPhone(event.target.value);
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <FormControl margin="normal">
            <RadioGroup
              name="emailOrPhone"
              value={emailOrPhone}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label={<EmailIcon />}
              />
              <FormControlLabel
                value="phone"
                control={<Radio />}
                label={<PhoneAndroidIcon />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      {emailOrPhone === "email" ? (
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              render={(props) => (
                <ControlledTextField {...props} type="email" />
              )}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              render={(props) => <ControlledPhoneInput {...props} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ pt: { sm: 2 }, pl: { sm: 2 } }}>
            <FormControl>
              <Controller
                rules={{ required: true }}
                control={control}
                name="channel"
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="sms"
                      control={<Radio />}
                      label={<SmsIcon />}
                    />
                    <FormControlLabel
                      value="whatsapp"
                      control={<Radio />}
                      label={
                        <WhatsappIcon size={size} borderRadius={borderRadius} />
                      }
                    />
                    <FormControlLabel
                      value="telegram"
                      control={<Radio />}
                      label={
                        <TelegramIcon size={size} borderRadius={borderRadius} />
                      }
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
      <Controller
        name="message"
        control={control}
        render={(props) => (
          <ControlledTextField {...props} multiline required={requireMessage} />
        )}
      />
      <Box pt={1} pb={8}>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ContactFragment;
