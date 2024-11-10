import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './CoursesPage.css';

const CoursesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [courseList, setCourseList] = useState([]);

    // 데이터를 새로 불러오는 함수
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/course');
            setCourseList(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        // 초기 로드 또는 새로고침 시 전체 데이터를 가져옴
        fetchCourses();
    }, []);

    useEffect(() => {
        // 새로운 도전이 추가되었을 때만 업데이트
        if (location.state?.newCourse && !courseList.some(course => course.id === location.state.newCourse.id)) {
            setCourseList(prevCourses => [location.state.newCourse, ...prevCourses]);
        }

        // 삭제된 도전이 있을 때만 업데이트
        if (location.state?.deletedCourseId) {
            setCourseList(prevCourses =>
                prevCourses.filter(course => course.id !== location.state.deletedCourseId)
            );
        }
    }, [location.state]);

    const handleCardClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const handleCreateChallenge = () => {
        navigate('/create-course');
    };

    return (
        <div className="courses-page">
            <div className="course">
                <h1>도전 목록</h1>
                <button className="create-challenge-button" onClick={handleCreateChallenge}>
                    도전 생성
                </button>
            </div>
            <div className="courses-grid">
                {courseList.map(course => (
                    <div
                        key={course.id}
                        className="course-card"
                        onClick={() => handleCardClick(course.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="course-badge"> {/* 뱃지 스타일 */}
                            <span>11월</span>
                        </div>
                        <h3 className="course-title">{course.title || "11월 도전 3개 완료하기"}</h3>
                        <div className="course-dates">
                            {course.startDate || "11월 1일"} ~ {course.endDate || "11월 30일"}
                        </div>
                        <p className="course-description">도전을 성공하고 보상금을 얻어보세요!</p>
                        <div className="course-missions">
                            <p>challenge</p>
                            <ul>
                                <li>✅  완료하기</li>
                                <li>✅  출석하기</li>
                            </ul>
                        </div>
                        <div className="course-rewards">
                            <p>보증금</p>
                            <span>10,000원</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
