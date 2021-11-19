import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";

import FormDialog from "../../common/components/FormDialog";
import ControlledTextField from "../../common/components/ControlledTextField";
import { createPart } from "../actions";
import { setErrorsFromResponse } from "../../utils";

const schema = Yup.object().shape({
  title: Yup.string().required("Required"),
});

const PartForm = (props) => {
  const { bookId } = props;
  const { open, onClose } = props;
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
        `${process.env.REACT_APP_API_URL}/books/${bookId}/parts`,
        data
      );
      const { part } = res.data;
      dispatch(createPart(bookId, part));
      onClose();
    } catch (err) {
      setErrorsFromResponse(err.response);
    }
  };

  return (
    <FormDialog open={open} onClose={onClose} disableClose={isSubmitting}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="title"
          control={control}
          render={(props) => <ControlledTextField {...props} />}
        />
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

export default PartForm;
