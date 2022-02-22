import TextField from "@material-ui/core/TextField";

const ControlledTextField = (props) => {
  const {
    label,
    field,
    type,
    fieldState: { error },
    autoFocus,
  } = props;

  return (
    <TextField
      {...field}
      label={
        label ? label : field.name.charAt(0).toUpperCase() + field.name.slice(1)
      }
      error={!!error}
      helperText={error ? error.message : null}
      type={!!type ? type : "text"}
      required
      variant="outlined"
      margin="normal"
      fullWidth
      autoFocus={autoFocus}
    />
  );
};

export default ControlledTextField;
