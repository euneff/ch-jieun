import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateCoursePage.css';
import CheckCourseStatus from '../components/CheckCourseStatus';

const CreateCoursePage = () => {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        title: '',
        type: '',
        money: '',
        progress: '0%', // 기본값 설정
        startDate: '',
        duration: '',
        category: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        // 종료 날짜 계산
        const endDate = courseData.duration === "7"
            ? new Date(new Date(courseData.startDate).setDate(new Date(courseData.startDate).getDate() + 7))
            : new Date(new Date(courseData.startDate).setDate(new Date(courseData.startDate).getDate() + 30));

        const newCourse = {
            id: Date.now().toString(),
            ...courseData,
            authorId: loggedInUser?.id,
            authorName: loggedInUser?.name,
            endDate: endDate.toISOString().split("T")[0], // 종료 날짜 설정
            status: 'pending' // 기본 상태
        };

        try {
            const response = await axios.post('http://localhost:5000/course', newCourse);
            alert('도전이 성공적으로 추가되었습니다!');
            // 생성된 도전을 state로 전달하여 CoursesPage에서 목록 업데이트
            navigate('/course', { state: { newCourse: response.data } });
        } catch (error) {
            console.error('도전 생성 중 오류 발생:', error);
            alert('도전 생성에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="create-course-page">
            <CheckCourseStatus />
            <h2 className="title">도전 생성</h2>
            <form onSubmit={handleSubmit} className="create-course-form">
                <label>
                    제목:
                    <input type="text" name="title" value={courseData.title} onChange={handleChange} required />
                </label>
                <label>
                    유형:
                    <input type="text" name="type" value={courseData.type} onChange={handleChange} required />
                </label>
                <label>
                    참가비:
                    <input type="text" name="money" value={courseData.money} onChange={handleChange} required />
                </label>
                <label>
                    진행률:
                    <input type="text" name="progress" value={courseData.progress} onChange={handleChange} required />
                </label>
                <label>
                    시작 날짜:
                    <input
                        type="date"
                        name="startDate"
                        value={courseData.startDate}
                        onChange={handleChange}
                        min={today}
                        required
                    />
                </label>
                <label>
                    기간:
                    <select name="duration" value={courseData.duration} onChange={handleChange} required>
                        <option value="">선택해주세요</option>
                        <option value="7">7일</option>
                        <option value="30">30일</option>
                    </select>
                </label>
                <label>
                    카테고리:
                    <input type="text" name="category" value={courseData.category} onChange={handleChange} required />
                </label>
                <label>
                    설명:
                    <textarea name="description" value={courseData.description} onChange={handleChange} required />
                </label>
                <button type="submit" disabled={isSubmitting}>도전 생성</button>
            </form>
        </div>
    );
};

export default CreateCoursePage;