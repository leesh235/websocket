import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const socket = io.connect("http://localhost:5000/");

const Wrapper = styled.main`
    width: 30%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60px auto;
`;

const TopWrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const ContentsWrapper = styled.section`
    width: calc(100% - 20px);
    height: 430px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid gray;
    margin-bottom: 10px;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
`;

const BottomWrapper = styled.form`
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > input {
        width: 80%;
    }
    > button {
        width: 15%;
    }
`;

export const ChatRoom = () => {
    const navigation = useNavigate();
    const { state } = useLocation();
    const { userName, room } = state;

    const [chat, setChat] = useState([]);

    const handleOnClick = () => {
        socket.emit("leaveroom", room, userName);

        navigation("/");
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { value } = e.target.chatInput;
        socket.emit("chat", room, userName, value);
    };

    const createDom = (data) => {
        let list = document.getElementById("chatList");
        let item = document.createElement("div");
        item.innerText = data;
        list.appendChild(item);
    };

    useEffect(() => {
        socket.emit("roomjoin", room, userName);
        socket.on("join", (room, name) => {
            createDom(`${room}에 ${name}님이 입장하셨습니다.`);
        });
        socket.on("chat2", (name, msg) => {
            createDom(`${name}: ${msg}`);
        });
        socket.on("leave", (room, name) => {
            createDom(`${room}에서 ${name}님이 나가셨습니다.`);
        });
    }, []);

    return (
        <Wrapper>
            <TopWrapper>
                <div>{room}</div>
                <button type="button" onClick={handleOnClick}>
                    나가기
                </button>
            </TopWrapper>
            <ContentsWrapper id="chatList"></ContentsWrapper>
            <BottomWrapper onSubmit={handleOnSubmit}>
                <input
                    name="chatInput"
                    defaultValue={""}
                    placeholder={"채팅하기"}
                />
                <button>작성</button>
            </BottomWrapper>
        </Wrapper>
    );
};
