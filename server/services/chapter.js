const { deleteObject } = require("./s3");
const Part = require("../models/Part");
const Book = require("../models/Book");
const nlp = require("wink-nlp-utils");

const getAudioObjectKey = (chapterId) => {
  return chapterId + ".mp3";
};

const getBucketId = async (chapterId, partId, bookId) => {
  if (!partId) {
    const part = await Part.findOne({
      chapters: chapterId,
    });
    if (!part) {
      throw new Error("Part not found");
    }
    partId = part._id;
  }

  if (!bookId) {
    const book = await Book.findOne({
      parts: partId,
    });
    if (!book) {
      throw new Error("Book not found");
    }
    bookId = book._id;
  }

  return bookId.toString();
};

const deleteAudio = async (chapterId, partId, bookId) => {
  const bucketId = await getBucketId(chapterId, partId, bookId);
  await deleteObject(bucketId, getAudioObjectKey(chapterId));
};

const bodyToParagraphs = (body) => {
  // Split body into paragaphs
  let paragraphs = body.split(/\r?\n/);

  // Split paragraphs into sentences, and remove any empty sentences
  paragraphs = paragraphs.map((paragraph) => {
    return nlp.string
      .sentences(paragraph)
      .filter((sentence) => sentence.match(/^\s*$/) === null);
  });

  return paragraphs;
};

module.exports = { getAudioObjectKey, getBucketId, deleteAudio, bodyToParagraphs };
