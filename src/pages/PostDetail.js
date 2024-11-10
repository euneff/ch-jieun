import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

const PostDetail = ({ userName }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

    // 게시글 데이터 가져오기
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts/${id}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchPost();
        fetchComments();
    }, [id]);

    // 댓글 추가 기능
    const handleAddComment = async () => {
        if (!newComment.trim()) return alert("댓글 내용을 입력해주세요.");

        try {
            const response = await axios.post(`http://localhost:5000/posts/${id}/comments`, {
                content: newComment,
                author: userName,
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("댓글 추가에 실패했습니다.");
        }
    };

    // 댓글 삭제 기능
    const handleDeleteComment = async (commentId) => {
        if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`http://localhost:5000/posts/${id}/comments/${commentId}`);
                setComments(comments.filter(comment => comment.id !== commentId));
                alert("댓글이 삭제되었습니다.");
            } catch (error) {
                console.error("Error deleting comment:", error);
                alert("댓글 삭제에 실패했습니다.");
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 이 글을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`http://localhost:5000/posts/${id}`);
                alert("글이 삭제되었습니다.");
                navigate('/freeboard');
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("글 삭제에 실패했습니다.");
            }
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-detail-container">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>작성자: {post.author}</p>

            {userName === post.author && (
                <div className="button-group">
                    <button onClick={handleEdit} className="edit-button">수정</button>
                    <button onClick={handleDelete} className="delete-button">삭제</button>
                </div>
            )}

            {/* 댓글 입력 폼 */}
            <div className="comment-section">
                <h3>댓글 {comments.length}개</h3>
                <div className="comment-input-container">
                    <img src="/path-to-avatar-image.png" alt="User Avatar" className="user-avatar" />
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글 입력하기"
                        className="comment-input"
                    />
                    <button onClick={handleAddComment} className="add-comment-button">댓글 추가</button>
                </div>
            </div>

            {/* 댓글 리스트 */}
            <ul className="comment-list">
                {comments.map(comment => (
                    <li key={comment.id} className="comment-item">
                        <p>{comment.content}</p>
                        <p>작성자: {comment.author}</p>
                        {userName === comment.author && (
                            <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="delete-comment-button"
                            >
                                삭제
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <button onClick={handleBack} className="back-button">뒤로 가기</button>
        </div>
    );
};

export default PostDetail;
