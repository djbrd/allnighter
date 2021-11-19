const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  paragraphs: {
    type: [[String]],
    default: [],
  },
  audio: {
    type: Boolean,
    default: false,
  },
  sentenceStartTimes: {
    type: [Number],
    default: [],
  },
});

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
