import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // render가 두번씩 반복되는 현상 발생
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
    <App />
);
