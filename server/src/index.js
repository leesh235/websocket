import express from "express";
import loaders from "./loaders";
import http from "http";
import { Server } from "socket.io";

const port = 5000;

async function startServer() {
    const app = express();
    const server = http.Server(app);
    const io = new Server(server, { cors: { origin: "*" } });

    await loaders(app);

    io.on("connection", (socket) => {
        console.log("connection");

        socket.on("roomjoin", (roomName) => {
            console.log(`in room : ${roomName}}`);
            socket.join(roomName, () => {
                io.to(roomName).emit("roomjoin", roomName);
            });
        });

        socket.on("leaveroom", (roonName) => {
            console.log("out room");
            socket.leave(roonName, () => {
                io.to(roonName).emit("leaveroom", roonName);
            });
        });

        socket.on("disconnect", () => {
            console.log("disconnect");
        });

        socket.on("chat", (roonName, userName, msg) => {
            io.to(roonName).emit("chat", userName, msg);
        });
    });

    server.listen(port, () => {
        console.log(`server:${port}`);
    });
}

startServer();
