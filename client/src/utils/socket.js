import { io } from "socket.io-client";

export let socket = io("http://localhost:5000/");

export const connect = () => {
    if (socket) return;
    socket.connect();
};

export const disconnect = () => {
    if (socket === null || socket.connected === false) return;
    socket.disconnect();
    socket = undefined;
};

export const request = (type, data) => {
    if (socket === null || socket.connected === false) connect();
    socket.emit(type, data);
};

export const response = (type, cb) => {
    if (socket.hasListeners(type)) socket.off(type);
    socket.on(type, cb);
};
