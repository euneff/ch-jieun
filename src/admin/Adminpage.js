import React from "react";
import QandA from "./QandA";
import Exchange from "./Exchange";
import Adminpoint from "./Adminpoint";
import Capproval from "./Capproval";
import "./Adminpage.css";

const Adminpage = () => {
    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <div className="admin-section">
                <QandA />
                <Capproval />
                <Exchange />
                <Adminpoint />
            </div>
        </div>
    );
};

export default Adminpage;