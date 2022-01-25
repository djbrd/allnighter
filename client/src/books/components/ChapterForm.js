import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import ControlledTextField from "../../common/components/ControlledTextField";
import { createChapter } from "../actions";
import { setErrorsFromResponse } from "../../utils";

const useStyles = makeStyles((theme) => ({
  selectFile: {
    textTransform: "none",
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  errorMessage: {
    color: "red",
  },
}));

const schema = Yup.object().shape({
  title: Yup.string().required("Required"),
});

const ChapterForm = (props) => {
  const classes = useStyles();
  const { partId, onClose } = props;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { title: "" },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/parts/${partId}/chapter`,
        data
      );
      const { chapter } = res.data;
      dispatch(createChapter(partId, chapter));
      onClose();
    } catch (err) {
      setErrorsFromResponse(err.response);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="title"
        control={control}
        render={(props) => <ControlledTextField {...props} />}
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

export default ChapterForm;
