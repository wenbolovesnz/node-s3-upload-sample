const AWS = require("aws-sdk");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config(); // this will load values in .env file to process.env

const s3 = new AWS.S3({
  accessKeyId: process.env.AccessKeyId,
  secretAccessKey: process.env.SecretAccessKey
});

const uploadFile = fileName => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);
  // Setting up S3 upload parameters
  const params = {
    Bucket: "carters-underlying-data",
    Key: "test.png", // File name you want to save as in S3
    Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

uploadFile("./test.png");
