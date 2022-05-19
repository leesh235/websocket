import { io } from "socket.io-client";

export let socket = io("http://localhost:5000/");

export const connectSocket = () => {
    if (socket) return;
    socket.connect();
};

export const disconnectSocket = () => {
    if (socket === null || socket.connected === false) return;
    socket.disconnect();
    socket = undefined;
};

export const request = (type, data) => {
    if (socket === null || socket.connected === false) connectSocket();
    socket.emit(type, data);
};

export const response = (type, cb) => {
    if (socket.hasListeners(type)) socket.off(type);
    socket.on(type, cb);
};

export const event = {
    join: "roomjoin",
    leave: "leaveroom",
    chat: "chat",
    message: "message",
};
