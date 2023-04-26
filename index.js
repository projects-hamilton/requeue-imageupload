const mongoose = require("mongoose");
const express = require("express");
require('express-group-routes');
const app = express();
require("dotenv").config();
const db = process.env.DB_URI;
const cors = require("cors");
const { isCompany } = require("./middilware/auth");
const { createAdmin, getAdmin } = require("./models/adminuser");
const Client = require('@veryfi/veryfi-sdk');
// const MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT || 3000;
const initializemapServer = require('./services/map')
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

initializemapServer(io);

mongoose.set('strictQuery', true);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: false
  })
  .then(async () => {
    // await createAdmin()
    // console.log(await getAdmin("6442ac080745f1fc9ed8b8f9"));
    console.log("mongodb connected...")
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use('/api/superadmin', require("./routes/superadmin"))

// app.group("/api", () => {
//   app.use("/auth", isCompany, require("./routes/auth"));
//   app.use("/user", isCompany, require("./routes/user"));
//   app.use("/admin", isCompany, require("./routes/admin"));
//   app.use("/", isCompany, require("./routes/Driver"));
//   app.use("/", isCompany, require("./routes/TransferRoutes"));
//   app.use("/", isCompany, require("./routes/StoreRoutes"));
// });

app.use("/api/", require("./routes/SupervisorRoutes"));
app.use("/api/imageupload", require("./routes/image"));
app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/auth", isCompany, require("./routes/auth"));
app.use("/api/user", isCompany, require("./routes/user"));
app.use("/api/admin", isCompany, require("./routes/admin"));
app.use("/api/", isCompany, require("./routes/Driver"));
app.use("/api/", isCompany, require("./routes/TransferRoutes"));
app.use("/api/", isCompany, require("./routes/StoreRoutes"));




// const clientId = 'vrfxbabib01BzT2xxDzfCf76yvI5c3uEXKDvdno';
// const clientSecret = '9vEUFvOFTwx41n72kjx2bMjdY9IcL2oRAFbkOJeBnejZeAftueDgHe4SbRcsMJOuIHVnTXfOD3hLpXEaBDHLyhDv3adKygmPlfPXRmIHUPRvVRwExiuTIeN0gKAxlOFi';
// const username = 'rubi_in';
// const apiKey = '534106092094e6999172fa4b5e26354e';
// // const filePath = '90549817007.png';

// const veryfiClient = new Client(clientId, clientSecret, username, apiKey);
// const results = async () => await veryfiClient.process_document('public/WhatsApp Image 2023-04-25 at 12.38.42 PM.jpeg');
// results().then(console.log)


const Tesseract = require('tesseract.js');

Tesseract.recognize('./public/time-tracking-invocing-2x.png')
  .then(result => {
    console.log(result.data.text)
  })
  .catch(err => {
    console.error(err)
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
