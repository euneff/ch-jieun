import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import './MyPage.css'; // CSS 파일 임포트

function Mypage({ parsed, onLogout }) {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [showRecentlyViewed, setShowRecentlyViewed] = useState(false);
    const [inProgressChallenges, setInProgressChallenges] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchInProgressChallenges = async () => {
            try {
                const response = await axios.get('http://localhost:5000/course');
                const userId = parsed?.id;
                if (userId) {
                    const enrolledChallenges = response.data.filter(
                        challenge =>
                            challenge.status === '진행 중' &&
                            challenge.enrolledUsers?.includes(userId)
                    );
                    setInProgressChallenges(enrolledChallenges);
                }
            } catch (error) {
                console.error("진행 중인 도전을 불러오는 중 오류 발생:", error);
            }
        };

        fetchInProgressChallenges();
    }, [parsed]);

    const handleDeleteProfile = async (e) => {
        e.preventDefault();
        if (!parsed || !parsed.id) {
            alert("유효한 사용자 정보가 없습니다.");
            return;
        }

        if (window.confirm('회원 탈퇴를 진행하시겠습니까?')) {
            try {
                const response = await axios.delete(`http://localhost:5000/user/${parsed.id}`);
                if (response.status === 200 || response.status === 204) {
                    onLogout(false);
                    alert('그동안 이용해주셔서 감사합니다.');
                    navigate('/');
                } else {
                    console.error("회원탈퇴 실패:", response.status);
                    alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
                }
            } catch (err) {
                console.error("회원탈퇴 중 오류 발생:", err);
                alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    const isSubRoute = location.pathname !== '/mypage';

    if (isSubRoute) {
        return <Outlet />;
    }

    return (
        <div className="mypage">
            <div className="orderStatusWrapper">
                <h2>MYPAGE</h2>
                <div className="orderSteps">
                    {['도전 횟수', '진행중인 도전', '성공한 도전'].map((step, idx) => (
                        <div key={idx} className="orderStep">
                            <p>{step}</p>
                            <span>0</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="menuCards">
                <div className="menuCard" onClick={() => navigate('/mypage/infoedit')}>
                    <h3>PROFILE</h3>
                    <p>회원정보 수정</p>
                    <p>도전자님의 개인정보를 관리하는 공간</p>
                </div>
                <div className="menuCard" onClick={() => navigate('/mypage/infoEdit')}>
                    <h3>RECENTLY VIEWED</h3>
                    <p>최근 본 도전</p>
                    <p>최근 본 도전을 한 눈에 확인할 수 있습니다.</p>
                </div>
                <div className="menuCard" onClick={() => navigate('/mypage/likeit')}>
                    <h3>LIKE IT</h3>
                    <p>찜 한 도전</p>
                    <p>'찜'한 도전 목록을 보여드립니다.</p>
                </div>
                <div className="menuCard" onClick={() => navigate('/mypage/mileage')}>
                    <h3>MILEAGE</h3>
                    <p>포인트</p>
                    <p>포인트 정보 조회</p>
                </div>
                <div className="menuCard" onClick={() => navigate('/mypage/mileage')}>
                    <h3>CHALLENGE</h3>
                    <p>도전 내역 조회</p>
                    <p>지금까지 신청했던 도전 내역을 확인할 수 있습니다.</p>
                </div>
                <div className="menuCard" onClick={() => navigate('/mypage/mileage')}>
                    <h3>CHALLENGE SUCCESS</h3>
                    <p>성공한 도전 조회</p>
                    <p>성공한 도전 내역을 확인할 수 있습니다.</p>
                </div>
                
            </div>
        </div>
    );
}

export default Mypage;