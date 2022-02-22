const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: Boolean,
    default: false,
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

chapterSchema.pre("save", function (next) {
  const chapter = this;
  chapter.body = !!chapter.paragraphs && chapter.paragraphs.length > 0;
  next();
});

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
