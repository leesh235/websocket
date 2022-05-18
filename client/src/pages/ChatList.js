import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > input {
        margin-bottom: 20px;
    }
`;

const Item = styled.div`
    height: 36px;
    cursor: pointer;
`;

export const ChatList = () => {
    const [name, setName] = useState("");

    const handleOnChange = (e) => {
        const { value } = e.target;
        setName(value);
    };

    useEffect(() => {}, []);
    return (
        <Wrapper>
            <div>닉네임을 입력하세요</div>
            <input onChange={handleOnChange} defaultValue={""} />
            <Item>
                <Link to="/room1" state={{ userName: name, room: "1번방" }}>
                    1번방
                </Link>
            </Item>
            <Item>
                <Link to="/room2" state={{ userName: name, room: "2번방" }}>
                    2번방
                </Link>
            </Item>
        </Wrapper>
    );
};
