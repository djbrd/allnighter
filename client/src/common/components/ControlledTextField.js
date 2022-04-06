import TextField from "@material-ui/core/TextField";

const ControlledTextField = (props) => {
  const {
    label,
    field,
    type,
    fieldState: { error },
    autoFocus,
    multiline,
    required,
    inline,
  } = props;

  return (
    <TextField
      {...field}
      label={label ? label : field.name}
      error={!!error}
      helperText={error ? error.message : null}
      type={!!type ? type : "text"}
      required={required}
      variant="outlined"
      margin="normal"
      fullWidth={!inline}
      autoFocus={autoFocus}
      multiline={multiline}
      rows={multiline ? 6 : 1}
    />
  );
};

export default ControlledTextField;
