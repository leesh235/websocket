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

        socket.on("roomjoin", (roomName, userName) => {
            console.log(`in room`);
            socket.join(roomName);
            io.to(roomName).emit("join", roomName, userName);
        });

        socket.on("leaveroom", (roomName, userName) => {
            console.log("out room");
            socket.leave(roomName);
            io.to(roomName).emit("leave", roomName, userName);
        });

        socket.on("chat", (roomName, userName, msg) => {
            io.to(roomName).emit("chat2", userName, msg);
        });

        socket.on("disconnect", () => {
            console.log("disconnect");
        });
    });

    server.listen(port, () => {
        console.log(`server:${port}`);
    });
}

startServer();
