const express = require("express");
const cors = require("cors");

const app = express();



const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

module.exports = app;
