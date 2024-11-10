import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InfoEdit.css';

const InfoEdit = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    rpassword: '',
    image: ''
  });

  const [file, setFile] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem('user')); // 로그인된 사용자 정보
  const userId = storedUser?.id; // user 객체의 id 값 사용

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prevState) => ({
          ...prevState,
          image: reader.result
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
      return;
    }

    if (userInfo.password !== userInfo.rpassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/users/${userId}`, {
        email: userInfo.email,
        name: userInfo.name,
        phoneNumber: userInfo.phoneNumber,
        password: userInfo.password,
        image: userInfo.image
      });
      alert('정보가 수정되었습니다.');
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('정보 수정에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (!userId) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('사용자 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <div className="info-edit-container">
      <h2>정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-image-container">
          <label htmlFor="image-upload">
            {userInfo.image ? (
              <img src={userInfo.image} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-placeholder profile-image"></div>
            )}
            <div className="profile-image-overlay">
              <img src="/path/to/camera-icon.png" alt="카메라 아이콘" className="camera-icon" />
            </div>
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">닉네임</label>
          <input type="text" id="name" name="name" value={userInfo.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" value={userInfo.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="pw" name="password" value={userInfo.password} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="rpassword">비밀번호 확인</label>
          <input type="password" id="rpw" name="rpassword" value={userInfo.rpassword} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">전화번호</label>
          <input
            type="tel"
            pattern="\d{3}-\d{3,4}-\d{4}"
            id="phoneNumber"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleInputChange}
            placeholder="010-1234-1234"
          />
        </div>

        <button type="submit">정보 수정</button>
      </form>
    </div>
  );
};

export default InfoEdit;
