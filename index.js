import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoute from "./route/Users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import Info from "./db/schema.js";
import { ocrData } from "./ocr.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));

app.use("/api/users", usersRoute);

const connectionParams = {};

// MongoDB Connection
const db = "mongodb+srv://20uec129:DmlJB2uzwPGLh4iu@cluster0.tr5b5ks.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db, connectionParams)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected");
});

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// OCR Image Upload Endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const path = req.file.destination + "/" + req.file.filename;
    const data = await ocrData(path);

    // Save OCR data to MongoDB
    const result = await Info.create({
      image: req.file.filename,
      identificationNumber: data.identificationNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      dateOfExpiry: data.dateOfExpiry,
      dateOfIssue: data.dateOfIssue,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Default Route
app.use("/", (req, res) => {
  return res.send("OCR-App backend");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
