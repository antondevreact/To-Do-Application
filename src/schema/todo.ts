import * as Yup from "yup";

export const TodoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required and cannot be empty").trim(),
});
