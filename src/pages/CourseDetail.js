// CourseDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css';
import CheckCourseStatus from '../components/CheckCourseStatus';

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(""); // 상태를 저장할 state 추가
    const navigate = useNavigate();
    const [isAuthor, setIsAuthor] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const id = parseInt(courseId, 10);
                const response = await axios.get(`http://localhost:5000/course/${id}`);
                setCourse(response.data);

                const loggedInUser = JSON.parse(localStorage.getItem('user'));
                if (loggedInUser) {
                    setIsAuthor(response.data.authorId === loggedInUser.id);
                    setIsEnrolled(response.data.enrolledUsers?.includes(loggedInUser.id) || false);
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleDelete = async () => {
        if (window.confirm("정말로 이 도전을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`http://localhost:5000/course/${courseId}`);
                alert("도전이 삭제되었습니다.");
                navigate('/course', { state: { deletedCourseId: courseId } });
            } catch (error) {
                console.error("Error deleting course:", error);
                alert("도전 삭제에 실패했습니다.");
            }
        }
    };

    const handleEnroll = async () => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await axios.patch(`http://localhost:5000/course/${courseId}`, {
                enrolledUsers: [...(course.enrolledUsers || []), loggedInUser.id]
            });
            alert("도전에 성공적으로 신청되었습니다.");
            setIsEnrolled(true);
        } catch (error) {
            console.error("Error enrolling in course:", error);
            alert("도전 신청에 실패했습니다.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!course) return <p>해당 강의를 찾을 수 없습니다.</p>;

    return (
        <div className="course-detail">
            <h2>{course.title}</h2>
            <p><strong> 유형:</strong> {course.type}</p>
            <p><strong>진행률:</strong> {course.progress}</p>
            <p><strong>기간:</strong> {course.startDate} - {course.endDate}</p>
            <p><strong>카테고리:</strong> {course.category}</p>
            <p><strong>설명:</strong> {course.description}</p>
            <p><strong>현재 상태:</strong> <CheckCourseStatus courseId={courseId} onStatusChange={setStatus} /></p> {/* 상태 표시 */}
            {isAuthor && (
                <button onClick={handleDelete} className="delete-button">삭제</button>
            )}
            <button
                onClick={handleEnroll}
                className="enroll-button"
                disabled={isEnrolled || status !== "대기 중"} // 대기 중이 아닐 때 비활성화
            >
                {isEnrolled ? "신청 완료" : (status === "대기 중" ? "신청" : "신청 불가")}
            </button>
        </div>
    );
};

export default CourseDetail;
