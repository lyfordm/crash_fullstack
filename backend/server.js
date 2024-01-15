require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("./utils/cors")
//port number
const port = process.env.PORT;
// Routes import
const FaqRoutes = require("./routes/faqRoutes")
const ServiceRoutes = require("./routes/servicesRoutes")

// the express app
const app = express()
//Middleware
app.use(cors);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


// base route
app.get("/", (req, res) => {
    res.send("welcome to the mini fullstack course")
})
// api routes
app.use("/api/faqs", FaqRoutes)
app.use("/api/services", ServiceRoutes)

// database connection
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


