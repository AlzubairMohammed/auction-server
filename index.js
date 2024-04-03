const express = require("express");
const app = express();
require("dotenv").config();
const installments = require("./routes/installments");
const appartments = require("./routes/appartments");
const users = require("./routes/users");
const payments = require("./routes/payments");
const httpStatus = require("./utils/httpStatus");
const fileEasyUpload = require("express-easy-fileuploader");
app.use(express.json());
app.set("view engine", "ejs");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  fileEasyUpload({
    app,
    fileUploadOptions: {
      limits: { fileSize: 50 * 1024 * 1024 },
    },
  })
);

const URL = process.env.ROUTES_URL;
app.use(`${URL}/installments`, installments);
app.use(`${URL}/appartments`, appartments);
app.use(`${URL}/users`, users);
app.use(`${URL}/payments`, payments);

app.use(express.static("."));
// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatus.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`app running at ${PORT}`);
});
