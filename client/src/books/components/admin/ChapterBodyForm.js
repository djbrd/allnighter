import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import { createChapterBody } from "../../actions";
import { setErrorsFromResponse } from "../../../utils";
import { api } from "../../../utils/api";

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

const MAX_FILE_SIZE = 1024 * 1024;

const schema = Yup.object().shape({
  body: Yup.mixed()
    .required("File is required")
    .test("fileSize", "The file must be no larger than 1MB", (value) => {
      return !value || value[0].size <= MAX_FILE_SIZE;
    })
    .test("fileType", "File must be plain text (.txt)", (value) => {
      return !value || value[0].type === "text/plain";
    }),
});

const ChapterBodyForm = (props) => {
  const classes = useStyles();
  const { chapterId, onClose } = props;
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { body: null },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  // Used to render chip displaying selected file
  const watchBody = watch("body", null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("body", data["body"][0]);

    try {
      const res = await api.patch(`/chapters/${chapterId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(createChapterBody(res.data.chapter));
      onClose();
    } catch (err) {
      setErrorsFromResponse(err.response);
    }
  };

  const isFileSelected = () => {
    return Boolean(watchBody && watchBody.length);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {isFileSelected() ? (
        <Chip
          variant="outlined"
          label={watchBody && watchBody[0] ? watchBody[0].name : null}
          onDelete={() => setValue("body", null, { shouldValidate: true })}
          className={classes.chip}
        />
      ) : (
        <label htmlFor="bodyFile">
          <input
            {...register("body")}
            type="file"
            accept="text/plain"
            id="bodyFile"
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            component="span"
            className={classes.selectFile}
            disabled={isFileSelected()}
            fullWidth
          >
            Choose txt file
          </Button>
        </label>
      )}
      {errors.body && (
        <span className={classes.errorMessage}>{errors.body.message}</span>
      )}
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

export default ChapterBodyForm;
