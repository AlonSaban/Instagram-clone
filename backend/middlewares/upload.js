const express = require('express')
const app = express()
const router = express.Router();
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "backend/uploads/") },
  filename: (req, file, cb) => {
    // console.log(req.file);
    cb(null, req.body.name)
  },
})

const upload = multer({ storage: fileStorageEngine });
//  the static images file
// const path = require('path');
// app.use("/img", express.static(path.join(__dirname, 'frontend/src/img')));

module.exports = {
  upload
}