import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyChallenge.css';

const MyChallenges = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (!loggedInUser) {
        alert("로그인이 필요합니다.");
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/course');
        const enrolledCourses = response.data.filter(course =>
          course.enrolledUsers && course.enrolledUsers.includes(loggedInUser.id)
        );
        setMyCourses(enrolledCourses);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        alert("신청한 도전을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="my-challenges">
      <h2>나의 신청 도전</h2>
      <div className="summary">0개 성공 / 1개 참여</div>
      <ul>
        {myCourses.map(course => (
          <li key={course.id}>
            <div className="timeline"></div>
            <div className="progress-circle">
              <span className="progress-text">63%</span>
            </div>
            <div className="challenge-info">
            <Link to={(`/course/${course.id}`)}>
                <h3>{course.title}</h3>
            </Link>
              
              <p className="description">{course.description}</p>
              <p className="ranking">현재 순위 24위 &gt;</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyChallenges;