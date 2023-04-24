const mongoose = require("mongoose");
const express = require("express");
require('express-group-routes');
const app = express();
require("dotenv").config();
const db = process.env.DB_URI;
const cors = require("cors");
const { isCompany } = require("./middilware/auth");
const { createAdmin, getAdmin } = require("./models/adminuser");
app.use(cors());

app.use(express.json());
const port = process.env.PORT || 3000;

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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

