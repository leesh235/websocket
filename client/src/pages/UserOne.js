import io from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:5000/");

export const UserOne = () => {
    useEffect(() => {
        socket.emit("roomjoin", "room1");
    }, []);
    return <div>UserOne</div>;
};
