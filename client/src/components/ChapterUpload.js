import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object().shape({
  chapter: Yup.mixed()
    .required("File is required")
    .test("fileSize", "The file must be no larger than 1MB", (value) => {
      return value && value[0].size <= 1024 * 1024;
    })
    .test("fileType", "File must be plain text (.txt)", (value) => {
      return value && value[0].type === "text/plain";
    }),
});

const ChapterUpload = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    validationSchema: schema,
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("chapter", data["chapter"][0]);

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/chapter`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // TODO: register response in redux?
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("chapter")} type="file" />
      {errors.chapter && <p>{errors.chapter.message}</p>}
      <button>Submit</button>
    </form>
  );
};

export default ChapterUpload;
