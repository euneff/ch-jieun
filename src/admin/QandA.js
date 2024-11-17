import React, { useState, useEffect } from "react";
import axios from "axios";

const QandA= () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/questions");
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    const handleApprove = (id) => {
        alert(`Question ${id} approved!`);
    };

    const handleReject = (id) => {
        alert(`Question ${id} rejected.`);
    };

    return (
        <div className="admin-section">
            <h2>질문답변 대기 리스트</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <p>{question.text}</p>
                        <button onClick={() => handleApprove(question.id)}>승인</button>
                        <button onClick={() => handleReject(question.id)}>거부</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QandA;