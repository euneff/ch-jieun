import React, { useState, useEffect } from "react";
import axios from "axios";

const Exchange = () => {
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                const response = await axios.get("http://localhost:5000/withdrawals");
                setWithdrawals(response.data);
            } catch (error) {
                console.error("Error fetching withdrawals:", error);
            }
        };
        fetchWithdrawals();
    }, []);

    const handleApprove = (id) => {
        alert(`Withdrawal ${id} approved!`);
    };

    const handleReject = (id) => {
        alert(`Withdrawal ${id} rejected.`);
    };

    return (
        <div className="admin-section">
            <h2>환전 대기 리스트</h2>
            <ul>
                {withdrawals.map((withdrawal) => (
                    <li key={withdrawal.id}>
                        <p>{withdrawal.user}: {withdrawal.amount} 환전 요청</p>
                        <button onClick={() => handleApprove(withdrawal.id)}>승인</button>
                        <button onClick={() => handleReject(withdrawal.id)}>거부</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exchange;