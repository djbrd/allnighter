const mongoose = require("mongoose");
const Part = require("./Part");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Part",
      },
    ],
  }
);

// Create a part for a new book
bookSchema.pre("save", async function (next) {
  const book = this;
  if (book.parts.length) {
    return next();
  }
  let part = new Part();
  part.title = "Part One";
  await part.save();
  book.parts.push(part);
  next();
});

// Delete a book's parts when a book is deleted
bookSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const book = this;
    try {
      book.parts.forEach(async (partId) => {
        let part = await Part.findById(partId);
        await part.deleteOne();
      });
    } catch (err) {
      next(err);
    }
    next();
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
