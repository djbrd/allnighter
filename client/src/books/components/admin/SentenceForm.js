import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";

import ControlledTextField from "../../../common/components/ControlledTextField";
import { changeSentence } from "../../actions";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

const schema = Yup.object().shape({
  sentence: Yup.string().required("Required"),
});

const SentenceForm = (props) => {
  const classes = useStyles();
  const { text, chapterId, paragraphId, sentenceId, onClose } = props;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { sentence: text },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(changeSentence(chapterId, paragraphId, sentenceId, data.sentence));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="sentence"
        control={control}
        render={(props) => (
          <ControlledTextField {...props} multiline autoFocus required />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        className={classes.submit}
        color="primary"
        fullWidth
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
};

export default SentenceForm;
