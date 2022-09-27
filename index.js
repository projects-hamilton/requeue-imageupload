const mongoose = require("mongoose");
const express = require('express')
// const admin = require("./routes/Admin")
const app = express()
require('dotenv').config();
const db =process.env.DB_URI


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

app.use('/admin',require('./routes/Admin'))
app.use('/survey',require('./routes/survey'))
app.use("/answer",require("./routes/answer"))
app.use('/user',require('./routes/user'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



