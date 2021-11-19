const express = require("express");
const chapters = express.Router();
const Chapter = require("../models/Chapter");
const Part = require("../models/Part");
const process = require("process");

const multer = require("multer");
const multerS3 = require("multer-s3");
const {
  getAudioObjectKey,
  getBucketId,
  deleteAudio,
} = require("../services/chapter");
const { s3, lazilyCreateBucket } = require("../services/s3");
const { bodyToParagraphs } = require("../services/chapter");

chapters.get("/", async (req, res) => {
  const chapters = await Chapter.find();
  //console.log("Memory usage: ", process.memoryUsage());
  res.status(200).send({ chapters });
});

chapters.get("/:chapterId", async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    if (chapter === null) {
      return res.status(404).send({ message: "Cannot find chapter" });
    }
    res.status(200).send({ chapter });
  } catch (err) {
    next(err);
  }
});

chapters.patch("/:chapterId", async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    if (chapter === null) {
      return res.status(404).send({ message: "Cannot find chapter" });
    }

    const { title, body, paragraphs, sentenceStartTimes } = req.body;
    if (title) {
      chapter.title = title;
    }
    if (body) {
      chapter.body = body;
      if (!paragraphs) {
        chapter.paragraphs = bodyToParagraphs(body)
      }
    }
    if (paragraphs) {
      chapter.paragraphs = paragraphs;
    } 
    if (sentenceStartTimes) {
      chapter.sentenceStartTimes = sentenceStartTimes;
    }

    await chapter.save();
    res.status(200).send({ chapter });
  } catch (err) {
    next(err);
  }
});

chapters.delete("/:chapterId", async (req, res, next) => {
  const chapterId = req.params.chapterId;

  try {
    // Remove from part
    const part = await Part.findOneAndUpdate(
      {
        chapters: chapterId,
      },
      {
        $pull: { chapters: chapterId },
      },
      { new: true, useFindAndModify: false }
    );
    if (!part) {
      return res.status(404).send({ message: "Part not found" });
    }

    let chapter = await Chapter.findByIdAndRemove(chapterId);
    if (!chapter) {
      return res.status(404).send({ message: "Chapter not found" });
    }

    // Delete audio file if there is one
    if (chapter.audio) {
      await deleteAudio(chapterId, part._id);
    }
  } catch (err) {
    next(err);
  }

  res.status(204).send();
});

// TEMP
chapters.delete("/", async (req, res) => {
  try {
    await Chapter.deleteMany();
  } catch (err) {
    res.status(500).send({
      message: "Could not delete all chapters",
    });
  }
  res.status(204).send();
});

const uploadToS3 = multer({
  storage: multerS3({
    s3,
    bucket: (req, file, cb) => {
      cb(null, req.params.bucketId);
    },
    key: (req, file, cb) => {
      cb(null, getAudioObjectKey(req.params.chapterId));
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(new Error("Only accepting mpeg (mp3)"));
    }
  },
  limits: { fileSize: 20 * 1024 * 1024, fieldNameSize: 127 },
});

chapters.post(
  "/:chapterId/audio",
  // Before upload
  async (req, res, next) => {
    try {
      // check chapter exists
      const chapter = await Chapter.findById(req.params.chapterId);
      if (chapter === null) {
        return res.status(404).json({ message: "Cannot find chapter" });
      }

      // lazily create bucket
      const bucketId = await getBucketId(chapter._id);
      lazilyCreateBucket(bucketId);

      // add bucket id to req object
      req.params.bucketId = bucketId;
      next();
    } catch (err) {
      next(err);
    }
  },
  uploadToS3.single("audio"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(422).send({ error: "File is required" });
      }

      // Save indication that audio is present to chapter
      const chapter = await Chapter.findByIdAndUpdate(
        req.params.chapterId,
        { audio: true },
        { new: true, useFindAndModify: false }
      );
      res.status(201).send({ chapter });
    } catch (err) {
      next(err);
    }
  }
);

chapters.get("/:chapterId/audio", async (req, res) => {
  const chapterId = req.params.chapterId;
  try {
    const bucketId = await getBucketId(chapterId);
    const params = {
      Bucket: bucketId,
      Key: getAudioObjectKey(chapterId),
    };

    const headData = await s3.headObject(params).promise();
    const range = req.headers.range;
    if (range) {
      console.log("Range: ", range);
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : headData.ContentLength - 1;
      const chunkSize = end - start + 1;
      const head = {
        "Content-Range": `bytes ${start}-${end}/${headData.ContentLength}`,
        "Accept-Ranges": "bytes",
        "Content-Type": "audio/mpeg",
        "Content-Length": chunkSize,
      };
      res.writeHead(206, head);
      params["Range"] = range;
      const readStream = s3.getObject(params).createReadStream();
      readStream.on("end", () => console.log("Read stream is done 206"));
      readStream.pipe(res);
    } else {
      const head = {
        "Content-Type": "audio/mpeg",
        "Content-Length": headData.ContentLength,
      };
      res.writeHead(200, head);
      const readStream = s3.getObject(params).createReadStream();
      readStream.on("end", () => console.log("Read stream is done 200"));
      readStream.pipe(res);
    }
  } catch (err) {
    next(err);
  }
});

// Delete a chapter's audio
chapters.delete("/:chapterId/audio", async (req, res, next) => {
  try {
    let chapter = await Chapter.findById(req.params.chapterId);
    if (!chapter) {
      next(new Error("Chapter not found"));
    }
    if (!chapter.audio) {
      res.status(404).send({ message: "Audio not found" });
    }

    await deleteAudio(chapter._id);
    chapter.audio = false;
    chapter = await chapter.save();
  } catch (err) {
    next(err);
  }
  res.status(204).send();
});

module.exports = chapters;
