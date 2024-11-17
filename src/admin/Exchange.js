import React, { useState } from "react";
import './Exchange.css';

const Exchange = () => {
    // 더미 데이터 (하드코딩된 환전 대기 요청 목록)
    const dummyWithdrawals = [
        {
            id: 1,
            user: "짱구",
            date: "2024-11-15",
            amount: 1000,
        },
        {
            id: 2,
            user: "철수",
            date: "2024-11-16",
            amount: 500,
        },
        {
            id: 3,
            user: "유리",
            date: "2024-11-17",
            amount: 1500,
        }
    ];

    const [withdrawals, setWithdrawals] = useState(dummyWithdrawals); // 초기 상태를 더미 데이터로 설정

    // 환전 승인
    const handleApprove = (id) => {
        alert(`환전 요청 ${id}가 승인되었습니다.`);
        setWithdrawals(withdrawals.filter((withdrawal) => withdrawal.id !== id)); // 승인된 항목 제거
    };

    // 환전 거부
    const handleReject = (id) => {
        alert(`환전 요청 ${id}가 거부되었습니다.`);
        setWithdrawals(withdrawals.filter((withdrawal) => withdrawal.id !== id)); // 거부된 항목 제거
    };

    return (
        <div className="admin-section">
            <h2>환전 대기 리스트</h2>
            <ul>
                {withdrawals.map((withdrawal) => (
                    <li key={withdrawal.id} className="withdrawal-item">
                        <div>
                            <p>
                                <strong>사용자:</strong> {withdrawal.user}
                            </p>
                            <p>
                                <strong>요청 날짜:</strong> {withdrawal.date}
                            </p>
                            <p>
                                <strong>환전 포인트:</strong> {withdrawal.amount} P
                            </p>
                        </div>
                        <div className="action-buttons">
                            <button
                                className="approve-button"
                                onClick={() => handleApprove(withdrawal.id)}
                            >
                                승인
                            </button>
                            <button
                                className="reject-button"
                                onClick={() => handleReject(withdrawal.id)}
                            >
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

export default Exchange;