const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const db = process.env.DB_URI;
const cors = require("cors");
const { isCompany } = require("./middilware/auth");
app.use(cors());

app.use(express.json());
const port = process.env.PORT || 3000;



mongoose.set('strictQuery', true);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: false
  })
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});





app.use("/api/imageupload", require("./routes/image"));
app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/auth", isCompany, require("./routes/auth"));
app.use("/api/user", isCompany, require("./routes/user"));
app.use('/api/superadmin', require("./routes/superadmin"))



app.use("/api/", require("./routes/SupervisorRoutes"));

app.use("/api/admin", isCompany, require("./routes/admin"));
app.use("/api/", isCompany, require("./routes/Driver"));
app.use("/api/", isCompany, require("./routes/TransferRoutes"));
app.use("/api/", isCompany, require("./routes/StoreRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

