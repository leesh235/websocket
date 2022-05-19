import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "./utils/socket";
import { ChatList } from "./pages/ChatList";
import { ChatRoom } from "./pages/ChatRoom";

function App() {
    useEffect(() => {
        //최상단에서 websocket 연결
        connectSocket();
        return () => {
            disconnectSocket();
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ChatList />} />
                <Route path="/room1" element={<ChatRoom />} />
                <Route path="/room2" element={<ChatRoom />} />
            </Routes>
        </Router>
    );
}

export default App;
