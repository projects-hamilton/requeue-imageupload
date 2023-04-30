const mongoose = require("mongoose");
const express = require("express");
require('express-group-routes');
const app = express();
require("dotenv").config();
const db = process.env.DB_URI;
const cors = require("cors");



const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const http = require("http");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
const server = http.createServer(app);
app.use(cors());
const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  },
});



mongoose.set('strictQuery', true);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: false
  })
  .then(async () => {
 
    console.log("mongodb connected...")
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});






app.use("/api/imageupload", require("./routes/image"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
