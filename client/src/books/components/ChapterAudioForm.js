import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import FormDialog from "../../common/components/FormDialog";
import { createChapterAudio } from "../actions";
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

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const schema = Yup.object().shape({
  audio: Yup.mixed()
    .required("File is required")
    .test(
      "fileSize",
      `The file must be no larger than ${MAX_FILE_SIZE_MB}MB`,
      (value) => {
        return value && value[0].size <= MAX_FILE_SIZE;
      }
    )
    .test("fileType", "File must be .mp3", (value) => {
      return value && value[0].type === "audio/mpeg";
    }),
});

const ChapterAudioForm = (props) => {
  const classes = useStyles();
  const { open, onClose, chapterId } = props;
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { audio: null },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("audio", data["audio"][0]);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/chapters/${chapterId}/audio`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(createChapterAudio(chapterId));
      onClose();
    } catch (err) {
      setErrorsFromResponse(err.response);
    }
  };

  // Used to render chip displaying selected file
  const watchAudio = watch("audio");

  const isFileSelected = () => {
    return Boolean(watchAudio && watchAudio.length);
  };

  return (
    <FormDialog open={open} onClose={onClose} disableClose={isSubmitting}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {isFileSelected() ? (
          <Chip
            size="small"
            label={watchAudio[0].name}
            onDelete={() => setValue("audio", null)}
          />
        ) : (
          <label htmlFor="audioFile">
            <input
              {...register("audio")}
              type="file"
              accept="audio/mpeg"
              id="audioFile"
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              component="span"
              className={classes.selectFile}
              disabled={isFileSelected()}
              fullWidth
            >
              Choose mp3 file
            </Button>
          </label>
        )}
        {errors.audio && (
          <span className={classes.errorMessage}>{errors.audio.message}</span>
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
    </FormDialog>
  );
};

export default ChapterAudioForm;
