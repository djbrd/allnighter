import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import FormDialog from "../../common/components/FormDialog";
import ControlledTextField from "../../common/components/ControlledTextField";
import { createChapter } from "../actions";
import { setErrorsFromResponse } from "../../utils";

const useStyles = makeStyles((theme) => ({
  selectFile: {
    textTransform: "none",
  },
}));

const MAX_FILE_SIZE = 1024 * 1024;

const schema = Yup.object().shape({
  title: Yup.string().required("Required"),
  body: Yup.mixed()
    .required("File is required")
    .test("fileSize", "The file must be no larger than 1MB", (value) => {
      return value && value[0].size <= MAX_FILE_SIZE;
    })
    .test("fileType", "File must be plain text (.txt)", (value) => {
      return value && value[0].type === "text/plain";
    }),
});

const ChapterForm = (props) => {
  const classes = useStyles();
  const { open, onClose, partId } = props;
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "" },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  // Used to render chip displaying selected file
  const watchBody = watch("body");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("body", data["body"][0]);
    formData.append("title", data["title"]);

    console.log(data);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/parts/${partId}/chapter`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Created chapter")
      dispatch(createChapter(partId, res.data.chapter));
      onClose();
    } catch (err) {
      setErrorsFromResponse(err.response);
    }
  };

  const isFileSelected = () => {
    return Boolean(watchBody && watchBody.length);
  };

  return (
    <FormDialog open={open} onClose={onClose} disableClose={isSubmitting}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="title"
          control={control}
          render={(props) => <ControlledTextField {...props} />}
        />
        {isFileSelected() ? (
          <Chip
            size="small"
            label={watchBody[0].name}
            onDelete={() => setValue("body", null)}
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
        {errors.body && <span>{errors.body.message}</span>}
        <Button
          type="submit"
          variant="contained"
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

export default ChapterForm;
