const express = require("express");
const parts = express.Router();
const Part = require("../models/Part");
const Chapter = require("../models/Chapter");
const Book = require("../models/Book");
const multer = require("multer");

const { deleteAudio, bodyToParagraphs } = require("../services/chapter");

parts.get("/", async (req, res) => {
  const parts = await Part.find();
  res.status(200).send({ parts });
});

parts.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const part = await Part.findById(req.params.id);
  if (!part) {
    return res.status(404).send({ message: "Cannot find part" });
  }
  res.status(200).send({ part });
});

parts.delete("/:partId", async (req, res, next) => {
  const partId = req.params.partId;
  try {
    // Remove part from book
    let book = await Book.findOneAndUpdate(
      {
        parts: partId,
      },
      {
        $pull: { parts: partId },
      },
      { new: true, useFindAndModify: false }
    );
    if (!book) {
      throw new Error("Book not found");
    }

    let part = await Part.findById(partId).populate({ path: "chapters" });
    if (!part) {
      return res.status(404).send({ message: "Invalid part id" });
    }

    // Remove any audio files for chapters
    part.chapters.forEach(async (chapter) => {
      if (chapter.audio) {
        await deleteAudio(chapter._id, partId, book._id);
      }
    });

    // Chapters are removed in hook for deleteOne
    part.deleteOne();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// TEMP
parts.delete("/", async (req, res, next) => {
  try {
    await Part.deleteMany();
  } catch (err) {
    next(err);
  }
  res.status(204).send();
});

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/plain") {
      cb(null, true);
    } else {
      return cb(new Error("Only .txt format allowed"), false);
    }
  },
  limits: { fileSize: 20 * 1024 * 1024, fieldNameSize: 127 },
});

// Add new chapter to a part
parts.post("/:id/chapter", upload.single("body"), async (req, res, next) => {
  try {
    // if (!req.file) {
    //   return res.status(422).send({ error: "File is required" });
    // }

    let newChapter = {
      title: req.body.title,
    };

    if (req.file) {
      const body = req.file.buffer.toString();
      newChapter.body = body;
      newChapter.paragraphs = bodyToParagraphs(body);
    }
    const chapter = await Chapter.create(newChapter);

    // Add reference to book
    part = await Part.findByIdAndUpdate(
      req.params.id,
      { $push: { chapters: chapter._id } },
      { new: true, useFindAndModify: false }
    );

    if (!part) {
      chapter.deleteOne();
      return res.status(404).send({ message: "Invalid part id" });
    }

    res.status(201).send({
      chapter,
    });
  } catch (err) {
    next(err);
  }
});

// Remove chapter from a part
parts.delete("/:partId/chapter/:chapterId", async (req, res, next) => {
  const partId = req.params.partId;
  const chapterId = req.params.chapterId;

  try {
    // Remove from part
    const part = await Part.findByIdAndUpdate(
      partId,
      {
        $pull: { chapters: chapterId },
      },
      { new: true, useFindAndModify: false }
    );
    if (!part) {
      next(new Error("Part not found"));
    }

    const chapter = await Chapter.findByIdAndRemove(chapterId);
    if (!chapter) {
      next(new Error("Chapter not found"));
    }

    if (chapter.audio) {
      await deleteAudio(chapter._id, part._id);
    }
  } catch (err) {
    next(err);
  }

  res.status(200).send(part);
});

module.exports = parts;
