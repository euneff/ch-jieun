import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PointHistory.css'; // CSS 파일 사용

const PointHistory = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/points');
                setPoints(response.data);
            } catch (error) {
                console.error('데이터를 가져오는 데 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="point-history-container">
            <h2 className="point-history-title">전체 포인트 내역</h2>
            <table className="point-history-table">
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>사유/내용</th>
                        <th>포인트</th>
                    </tr>
                </thead>
                <tbody>
                    {points.map((point) => (
                        <tr key={point.id}>
                            <td>{new Date(point.date).toLocaleDateString()}</td>
                            <td>{point.reason}</td>
                            <td className={point.amount < 0 ? 'negative' : 'positive'}>
                                {point.amount.toLocaleString()} 원
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PointHistory;
