const mongoose = require("mongoose");
const Chapter = require("./Chapter");

const partSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  chapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
});

// Delete a part's chapters when a part is deleted
partSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const part = this;
    const chapterIds = part.chapters.map((chapter) => chapter._id);
    await Chapter.deleteMany({ _id: { $in: chapterIds } });
    next();
  }
);

const Part = mongoose.model("Part", partSchema);
module.exports = Part;
