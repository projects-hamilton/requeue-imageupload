const mongoose = require("mongoose");
const express = require('express')
const app = express()
require('dotenv').config();
const db = process.env.DB_URI
const cors = require("cors");
app.use(cors());

app.use(express.json())
const port = process.env.PORT || 3000


mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/',require('./routes/SupervisorRoutes'))
app.use('/',require('./routes/user'))
app.use('/',require('./routes/admin'))
app.use('/',require("./routes/Driver"))
app.use('/',require('./routes/TransferRoutes'))
app.use('/',require('./routes/StoreRoutes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



