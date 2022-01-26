const express = require('express')
const app = express()
const multer = require('multer');

//  the static images file
const path = require('path');
app.use("/uploads", express.static(path.join(__dirname, 'backend/uploads/')));

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "backend/uploads/") },
  filename: (req, file, cb) => {
    // console.log(req.file);
    cb(null, req.body.name)
  },
})

const upload = multer({ storage: fileStorageEngine });

module.exports = {
  upload
}