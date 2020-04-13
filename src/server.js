require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary");
const formData = require("express-form-data");
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config");

const app = express();

cloudinary.config({
  cloud_name: "appex",
  api_key: "945544582481993",
  api_secret: "-CyUkIydZqwuTmhk6LXeQvYsyYs"
});

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(formData.parse());

app.post("/image/upload", (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise.all(promises).then(results => res.json(results));
});

app.listen(process.env.PORT || 8080, () => console.log("👍"));
