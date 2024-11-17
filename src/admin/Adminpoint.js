import React, { useState, useEffect } from "react";
import axios from "axios";
import './Adminpoint.css';

const Adminpoint = () => {
    const [points, setPoints] = useState([]); // 포인트 요청 데이터
    const [myCourses, setMyCourses] = useState([]); // 내 코스 데이터

    // 포인트 데이터 가져오기
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

    // 내 코스 데이터 가져오기
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/courses");
                setMyCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
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

            <h2>내 코스 리스트</h2>
            <ul>
                {myCourses.map(course => (
                    <li key={course.id}>
                        <div className="timeline"></div>
                        <div className="progress-circle">
                            <span className="progress-text">63%</span>
                        </div>
                        <div className="challenge-info">
                            <a href={`/course/${course.id}`}>
                                <h3>{course.title}</h3>
                            </a>
                            <p className="description">{course.description}</p>
                            <p className="ranking">현재 순위 24위 &gt;</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Adminpoint;