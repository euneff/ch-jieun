import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FreeBoard.css';
import axios from 'axios';

const FreeBoard = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts');
                setPosts(response.data);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchPosts();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="board-container">
            <h1>notice</h1>
            <table className="post-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th className="author">작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.length > 0 ? (
                        currentPosts.map((post, index) => (
                            <tr 
                                key={post.id} 
                                onClick={() => navigate(`/post/${post.id}`)}
                                className="post-row"
                            >
                                <td>{indexOfFirstPost + index + 1}</td>
                                <td>{post.title}</td>
                                <td className="author">{post.author}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="no-posts-message">현재 게시된 글이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination">
                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(num => (
                    <button 
                        key={num} 
                        onClick={() => paginate(num + 1)} 
                        className={currentPage === num + 1 ? 'active' : ''}
                    >
                        {num + 1}
                    </button>
                ))}
            </div>
            <button className="write-button" onClick={() => navigate('/write')}>글 작성</button>
        </div>
    );
};

export default FreeBoard;
