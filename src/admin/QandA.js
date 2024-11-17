import React, { useState, useEffect } from "react";
import axios from "axios";

const QandA = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/questions");
                setQuestions(response.data); // 서버에서 받은 질문 데이터를 상태로 저장
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
                        <div>
                            <p>
                                <strong>질문:</strong> {question.text}
                            </p>
                            {question.answer ? (
                                <p>
                                    <strong>답변:</strong> {question.answer}
                                </p>
                            ) : (
                                <p style={{ color: "red" }}>
                                    <strong>답변 대기 중...</strong>
                                </p>
                            )}
                        </div>
                        <div>
                            <button onClick={() => handleApprove(question.id)}>
                                승인
                            </button>
                            <button onClick={() => handleReject(question.id)}>
                                거부
                            </button>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QandA;