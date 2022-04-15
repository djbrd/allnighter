const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const lazilyCreateBucket = async (bucketId) => {
  try {
    await s3.headBucket({ Bucket: bucketId }).promise();
  } catch (err) {
    if (err.statusCode === 404) {
      // create bucket
      await s3
        .createBucket({
          Bucket: bucketId,
          CreateBucketConfiguration: {
            LocationConstraint: process.env.AWS_REGION,
          },
        })
        .promise();
    } else {
      throw err;
    }
  }
};

const deleteObject = async (bucketId, key) => {
  return await s3.deleteObject({ Bucket: bucketId, Key: key }).promise();
};

const emptyBucket = async (bucketId) => {
  const data = await s3.listObjectsV2({ Bucket: bucketId }).promise();
  data.Contents.forEach(async (content) => {
    await deleteObject(bucketId, content.Key);
  });
};

const lazilyDeleteBucket = async (bucketId) => {
  try {
    await emptyBucket(bucketId);
  } catch (err) {
    // listObjects in emptyBucket will throw an error with status code 404 if the bucket doesn't exist
    if (err.statusCode === 404) {
      return;
    }

    throw err;
  }

  const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  for (let i = 0; i < 10; ++i) {
    try {
      await s3.deleteBucket({ Bucket: bucketId }).promise();
      return;
    } catch (err) {
      if (err.statusCode === 409 && err.code == "BucketNotEmpty") {
        await sleep(2000);
        console.log(`Waited ${2 * i} seconds`);
      } else {
        throw err;
      }
    }
  }

  throw new Error("Bucket not empty");
};

module.exports = {
  s3,
  lazilyCreateBucket,
  lazilyDeleteBucket,
  deleteObject,
};
