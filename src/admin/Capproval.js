import React, { useState, useEffect } from "react";
import axios from "axios";

const Capproval = () => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get("http://localhost:5000/challenges");
                setChallenges(response.data);
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        };
        fetchChallenges();
    }, []);

    const handleApprove = (id) => {
        alert(`Challenge ${id} approved!`);
    };

    const handleReject = (id) => {
        alert(`Challenge ${id} rejected.`);
    };

    return (
        <div className="admin-section">
            <h2>챌린지 인증글 대기 리스트</h2>
            <ul>
                {challenges.map((challenge) => (
                    <li key={challenge.id}>
                        <p>{challenge.title}</p>
                        <button onClick={() => handleApprove(challenge.id)}>승인</button>
                        <button onClick={() => handleReject(challenge.id)}>거부</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Capproval;