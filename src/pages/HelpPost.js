import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const HelpPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 작성한 데이터를 서버에 전송하는 로직 추가 가능
    navigate('/helpCenter'); // 작성 후 다시 문의 게시판으로 이동
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>문의 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default HelpPost;
