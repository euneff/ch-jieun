import React, { useState, useEffect } from "react";
import './Adminpoint.css';

const Adminpoint = () => {
    // 더미 데이터
    const dummyCourses = [
        {
            id: 1,
            title: "이불",
            category: "집안일",
            user: "짱구",
            completedDate: "2024-11-01",
            progress: 80,
            rewardPoints: 100,
            success: true,
        },
        {
            id: 2,
            title: "빨래",
            category: "집안일",
            user: "철수",
            completedDate: "2024-10-20",
            progress: 95,
            rewardPoints: 150,
            success: true,
        },
        {
            id: 3,
            title: "산책하기",
            category: "일상",
            user: "유리",
            completedDate: "2024-09-15",
            progress: 40,
            rewardPoints: 50,
            success: false,
        }
    ];

    const [myCourses, setMyCourses] = useState(dummyCourses); // 초기 상태를 더미 데이터로 설정

    // 포인트 지급 처리
    const handleGivePoints = async (id, user, points) => {
        try {
            // API 요청이 아니라 포인트 지급 성공 시 로직 처리
            alert(`${user}에게 ${points} 포인트를 지급했습니다.`);
            setMyCourses(myCourses.filter(course => course.id !== id)); // 지급 후 UI 업데이트
        } catch (error) {
            console.error("Error giving points:", error);
            alert("포인트 지급 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="admin-section">
            <h2>성공한 도전 리스트</h2>
            <ul>
                {myCourses
                    .filter(course => course.success) // 성공한 도전만 표시
                    .map((course) => (
                        <li key={course.id} className="challenge-item">
                            <div className="timeline"></div>
                            <div
                                className="progress-circle"
                                style={{
                                    background: `conic-gradient(#f6abe6 0% ${course.progress}%, #ead2e1 ${course.progress}% 100%)`,
                                }}
                            >
                                <span className="progress-text">{course.progress}%</span>
                            </div>
                            <div className="challenge-info">
                                <h3>{course.title}</h3>
                                <p>카테고리: {course.category}</p>
                                <p>참여자: {course.user}</p>
                                <p>성공 날짜: {course.completedDate}</p>
                                <button
                                    onClick={() => handleGivePoints(course.id, course.user, course.rewardPoints)}
                                >
                                    {course.rewardPoints} 포인트 지급
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Adminpoint;