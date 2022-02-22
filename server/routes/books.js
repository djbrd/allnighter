const express = require("express");
const books = express.Router();
const Book = require("../models/Book");
const Part = require("../models/Part");
const { deleteAudio } = require("../services/chapter");
const { lazilyDeleteBucket } = require("../services/s3");
const { requireAdmin } = require("../services/auth");

books.get("/", async (req, res) => {
  const books = await Book.find().populate({
    path: "parts",
    select: "_id title",
    populate: { path: "chapters", select: "_id title audio body" },
  });

  res.status(200).send({ books });
});

// This path populates chapters and therefore requires admin rights
books.get("/:id", requireAdmin, async (req, res) => {
  const book = await Book.findById(req.params.id).populate({
    path: "parts",
    populate: { path: "chapters" },
  });
  if (!book) {
    return res.status(404).send({ message: "Cannot find book" });
  }
  res.status(200).send({ book });
});

books.get("/title/:title", async (req, res) => {
  const book = await Book.findOne({ title: req.params.title }).populate({
    path: "parts",
    populate: { path: "chapters", select: "_id title audio body" },
  });

  if (!book) {
    return res.status(404).send({ message: `Cannot find ${req.params.title}` });
  }
  res.status(200).send({ book });
});

books.post("/", requireAdmin, async (req, res) => {
  const { title } = req.body;
  const book = new Book({ title });
  book.save((err) => {
    if (err) {
      return res.status(422).send({ error: err });
    }

    res.status(201).send({ book });
  });
});

books.delete("/:bookId", requireAdmin, async (req, res) => {
  const bookId = req.params.bookId;
  let book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).send({ message: "Invalid book id" });
  }

  try {
    lazilyDeleteBucket(book._id.toString());
    await book.deleteOne();
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Book with id " + id,
    });
  }

  res.status(204).send();
});

// TEMP
books.delete("/", requireAdmin, async (req, res) => {
  try {
    await Book.deleteMany();
  } catch (err) {
    res.status(500).send({
      message: "Could not delete all books",
    });
  }
  res.status(204).send();
});

// Add a new part to a book
books.post("/:id/parts", requireAdmin, async (req, res) => {
  const { title } = req.body;
  let part = new Part({ title });
  await part.save();

  // Add reference to book
  book = await Book.findByIdAndUpdate(
    req.params.id,
    { $push: { parts: part._id } },
    { new: true, useFindAndModify: false }
  );

  if (!book) {
    part.deleteOne();
    return res.status(404).send({ message: "Invalid book id" });
  }

  res.status(201).send({ part });
});

// Remove part from book
books.delete("/:bookId/parts/:partId", requireAdmin, async (req, res) => {
  const partId = req.params.partId;
  const book = await Book.findOneAndUpdate(
    {
      parts: partId,
    },
    { $pull: { parts: partId } },
    { new: true, useFindAndModify: false }
  );

  if (!book) {
    return res.status(404).send({ message: "Invalid book id" });
  }

  let part = await Part.findById(req.params.partId).populate({
    path: chapters,
  });
  if (!part) {
    return res.status(404).send({ message: "Invalid part id" });
  }

  // Remove any audio files for chapters
  part.chapters.forEach(async (chapter) => {
    if (chapter.audio) {
      await deleteAudio(chapter._id, part._id, book._id);
    }
  });

  part = await part.deleteOne();
  return res.status(204).send();
});

module.exports = books;
