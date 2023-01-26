import dotenv from "dotenv";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// uploads a file to s3
async function uploadFile(file) {
  const params = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const getObjectParams = {
    Bucket: bucketName,
    Key: file.originalname,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  const getCommand = new PutObjectCommand(getObjectParams);

  const url = await getSignedUrl(s3, getCommand);

  return url.split("?X-Amz")[0];
}

// downloads a file from s3
async function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
export { uploadFile, getFileStream };
