import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Review.css';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const [selectedTopic, setSelectedTopic] = useState("전체");
    const [sortOrder, setSortOrder] = useState("최신순");

    useEffect(() => {
        // 서버에서 리뷰 데이터를 가져오기
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/reviews');
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const handleTopicChange = (e) => {
        setSelectedTopic(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredReviews = reviews
        .filter(review => selectedTopic === "전체" || review.topic === selectedTopic)
        .sort((a, b) => 
            sortOrder === "최신순"
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date)
        );

    return (
        <div className="review-container">
            <div className="review-header">
                <h2>후기</h2>
                <div className="filter-options">
                    <select onChange={handleTopicChange} value={selectedTopic}>
                        <option value="전체">토픽 전체</option>
                        <option value="운동">운동</option>
                        <option value="공부">공부</option>
                        <option value="독서">독서</option>
                        <option value="일기">일기</option>
                    </select>
                    <select onChange={handleSortOrderChange} value={sortOrder}>
                        <option value="최신순">최신순</option>
                        <option value="오래된순">평점순</option>
                    </select>
                </div>
            </div>

            <ul className="review-list">
                {filteredReviews.map((review) => (
                    <li key={review.id} className="review-item">
                        <div className="review-topic">{review.topic}</div>
                        <div className="review-info">
                            <span className="review-author">{review.author}</span>
                            <span className="review-date">
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="review-content">{review.content}</p>
                        <div className="review-rating">
                            {"★".repeat(review.rating)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Review;
