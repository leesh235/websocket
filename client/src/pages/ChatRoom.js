import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { response, request, event } from "../utils/socket";
import { createDom } from "../utils/domUtils";

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

    const handleOnClick = () => {
        //방 나가기
        request(event.leave, { room, name: userName });
        navigation("/");
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { value } = e.target.chatInput;
        //채팅
        request(event.chat, { msg: value });
    };

    useEffect(() => {
        //방 입장
        request(event.join, { room, name: userName });
        //해당 request에 대한 response
        response(event.message, (data) => {
            createDom("chatList", "div", data);
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
