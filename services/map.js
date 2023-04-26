const User = require("../models/user");

function initializemapServer(io) {

    io.on("connection", (socket) => {
        async function getLastLocationFromRoom(room) {
            let roomLocation = await User.findById(room).select("")
            return roomLocation;
        }

        socket.on("join-room", async (newRoom, previousRoom) => {
            socket.join(newRoom);
            socket.leave(previousRoom);
            let roomlocation = await getLastLocationFromRoom(newRoom);
            socket.emit("location", roomlocation);
        });

        socket.on("update-room", async (longitude, latitude, room) => {
            const newLocation = await User.findOneAndUpdate(room, {
                longitude,
                latitude
            });
            
            let roomlocation = await getLastLocationFromRoom(newRoom);
            io.to(room).emit("location", roomlocation);
            socket.broadcast.emit("notifications", room);
        });
    })
}

module.exports = initializemapServer;
