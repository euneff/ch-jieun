import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './HelpCenter.css';

// 메인 App 컴포넌트
function HelpCenter() {
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>문의 게시판</h1>
      <MessageBoard />
    </div>
  );
}

// MessageBoard 컴포넌트: 메시지 목록과 폼을 관리
const MessageBoard = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "지은",
      date: "2024-09-24 17:31",
      text: "궁금합니다",
      orderId: "202409192945931",
      replies: [
        {
          id: 1,
          user: "관리자",
          date: "2024-09-24 18:11",
          text: "감사합니다.",
        },
      ],
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false); // 폼 표시 상태

  // 새 메시지를 추가하는 함수
  const addMessage = (message) => {
    setMessages([...messages, { ...message, id: Date.now(), replies: [] }]);
  };

  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <button onClick={() => setIsFormVisible(!isFormVisible)} style={{ marginTop: "10px" }}>
        문의 작성
      </button>
      {isFormVisible && <MessageForm onAddMessage={addMessage} />}
    </div>
  );
};

// Message 컴포넌트: 개별 메시지와 답글 표시
const Message = ({ message }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
      <p><strong>{message.user}</strong> ({message.date})</p>
      <p>{message.text}</p>
      <p>문의번호: {message.orderId}</p>
      {message.replies.map((reply) => (
        <div key={reply.id} style={{ marginLeft: "20px", padding: "10px", background: "#f9f9f9" }}>
          <p><strong>{reply.user}</strong> ({reply.date})</p>
          <p>{reply.text}</p>
        </div>
      ))}
    </div>
  );
};

// MessageForm 컴포넌트: 새 메시지를 작성하는 폼
const MessageForm = ({ onAddMessage }) => {
  
const [text, setText] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      onAddMessage({ user: "사용자", date: new Date().toLocaleString(), text });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <div>
        <label>문의 내용</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <button type="submit">작성 완료</button>
    </form>
  );
};

export default HelpCenter;