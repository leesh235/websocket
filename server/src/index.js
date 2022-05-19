import express from "express";
import loaders from "./loaders";
import http from "http";
import { Server } from "socket.io";

const port = 5000;

let users = [];

async function startServer() {
    const app = express();
    const server = http.Server(app);
    const io = new Server(server, { cors: { origin: "*" } });

    await loaders(app);

    //연결
    io.on("connection", (socket) => {
        console.log("connection");

        //방 입장
        socket.on("roomjoin", ({ room, name }) => {
            console.log(`in room`);

            const user = users.filter((data) => {
                return data.id === socket.id;
            });
            if (user.length === 0) {
                users.push({ id: socket.id, name, room });

                //방 인원들에게 메세지 전달
                io.to(room).emit(
                    "message",
                    `${room}에 ${name}님이 입장하셨습니다.`
                );
                socket.join(room);
            }
        });

        //방 나감
        socket.on("leaveroom", ({ room, name }) => {
            console.log("out room");

            users = users.filter((data) => {
                return data.name !== name;
            });
            //방 인원들에게 메세지 전달
            io.to(room).emit(
                "message",
                `${room}에서 ${name}님이 나가셨습니다.`
            );
            socket.leave(room);
        });

        //채팅
        socket.on("chat", ({ msg }) => {
            console.log("chat");

            const user = users.filter((data) => {
                return data.id === socket.id;
            });
            //방 인원들에게 해당 채팅 전달
            io.to(user[0].room).emit("message", `${user[0].name}: ${msg}`);
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
