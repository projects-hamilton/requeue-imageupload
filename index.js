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
// const Location = require("./models/location");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });


// const rooms = ["general", "Our-team", "College-Fridens", "News"];

// socket.on("message-room", async (room, content, sender, time, date) => {
//   const newMessage = await Location.create({
//     location,
//     from: sender,
//     time,
//     date,
//     to: room,

//   });

//   let roomMessages = await getLastMessagesFromRoom(room);
//   roomMessages = sortRoomMessagesByDate(roomMessages);
//   // sending message to room
//   socket.emit("room-messages", roomMessages);
//   socket.broadcast.emit("notifications", room);
// });

// //rooms
// app.get("/rooms", (req, res) => {
//   res.json(rooms);
// });


mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/", isCompany, require("./routes/SupervisorRoutes"));
app.use("/", isCompany, require("./routes/user"));
app.use("/", isCompany, require("./routes/admin"));
app.use("/", isCompany, require("./routes/Driver"));
app.use("/", isCompany, require("./routes/TransferRoutes"));
app.use("/", isCompany, require("./routes/StoreRoutes"));
app.use("/", require("./routes/companyRoutes"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

