import React, { useState } from 'react';
import './Capproval.css';

// 더미 데이터
const courseList = [
    {
        id: 1,
        title: "도전1",
        startDate: "2023-11-01",
        endDate: "2023-11-30",
        users: [
            {
                id: 1,
                name: "짱구",
                progress: [
                    { step: 1, status: "pending" },
                    { step: 2, status: "pending" },
                    { step: 3, status: "pending" },
                ],
            },
            {
                id: 2,
                name: "철수",
                progress: [
                    { step: 1, status: "complete" },
                    { step: 2, status: "pending" },
                    { step: 3, status: "pending" },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "도전2",
        startDate: "2023-11-01",
        endDate: "2023-11-10",
        users: [
            {
                id: 3,
                name: "유리",
                progress: [
                    { step: 1, status: "complete" },
                    { step: 2, status: "complete" },
                    { step: 3, status: "pending" },
                ],
            },
        ],
    },
];

const ChallengeApproval = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseUsers, setCourseUsers] = useState([]);

    // 카드 클릭 시 사용자 목록 표시
    const handleCardClick = (courseId) => {
        const selected = courseList.find(course => course.id === courseId);
        setSelectedCourse(selected);
        setCourseUsers(selected ? selected.users : []);
    };

    // 진행 중인 첫 번째 단계 찾기
    const findNextStep = (progress) => {
        return progress.find(step => step.status === "pending");
    };

    // 사용자의 단계 승인 처리
    const handleApproveStep = (userId, step) => {
        const updatedUsers = courseUsers.map(user => {
            if (user.id === userId) {
                const stepIndex = user.progress.findIndex(s => s.step === step.step);
                if (stepIndex !== -1) {
                    user.progress[stepIndex].status = "complete"; // 승인된 단계는 "complete"
                }
            }
            return user;
        });
        setCourseUsers(updatedUsers);
        alert(`사용자 ${userId}의 ${step.step}단계 인증이 승인되었습니다.`);
    };

    return (
        <div className="admin-section">
            <h2>도전 목록</h2>
            <div className="courses-grid">
                {courseList.map(course => (
                    <div
                        key={course.id}
                        className="course-card"
                        onClick={() => handleCardClick(course.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="course-badge">
                            <span>11월</span>
                        </div>
                        <h3 className="course-title">{course.title || "11월 도전 3개 완료하기"}</h3>
                        <div className="course-dates">
                            {course.startDate || "11월 1일"} ~ {course.endDate || "11월 30일"}
                        </div>
                        <p className="course-description">도전!</p>
                    </div>
                ))}
            </div>

            {/* 도전 선택 시 사용자 목록 및 승인/거부 기능 표시 */}
            {selectedCourse && (
                <div className="course-users">
                    <h3>{selectedCourse.title} - 사용자 목록</h3>
                    <ul>
                        {courseUsers.map(user => (
                            <li key={user.id}>
                                <p>{user.name}</p>
                                <div>
                                    {user.progress.map((step, index) => (
                                        <div key={step.step}>
                                            <p>단계 {step.step}: {step.status}</p>
                                            {step.status === "pending" && (
                                                <button onClick={() => handleApproveStep(user.id, step)}>
                                                    {step.step}단계 승인
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ChallengeApproval;