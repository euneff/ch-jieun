import React, { useState, useEffect } from "react";
import axios from "axios";

const Adminpoint = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await axios.get("http://localhost:5000/points");
                setPoints(response.data);
            } catch (error) {
                console.error("Error fetching points:", error);
            }
        };
        fetchPoints();
    }, []);

    const handleApprove = (id) => {
        alert(`Point request ${id} approved!`);
    };

    const handleReject = (id) => {
        alert(`Point request ${id} rejected.`);
    };

    return (
        <div className="admin-section">
            <h2>포인트 추가 대기 리스트</h2>
            <ul>
                {points.map((point) => (
                    <li key={point.id}>
                        <p>{point.user}: {point.amount} 포인트 요청</p>
                        <button onClick={() => handleApprove(point.id)}>승인</button>
                        <button onClick={() => handleReject(point.id)}>거부</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Adminpoint;