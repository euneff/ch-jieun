import React, { useState } from "react";

const QandA = () => {
    // 초기 질문 데이터를 로컬에서 관리
    const [questions, setQuestions] = useState([
        { id: 1, text: "포인트 환전에 대해 자세히 설명해주세요", answer: "" },
        { id: 2, text: "도전 참여 횟수 제한은 없나요?", answer: "" },
        { id: 3, text: "?", answer: "" },
    ]);

    // 답변 등록 처리
    const handleAnswerSubmit = (id, newAnswer) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === id ? { ...q, answer: newAnswer } : q // 해당 질문의 답변 업데이트
            )
        );
    };

    // 답변 삭제 처리
    const handleAnswerDelete = (id) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === id ? { ...q, answer: "" } : q // 답변을 빈 문자열로 초기화
            )
        );
    };

    return (
        <div className="admin-section">
            <h2>질문답변 리스트</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <div>
                            <p>
                                <strong>질문:</strong> {question.text}
                            </p>
                            {question.answer ? (
                                <div>
                                    <p>
                                        <strong>답변:</strong> {question.answer}
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleAnswerSubmit(question.id, prompt("새로운 답변을 입력하세요:", question.answer))
                                        }
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleAnswerDelete(question.id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            ) : (
                                <AnswerForm
                                    questionId={question.id}
                                    onSubmit={handleAnswerSubmit}
                                />
                            )}
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 답변 입력 폼 컴포넌트
const AnswerForm = ({ questionId, onSubmit }) => {
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (answer.trim()) {
            onSubmit(questionId, answer); // 부모 컴포넌트로 답변 전달
            setAnswer(""); // 입력 필드 초기화
        } else {
            alert("답변을 입력하세요.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="답변을 입력하세요"
            />
            <button type="submit">등록</button>
        </form>
    );
};

export default QandA;