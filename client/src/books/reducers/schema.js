import { schema } from "normalizr";

const chapterSchema = new schema.Entity("chapters", {}, { idAttribute: "_id" });
const partSchema = new schema.Entity(
  "parts",
  { chapters: [chapterSchema] },
  { idAttribute: "_id" }
);
const bookSchema = new schema.Entity(
  "books",
  { parts: [partSchema] },
  { idAttribute: "_id" }
);

export { bookSchema, partSchema, chapterSchema };
