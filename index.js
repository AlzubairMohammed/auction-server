const express = require("express");
const app = express();
require("dotenv").config();
const users = require("./routes/users");
const auctions = require("./routes/auctions");
const realestates = require("./routes/realestates");
const areas = require("./routes/areas");
const cities = require("./routes/cities");
const quarters = require("./routes/quarters");
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
app.use(`${URL}/users`, users);
app.use(`${URL}/auctions`, auctions);
app.use(`${URL}/realestates`, realestates);
app.use(`${URL}/areas`, areas);
app.use(`${URL}/cities`, cities);
app.use(`${URL}/quarters`, quarters);

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
