import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserOne } from "./pages/UserOne";
import { UserTwo } from "./pages/UserTwo";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/user1" element={UserOne} />
                <Route path="/user2" element={UserTwo} />
            </Routes>
        </Router>
    );
}

export default App;
