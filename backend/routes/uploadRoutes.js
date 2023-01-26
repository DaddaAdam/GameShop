import express from "express";
import multer from "multer";
import { uploadFile } from "../utils/s3Client.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);

  const result = await uploadFile(file);
  console.log(result);
  res.json(result);
});

export default router;
